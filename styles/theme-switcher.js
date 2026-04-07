/*
  theme-switcher.js — Swap Mobius color-token stylesheets.

  How it works:
    1. Each page has a <link id="mob-theme-link"> that loads the active theme CSS.
    2. Clicking the gear icon opens the theme menu.
    3. Picking a theme swaps the link href and saves the choice to localStorage.
    4. On page load the saved theme is restored (defaults to "Light").
*/

(function () {
  var STORAGE_KEY = "mobius-theme";
  var DEFAULT_THEME = "Light";

  /* Resolve the relative path from the current page to /styles/ */
  function themePath(name) {
    var link = document.getElementById("mob-theme-link");
    if (!link) return "";
    /* Replace just the filename portion of the existing href */
    return link.getAttribute("href").replace(/[^/]*Theme\.css/, name + "Theme.css");
  }

  /* Apply a theme by name */
  function applyTheme(name) {
    var link = document.getElementById("mob-theme-link");
    if (link) link.setAttribute("href", themePath(name));

    /* Update active state in menu */
    var items = document.querySelectorAll(".mob-theme-menu__item");
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.getAttribute("data-theme") === name) {
        item.classList.add("is-active");
      } else {
        item.classList.remove("is-active");
      }
    }

    try { localStorage.setItem(STORAGE_KEY, name); } catch (e) { /* silent */ }
  }

  /* Toggle menu open/closed */
  function toggleMenu() {
    var menu = document.querySelector(".mob-theme-menu");
    if (menu) menu.classList.toggle("is-open");
  }

  /* Close menu when clicking outside */
  function closeMenu(e) {
    var menu = document.querySelector(".mob-theme-menu");
    var btn = document.querySelector(".mob-theme-btn");
    if (!menu || !btn) return;
    if (!menu.contains(e.target) && e.target !== btn) {
      menu.classList.remove("is-open");
    }
  }

  /* Initialise on DOM ready */
  function init() {
    /* Restore saved theme */
    var saved = DEFAULT_THEME;
    try { saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME; } catch (e) { /* silent */ }
    applyTheme(saved);

    /* Gear button */
    var btn = document.querySelector(".mob-theme-btn");
    if (btn) btn.addEventListener("click", toggleMenu);

    /* Theme items */
    var items = document.querySelectorAll(".mob-theme-menu__item");
    for (var i = 0; i < items.length; i++) {
      items[i].addEventListener("click", function () {
        applyTheme(this.getAttribute("data-theme"));
        toggleMenu();
      });
    }

    /* Close on outside click */
    document.addEventListener("click", closeMenu);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

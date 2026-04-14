/*
  nav.js — Shared sidebar navigation + theme switcher.
  Single source of truth for the Mobius component-library nav.
  Works via file:// (no fetch — HTML is embedded in this file).

  Usage:
    1. Add <nav class="mob-nav" id="mob-nav"></nav> to each page.
    2. Add <script src="../styles/nav.js"></script> before </body>.
       (Use "styles/nav.js" for pages at the root level like index.html.)
    3. The script auto-detects the path prefix and the active page.

  To add a new page to the nav, edit the NAV_LINKS array below.
*/

(function () {

  /* ===========================================================
     PATH PREFIX
     Detect whether the current page is at root (index.html)
     or one level deep (subfolder/page.html).
     =========================================================== */
  var scriptEl = document.currentScript;
  var isRoot = scriptEl && scriptEl.getAttribute("src").indexOf("../") === -1;
  var P = isRoot ? "" : "../";                // path prefix for all hrefs


  /* ===========================================================
     NAV STRUCTURE
     Edit this array to add / remove / reorder nav items.
     Each group: { title, open?, download?, links[] }
     Each link:  { label, href }
     href values omit the prefix — it's prepended automatically.
     =========================================================== */
  var NAV_LINKS = [
    {
      title: "Tokens / Styles",
      download: { label: "\u2913 Download All", href: "styles/tokens-styles-all.zip" },
      links: [
        { label: "base.css",           href: "styles/base.css" },
        { label: "LightTheme.css",     href: "styles/LightTheme.css" },
        { label: "fontTokens.css",     href: "styles/fontTokens.css" },
        { label: "spacingTokens.css",  href: "styles/spacingTokens.css" },
        { label: "fontImport.css",     href: "styles/fontImport.css" },
        { label: "typography.css",     href: "styles/typography.css" },
        { label: "nav.css",            href: "styles/nav.css" }
      ]
    },
    {
      title: "Fonts",
      download: { label: "\u2913 Download All", href: "fonts/fonts-all.zip" },
      links: [
        { label: "mobius-system-icons.woff",          href: "fonts/mobius-system-icons.woff" },
        { label: "mobius-system-icons.woff2",         href: "fonts/mobius-system-icons.woff2" },
        { label: "roboto-light.eot",                  href: "fonts/roboto-light.eot" },
        { label: "roboto-light.svg",                  href: "fonts/roboto-light.svg" },
        { label: "roboto-light.ttf",                  href: "fonts/roboto-light.ttf" },
        { label: "roboto-light.woff",                 href: "fonts/roboto-light.woff" },
        { label: "roboto-light.woff2",                href: "fonts/roboto-light.woff2" },
        { label: "roboto-regular.eot",                href: "fonts/roboto-regular.eot" },
        { label: "roboto-regular.svg",                href: "fonts/roboto-regular.svg" },
        { label: "roboto-regular.ttf",                href: "fonts/roboto-regular.ttf" },
        { label: "roboto-regular.woff",               href: "fonts/roboto-regular.woff" },
        { label: "roboto-regular.woff2",              href: "fonts/roboto-regular.woff2" },
        { label: "roboto-thin.eot",                   href: "fonts/roboto-thin.eot" },
        { label: "roboto-thin.svg",                   href: "fonts/roboto-thin.svg" },
        { label: "roboto-thin.ttf",                   href: "fonts/roboto-thin.ttf" },
        { label: "roboto-thin.woff",                  href: "fonts/roboto-thin.woff" },
        { label: "roboto-thin.woff2",                 href: "fonts/roboto-thin.woff2" },
        { label: "robotocondensed-regular.eot",       href: "fonts/robotocondensed-regular.eot" },
        { label: "robotocondensed-regular.svg",       href: "fonts/robotocondensed-regular.svg" },
        { label: "robotocondensed-regular.ttf",       href: "fonts/robotocondensed-regular.ttf" },
        { label: "robotocondensed-regular.woff",      href: "fonts/robotocondensed-regular.woff" },
        { label: "robotocondensed-regular.woff2",     href: "fonts/robotocondensed-regular.woff2" }
      ]
    },
    {
      title: "Typography",
      links: [
        { label: "Font Styles", href: "typography/typography.html" }
      ]
    },
    {
      title: "Button",
      links: [
        { label: "All",     href: "buttons/buttons.html" },
        { label: "Primary", href: "buttons/buttons-primary.html" },
        { label: "Outline", href: "buttons/buttons-outline.html" },
        { label: "Link",    href: "buttons/buttons-link.html" },
        { label: "Icon",    href: "buttons/buttons-icon.html" }
      ]
    },
    {
      title: "Forms",
      links: [
        { label: "Text Input",    href: "text-input/text-input.html" },
        { label: "ComboBox",      href: "combobox/combobox.html" },
        { label: "Switch Toggle", href: "switch-toggle/switch-toggle.html" },
        { label: "Radio Button",  href: "radio-button/radio-button.html" },
        { label: "Checkbox",      href: "checkbox/checkbox.html" },
        { label: "Slider",        href: "slider/slider.html" }
      ]
    },
    {
      title: "Layout",
      links: [
        { label: "Borders",       href: "docs/border-conversion-reference.html" },
        { label: "ScrollViewer",  href: "scroll-viewer/scroll-viewer.html" },
        { label: "BoxShadow",     href: "box-shadow/box-shadow.html" }
      ]
    },
    {
      title: "Data & Status",
      links: [
        { label: "Status Icon",      href: "status-icon/status-icon.html" },
        { label: "Status Button",    href: "status-button/status-button.html" },
        { label: "IconLabelButton",  href: "icon-label-button/icon-label-button.html" },
        { label: "Progress",         href: "progress/progress.html" }
      ]
    },
    {
      title: "Popup",
      links: [
        { label: "All",              href: "popup/popup.html" },
        { label: "Tooltip",          href: "popup/popup-tooltip.html" },
        { label: "Confirmation Bar", href: "popup/popup-confirm.html" },
        { label: "Suggestion List",  href: "popup/popup-suggest.html" },
        { label: "Picker",           href: "popup/popup-picker.html" },
        { label: "Inline Editor (PathBuilder)",    href: "popup/popup-editor.html" },
        { label: "Settings Panel (Haulage)",    href: "popup/popup-settings.html" },
        { label: "Lock List (Vehicle Lockout)", href: "popup/popup-lock.html" }
      ]
    },
    {
      title: "Overlay",
      links: [
        { label: "All",                                  href: "overlay/overlay.html" },
        { label: "Modal",                                href: "overlay/overlay-modal.html" },
        { label: "Side Panel",                           href: "overlay/overlay-panel.html" },
        { label: "History Inspector (ConfigurationHistory)", href: "overlay/overlay-history.html" }
      ]
    },
    {
      title: "Navigation",
      links: [
        { label: "TabControl",  href: "tab-control/tab-control.html" },
        { label: "MasterDetailControl",  href: "master-detail-control/master-detail-control.html" }
      ]
    },
    {
      title: "List & Collection Patterns",
      links: [
        { label: "ItemsControl",                href: "items-control/items-control.html" },
        { label: "ExpanderItem + IconLabelExpander", href: "expander-item/expander-item.html" },
        { label: "DataGrid",     href: "data-grid/data-grid.html" }
      ]
    }
  ];


  /* ===========================================================
     THEME DEFINITIONS
     =========================================================== */
  var THEMES = ["Light", "Dark", "Blackout", "Blue", "Sunlight"];
  var STORAGE_KEY = "mobius-theme";
  var DEFAULT_THEME = "Light";


  /* ===========================================================
     BUILD NAV HTML
     =========================================================== */
  function currentPage() {
    var path = location.pathname;
    /* Grab the last segment (e.g. "buttons-primary.html") */
    return path.substring(path.lastIndexOf("/") + 1) || "index.html";
  }

  function buildNav() {
    var page = currentPage();
    var html = "";

    /* ---- Header ---- */
    html += '<div class="mob-nav__header">';
    html += '  <a class="mob-nav__header-link" href="' + P + 'index.html">';
    html += '    <span class="mob-nav__logo">\uE555</span>';
    html += '    <span class="mob-nav__title">Mobius Blazor Components</span>';
    html += '  </a>';
    html += '</div>';

    /* ---- Search bar ---- */
    html += '<div class="mob-nav__search">';
    html += '  <span class="mob-nav__search-icon">\uE511</span>';
    html += '  <input class="mob-nav__search-input" type="text" placeholder="Find components">';
    html += '  <kbd class="mob-nav__search-kbd">\u2303 K</kbd>';
    html += '</div>';

    /* ---- Nav groups ---- */
    for (var g = 0; g < NAV_LINKS.length; g++) {
      var group = NAV_LINKS[g];

      /* Determine if this group contains the active page */
      var groupHasActive = false;
      for (var k = 0; k < group.links.length; k++) {
        if (group.links[k].href.indexOf(page) !== -1) { groupHasActive = true; break; }
      }

      html += '<details class="mob-nav__group--collapsible"' + (groupHasActive ? " open" : "") + '>';
      html += '  <summary>' + group.title + '</summary>';

      if (group.download) {
        html += '  <a class="mob-nav__download-all" href="' + P + group.download.href + '" download>' + group.download.label + '</a>';
      }

      for (var j = 0; j < group.links.length; j++) {
        var link = group.links[j];
        var isActive = link.href.indexOf(page) !== -1;
        html += '  <a class="mob-nav__link' + (isActive ? " is-active" : "") + '" href="' + P + link.href + '">' + link.label + '</a>';
      }

      html += '</details>';
    }

    return html;
  }


  /* ===========================================================
     THEME SWITCHER (gear icon + dropdown)
     =========================================================== */
  function buildThemeButton() {
    var html = "";
    html += '<button class="mob-theme-btn" aria-label="Theme settings">\uE50D</button>';
    html += '<div class="mob-theme-menu">';
    html += '  <div class="mob-theme-menu__heading">THEME</div>';

    for (var i = 0; i < THEMES.length; i++) {
      var t = THEMES[i];
      var active = (t === DEFAULT_THEME) ? " is-active" : "";
      html += '<button class="mob-theme-menu__item' + active + '" data-theme="' + t + '">';
      html += '  <span class="mob-theme-swatches">';
      html += '    <span class="mob-theme-swatch"></span>';
      html += '    <span class="mob-theme-swatch"></span>';
      html += '    <span class="mob-theme-swatch"></span>';
      html += '    <span class="mob-theme-swatch"></span>';
      html += '  </span>';
      html += '  <span class="mob-theme-menu__label">' + t + '</span>';
      html += '  <span class="mob-theme-menu__check">\u2713</span>';
      html += '</button>';
    }

    html += '</div>';
    return html;
  }

  function themePath(name) {
    return P + "styles/" + name + "Theme.css";
  }

  function applyTheme(name) {
    var link = document.getElementById("mob-theme-link");
    if (link) link.setAttribute("href", themePath(name));

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

  function toggleMenu() {
    var menu = document.querySelector(".mob-theme-menu");
    if (menu) menu.classList.toggle("is-open");
  }

  function closeMenu(e) {
    var menu = document.querySelector(".mob-theme-menu");
    var btn = document.querySelector(".mob-theme-btn");
    if (!menu || !btn) return;
    if (!menu.contains(e.target) && e.target !== btn) {
      menu.classList.remove("is-open");
    }
  }


  /* ===========================================================
     INIT
     =========================================================== */
  function init() {
    var nav = document.getElementById("mob-nav");
    if (!nav) return;

    /* Inject nav HTML */
    nav.innerHTML = buildThemeButton() + buildNav();

    /* Restore saved theme */
    var saved = DEFAULT_THEME;
    try { saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME; } catch (e) { /* silent */ }
    applyTheme(saved);

    /* Wire up theme switcher */
    var btn = document.querySelector(".mob-theme-btn");
    if (btn) btn.addEventListener("click", toggleMenu);

    var items = document.querySelectorAll(".mob-theme-menu__item");
    for (var i = 0; i < items.length; i++) {
      items[i].addEventListener("click", function () {
        applyTheme(this.getAttribute("data-theme"));
        toggleMenu();
      });
    }

    document.addEventListener("click", closeMenu);

    /* Wire up component search */
    var searchInput = document.querySelector(".mob-nav__search-input");
    var kbd = document.querySelector(".mob-nav__search-kbd");

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        var query = this.value.toLowerCase().trim();
        var groups = nav.querySelectorAll(".mob-nav__group--collapsible");

        for (var g = 0; g < groups.length; g++) {
          var links = groups[g].querySelectorAll(".mob-nav__link");
          var visibleCount = 0;

          for (var l = 0; l < links.length; l++) {
            var match = !query || links[l].textContent.toLowerCase().indexOf(query) !== -1;
            links[l].style.display = match ? "" : "none";
            if (match) visibleCount++;
          }

          /* Hide download-all links when filtering */
          var dl = groups[g].querySelector(".mob-nav__download-all");
          if (dl) dl.style.display = query ? "none" : "";

          /* Hide entire group if no matches; open groups that have matches */
          groups[g].style.display = (query && visibleCount === 0) ? "none" : "";
          if (query && visibleCount > 0) groups[g].open = true;
        }

        /* Hide keyboard hint while typing */
        if (kbd) kbd.style.display = query ? "none" : "";
      });

      /* Ctrl+K / Cmd+K shortcut to focus search */
      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "k") {
          e.preventDefault();
          searchInput.focus();
          searchInput.select();
        }
        /* Escape clears and blurs */
        if (e.key === "Escape" && document.activeElement === searchInput) {
          searchInput.value = "";
          searchInput.dispatchEvent(new Event("input"));
          searchInput.blur();
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();

/* =============================================
   iPAD SANDBOX, VARIANT v7 "convoy, finger drag"
   Ben, 2026-11-18: "Can I time transition with finger drag?"

   All the motion is CSS, written as a function of one number, --p
   (0 = closed, 1 = open). See v7-convoy-drag.css.
   This script only does three things:
     1. while a finger (or mouse) drags the handle, set --p from the distance
     2. on release, decide open or closed and let CSS finish the move
     3. leave plain taps alone, so tap-to-toggle still works
   Remove this file and the page still opens and closes on tap.
   ============================================= */
(function () {
  'use strict';

  var device = document.querySelector('.sandbox-device');
  var stage = document.querySelector('.sandbox-stage');
  var handle = document.querySelector('.ipad-drawer__handle');
  var toggle = document.getElementById('sandbox-drawer-open');
  if (!device || !stage || !handle || !toggle) return;

  var TRAVEL = 724;        // px the sheet's top edge moves: 820 open - 96 closed
  var SLOP = 6;            // px of movement before a press counts as a drag
  var FLICK = 0.5;         // px per ms: a faster release than this follows the flick
  var SETTLE_FULL = 600;   // ms for CSS to finish a full 0 to 1 after release

  var drag = null;

  function clamp01(n) { return Math.max(0, Math.min(1, n)); }

  handle.addEventListener('pointerdown', function (e) {
    if (e.button !== undefined && e.button !== 0) return;
    drag = {
      id: e.pointerId,
      startY: e.clientY,
      startP: toggle.checked ? 1 : 0,
      p: toggle.checked ? 1 : 0,
      moved: false,
      lastY: e.clientY,
      lastT: e.timeStamp,
      speed: 0             // px per ms, up is positive
    };
    // Keep getting this finger's moves even after it leaves the 26px handle
    handle.setPointerCapture(e.pointerId);
  });

  handle.addEventListener('pointermove', function (e) {
    if (!drag || e.pointerId !== drag.id) return;
    var dy = drag.startY - e.clientY;                 // up is positive
    if (!drag.moved) {
      if (Math.abs(dy) < SLOP) return;
      drag.moved = true;
      device.classList.add('is-dragging');            // CSS: no easing, names and gauges tuck away
    }
    var dt = e.timeStamp - drag.lastT;
    if (dt > 0) drag.speed = (drag.lastY - e.clientY) / dt;
    drag.lastY = e.clientY;
    drag.lastT = e.timeStamp;
    drag.p = clamp01(drag.startP + dy / TRAVEL);
    device.style.setProperty('--p', drag.p.toFixed(4));
  });

  function finish(e) {
    if (!drag || e.pointerId !== drag.id) return;
    var d = drag;
    drag = null;
    if (!d.moved) return;                             // a tap: the label toggles the checkbox itself

    // Open or closed? A flick wins, otherwise whichever end is nearer.
    var open = Math.abs(d.speed) > FLICK ? d.speed > 0 : d.p > 0.5;
    if (e.type === 'pointercancel') open = d.startP === 1;

    // Time for CSS to cover the distance that is left
    var left = Math.abs((open ? 1 : 0) - d.p);
    stage.style.setProperty('--sandbox-settle', Math.round(Math.max(120, SETTLE_FULL * left)) + 'ms');
    stage.style.setProperty('--sandbox-settle-delay', '0ms');

    toggle.checked = open;
    device.classList.remove('is-dragging');
    device.style.removeProperty('--p');               // CSS takes over from where the finger left it

    // The release would also "click" the label and flip the checkbox back. Swallow that one click.
    var swallow = function (ev) { ev.preventDefault(); ev.stopPropagation(); };
    handle.addEventListener('click', swallow, { capture: true, once: true });
    setTimeout(function () { handle.removeEventListener('click', swallow, true); }, 300);
  }

  handle.addEventListener('pointerup', finish);
  handle.addEventListener('pointercancel', finish);

  // A plain tap (or keyboard) goes back to the tap timing in the CSS.
  toggle.addEventListener('change', function () {
    stage.style.removeProperty('--sandbox-settle');
    stage.style.removeProperty('--sandbox-settle-delay');
  });
})();

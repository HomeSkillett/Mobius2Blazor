/* =============================================
   iPAD SANDBOX, VARIANT v6 "convoy + sound"
   Ben, 2026-11-18: "This is slightly for fun with the devs. Add low
   swoosh up and light ticks".

   Sound only. All motion is still CSS (v5-convoy.css). This file listens
   for the drawer checkbox and plays synthesized sounds in time with the
   CSS transitions. No audio files, the sounds are made with Web Audio.

     open    low swoosh up as the sheet slides open (350ms)
             one light tick as each vehicle turns the corner, rising in pitch
             a quieter tick as each vehicle parks
     close   the same backwards: ticks falling in pitch, then a low
             swoosh down as the sheet slides shut

   Timing numbers mirror v5-convoy.css. If you change the CSS, change these.
   ============================================= */
(function () {
  'use strict';

  var toggle = document.getElementById('sandbox-drawer-open');
  var stage = document.querySelector('.sandbox-stage');
  if (!toggle || !stage) return;

  var AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;

  var VOLUME = 0.6;            // master volume, 0 to 1
  var VEHICLES = 6;
  var ctx = null;
  var master = null;
  var playing = [];            // sources of the current run, so a quick re-tap can stop them

  // --- Timing, in seconds. Same numbers as v5-convoy.css. ---
  function timing() {
    var css = getComputedStyle(stage);
    var step = parseFloat(css.getPropertyValue('--sandbox-duration')) || 500;   // ms
    if (/\ds\s*$/.test(css.getPropertyValue('--sandbox-duration')) && !/ms/.test(css.getPropertyValue('--sandbox-duration'))) step *= 1000;
    var px = step / 374 / 1000;                  // --sandbox-px: seconds per px of travel
    return {
      px: px,
      convoy: 778 * px,                          // --sandbox-convoy
      sheet: 0.35,                               // --sandbox-sheet
      names: 0.25                                // --sandbox-names
    };
  }

  // --- Sounds ---
  function noiseBuffer(audio, seconds) {
    var buffer = audio.createBuffer(1, Math.ceil(audio.sampleRate * seconds), audio.sampleRate);
    var data = buffer.getChannelData(0);
    for (var i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    return buffer;
  }

  // Low swoosh: filtered noise whose pitch sweeps up (or down).
  function swoosh(audio, out, at, seconds, up) {
    var src = audio.createBufferSource();
    src.buffer = noiseBuffer(audio, seconds + 0.1);
    var band = audio.createBiquadFilter();
    band.type = 'bandpass';
    band.Q.value = 0.9;
    var low = up ? 170 : 640, high = up ? 640 : 170;   // low, but still audible on laptop and iPad speakers
    band.frequency.setValueAtTime(low, at);
    band.frequency.exponentialRampToValueAtTime(high, at + seconds);
    var gain = audio.createGain();
    gain.gain.setValueAtTime(0.02, at);
    gain.gain.exponentialRampToValueAtTime(1.5, at + seconds * (up ? 0.3 : 0.6));
    gain.gain.exponentialRampToValueAtTime(0.0001, at + seconds + 0.08);
    src.connect(band); band.connect(gain); gain.connect(out);
    src.start(at); src.stop(at + seconds + 0.1);
    return src;
  }

  // Light tick: a very short, soft blip.
  function tick(audio, out, at, hz, level) {
    var osc = audio.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(hz, at);
    osc.frequency.exponentialRampToValueAtTime(hz * 0.7, at + 0.03);
    var gain = audio.createGain();
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(level, at + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.045);
    osc.connect(gain); gain.connect(out);
    osc.start(at); osc.stop(at + 0.06);
    return osc;
  }

  // Pitch per vehicle: a small step up the list, top row highest.
  function pitch(n) { return 1500 * Math.pow(1.07, VEHICLES - 1 - n); }

  // Schedule one open or close on any audio context. Returns the sources.
  function schedule(audio, out, opening, t0) {
    var t = timing();
    var made = [];
    var n;
    if (opening) {
      made.push(swoosh(audio, out, t0, t.sheet, true));
      for (n = 0; n < VEHICLES; n++) {
        // CSS: vehicle n reaches the corner at 71n px, parks at (723 + 11n) px
        if (n > 0) made.push(tick(audio, out, t0 + 71 * n * t.px, pitch(n), 0.11));
        made.push(tick(audio, out, t0 + (723 + 11 * n) * t.px, pitch(n) * 1.5, 0.05));
      }
    } else {
      for (n = 0; n < VEHICLES; n++) {
        // CSS: names slide in first, then vehicle n leaves at (55 - 11n) px
        // and reaches the corner at (778 - 71n) px
        made.push(tick(audio, out, t0 + t.names + (55 - 11 * n) * t.px, pitch(n) * 1.5, 0.05));
        if (n > 0) made.push(tick(audio, out, t0 + t.names + (778 - 71 * n) * t.px, pitch(n), 0.11));
      }
      made.push(swoosh(audio, out, t0 + t.names + t.convoy - t.sheet, t.sheet, false));
    }
    return made;
  }

  toggle.addEventListener('change', function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;   // CSS skips the motion, so skip the sound
    if (!ctx) {
      ctx = new AudioCtx();
      master = ctx.createGain();
      master.gain.value = VOLUME;
      master.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    playing.forEach(function (src) { try { src.stop(); } catch (e) { /* already stopped */ } });
    playing = schedule(ctx, master, toggle.checked, ctx.currentTime + 0.01);
  });

  // For testing the timing without speakers.
  window.sandboxSound = { schedule: schedule, timing: timing };
})();

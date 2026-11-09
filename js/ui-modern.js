/* ============================================================
   BLOODMACH — ui-modern.js
   Microinterações da interface moderna: luz que acompanha o
   ponteiro e ripple nos controles. Tudo desligado no visual
   clássico (html[data-ui="classic"]) e no modo de movimento
   reduzido.
   ============================================================ */
(function () {
  'use strict';

  function modernOn() {
    return document.documentElement.getAttribute('data-ui') !== 'classic';
  }

  function reduceMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  /* ---------------- luz do ponteiro ---------------- */
  var root = document.documentElement;
  var targetX = 0, targetY = 0;
  var curX = 0, curY = 0;
  var raf = 0;
  var glowStarted = false;

  function glowTick() {
    curX += (targetX - curX) * 0.14;
    curY += (targetY - curY) * 0.14;
    root.style.setProperty('--ui-mx', curX.toFixed(1) + 'px');
    root.style.setProperty('--ui-my', curY.toFixed(1) + 'px');
    if (Math.abs(targetX - curX) > 0.5 || Math.abs(targetY - curY) > 0.5) {
      raf = requestAnimationFrame(glowTick);
    } else {
      raf = 0;
    }
  }

  window.addEventListener('pointermove', function (ev) {
    if (!modernOn() || reduceMotion() || ev.pointerType === 'touch') return;
    targetX = ev.clientX;
    targetY = ev.clientY;
    if (!glowStarted) {
      glowStarted = true;
      curX = targetX;
      curY = targetY;
    }
    if (!raf) raf = requestAnimationFrame(glowTick);
  }, { passive: true });

  /* ---------------- ripple ---------------- */
  var RIPPLE_TARGETS = '.btn, .tab, .mv, .node, .move-pick, .list-item, .title-menu .btn';

  document.addEventListener('pointerdown', function (ev) {
    if (!modernOn() || reduceMotion()) return;
    if (ev.button !== 0) return;
    var target = ev.target && ev.target.closest ? ev.target.closest(RIPPLE_TARGETS) : null;
    if (!target || target.disabled) return;

    var rect = target.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    var size = Math.max(rect.width, rect.height) * 2.2;
    var dot = document.createElement('span');
    dot.className = 'ui-ripple';
    dot.style.width = size + 'px';
    dot.style.height = size + 'px';
    dot.style.left = (ev.clientX - rect.left - size / 2) + 'px';
    dot.style.top = (ev.clientY - rect.top - size / 2) + 'px';

    if (getComputedStyle(target).position === 'static') target.style.position = 'relative';
    target.appendChild(dot);
    window.setTimeout(function () {
      if (dot.parentNode) dot.parentNode.removeChild(dot);
    }, 640);
  }, { passive: true });
})();

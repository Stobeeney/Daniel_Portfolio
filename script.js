/* ════════════════════════════════════════════════════════════
   DANIEL REIN COSARE — PLAYER ONE
   Light gamification: XP bar, achievements, skill bars,
   counters, a continue countdown, and one cheat code.
   ════════════════════════════════════════════════════════════ */
'use strict';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─── TOASTS ─────────────────────────────────── */
const toastBox = document.getElementById('toasts');

function toast(kicker, text, icon = '★') {
  if (!toastBox) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = '<span class="toast-ico"></span><span class="toast-kicker"></span><span class="toast-text"></span>';
  el.querySelector('.toast-ico').textContent = icon;
  el.querySelector('.toast-kicker').textContent = kicker;
  el.querySelector('.toast-text').textContent = text;
  toastBox.appendChild(el);
  setTimeout(() => {
    el.classList.add('out');
    el.addEventListener('animationend', () => el.remove(), { once: true });
    if (reduceMotion) el.remove();
  }, 2800);
}

/* ─── XP BAR (scroll progress) ───────────────── */
(function xpBar() {
  const fill = document.getElementById('xp-fill');
  const num = document.getElementById('xp-num');
  if (!fill || !num) return;
  const MAX_XP = 9999;
  let ticking = false;

  function update() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    fill.style.width = (pct * 100).toFixed(1) + '%';
    num.textContent = Math.round(pct * MAX_XP).toLocaleString() + ' XP';
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
})();

/* ─── AREA DISCOVERY + NAV HIGHLIGHT ─────────── */
(function areas() {
  const areas = document.querySelectorAll('[data-area]');
  const links = document.querySelectorAll('.hud-nav a');
  const found = new Set();

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      links.forEach((a) => a.classList.toggle('is-current', a.getAttribute('href') === '#' + id));

      if (!found.has(id)) {
        found.add(id);
        if (found.size === areas.length) {
          toast('100% complete', 'All areas discovered. GG!', '♛');
        } else {
          toast('Area discovered · ' + found.size + '/' + areas.length, entry.target.dataset.area, '+');
        }
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  areas.forEach((s) => io.observe(s));
})();

/* ─── REVEAL ON SCROLL ───────────────────────── */
(function reveal() {
  const groups = ['.sec-title', '.prose', '.char-sheet', '.skill-group', '.quest', '.save', '.mail', '.socials li'];
  const targets = [];
  groups.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = Math.min(i % 6, 5) * 60 + 'ms';
      targets.push(el);
    });
  });
  // Skill bars fill when visible
  document.querySelectorAll('.skill').forEach((el) => targets.push(el));

  if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach((el) => io.observe(el));
})();

/* ─── STAT COUNTERS ──────────────────────────── */
(function counters() {
  const els = document.querySelectorAll('[data-count]');
  if (reduceMotion) return; // numbers are already rendered server-side

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const start = performance.now();
      const dur = 1400;
      (function frame(now) {
        const t = Math.min(1, (now - start) / dur);
        el.textContent = Math.round((1 - Math.pow(1 - t, 3)) * target).toLocaleString();
        if (t < 1) requestAnimationFrame(frame);
      })(start);
    });
  }, { threshold: 0.5 });

  els.forEach((el) => { el.textContent = '0'; io.observe(el); });
})();

/* ─── CONTINUE? COUNTDOWN ────────────────────── */
(function countdown() {
  const el = document.getElementById('countdown');
  if (!el || reduceMotion) return;
  let n = 9, timer = null;

  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !timer) {
      timer = setInterval(() => {
        n = n <= 0 ? 9 : n - 1;
        el.textContent = n;
      }, 1000);
    } else if (!entry.isIntersecting && timer) {
      clearInterval(timer); timer = null;
    }
  });
  io.observe(el);
})();

/* ─── LOOT OPEN = SMALL REWARD ───────────────── */
(function loot() {
  let opened = 0;
  document.querySelectorAll('.loot').forEach((d) => {
    d.addEventListener('toggle', () => {
      if (d.open && !d.dataset.seen) {
        d.dataset.seen = '1';
        opened++;
        if (opened === 3) toast('Achievement unlocked', 'Loot Goblin: opened 3 chests', '◆');
      }
    });
  });
})();

/* ─── KONAMI CODE ────────────────────────────── */
(function konami() {
  const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let i = 0;
  window.addEventListener('keydown', (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    i = key === code[i] ? i + 1 : (key === code[0] ? 1 : 0);
    if (i === code.length) {
      i = 0;
      const on = document.body.classList.toggle('cheat');
      if (!reduceMotion) {
        document.body.classList.add('shake');
        setTimeout(() => document.body.classList.remove('shake'), 450);
      }
      toast('Cheat code', on ? 'GOD MODE: ON' : 'God mode off. Back to normal.', '⚡');
    }
  });
})();

console.log('%c PLAYER 1 %c Daniel Rein Cosare — try the Konami code.',
  'background:#c8ff2e;color:#0a0a0a;font-weight:800;padding:2px 6px',
  'color:#8f8b82');

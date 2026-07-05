/* ════════════════════════════════════════════════
   TECH EXPLORER MAGAZINE — JavaScript
   Daniel Rein Cosare Portfolio
   ════════════════════════════════════════════════ */

'use strict';

// ─── CURSOR ──────────────────────────────────────
document.addEventListener('mousemove', (e) => {
  document.body.style.setProperty('--cx', e.clientX + 'px');
  document.body.style.setProperty('--cy', e.clientY + 'px');
});

// ─── PCB CANVAS BACKGROUND ────────────────────────
(function initPCBCanvas() {
  const canvas = document.getElementById('pcb-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    drawPCB();
  }

  function drawPCB() {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = 'rgba(77,150,255,0.15)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < W; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // PCB traces
    const traceColors = [
      'rgba(255,217,61,0.4)',
      'rgba(77,150,255,0.4)',
      'rgba(107,203,119,0.3)',
      'rgba(255,77,109,0.3)',
    ];
    ctx.lineWidth = 2;

    for (let i = 0; i < 25; i++) {
      const color = traceColors[Math.floor(Math.random() * traceColors.length)];
      ctx.strokeStyle = color;
      ctx.beginPath();
      let x = Math.random() * W;
      let y = Math.random() * H;
      ctx.moveTo(x, y);
      const segments = Math.floor(Math.random() * 4) + 2;
      for (let s = 0; s < segments; s++) {
        const dir = Math.floor(Math.random() * 4);
        const len = (Math.floor(Math.random() * 8) + 2) * 40;
        if (dir === 0) x += len;
        else if (dir === 1) x -= len;
        else if (dir === 2) y += len;
        else y -= len;
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Via pads
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // IC components
    ctx.strokeStyle = 'rgba(107,203,119,0.25)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 6; i++) {
      const cx = Math.random() * W;
      const cy = Math.random() * H;
      const w  = 60 + Math.random() * 40;
      const h  = 40 + Math.random() * 30;
      ctx.strokeRect(cx - w/2, cy - h/2, w, h);

      // Pins
      const pinCount = 4;
      for (let p = 0; p < pinCount; p++) {
        const px = cx - w/2 - 10 + (p % 2) * (w + 20);
        const py = cy - h/4 + p * (h/2);
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px + (p < 2 ? 10 : -10), py);
        ctx.stroke();
      }
    }
  }

  resize();
  window.addEventListener('resize', resize);
})();

// ─── FLOATING PARTICLES ──────────────────────────
(function initParticles() {
  const container = document.getElementById('particles-cover');
  if (!container) return;
  const colors = ['#FFD93D', '#4D96FF', '#FF4D6D', '#6BCB77'];
  const count = 30;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${Math.random() * 12 + 8}s;
      animation-delay: ${Math.random() * 10}s;
    `;
    container.appendChild(p);
  }
})();

// ─── NAVIGATION ACTIVE STATE ─────────────────────
(function initNavHighlight() {
  const sections = document.querySelectorAll('.section');
  const navTabs  = document.querySelectorAll('.nav-tab');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
        const id = entry.target.id;
        navTabs.forEach(tab => {
          tab.classList.remove('active');
          if (tab.getAttribute('href') === `#${id}`) tab.classList.add('active');
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observer.observe(s));
})();

// ─── SCROLL ANIMATIONS ───────────────────────────
(function initScrollAnimations() {
  // Add data-anim to elements
  const animTargets = [
    { sel: '.article-header',    type: 'left' },
    { sel: '.article-body',      type: '' },
    { sel: '.about-photo-frame', type: 'right' },
    { sel: '.profile-card',      type: 'right' },
    { sel: '.skill-category',    type: '' },
    { sel: '.skill-card',        type: 'scale' },
    { sel: '.project-card',      type: 'scale' },
    { sel: '.timeline-item',     type: '' },
    { sel: '.tool-icon-card',    type: 'scale' },
    { sel: '.flow-step',         type: 'scale' },
    { sel: '.contact-link-card', type: 'left' },
    { sel: '.section-header-block', type: '' },
  ];

  animTargets.forEach(({ sel, type }) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.setAttribute('data-anim', type || 'up');
      el.style.transitionDelay = `${i * 0.07}s`;
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('anim-in');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('[data-anim]').forEach(el => observer.observe(el));
})();

// ─── COUNTER ANIMATION ───────────────────────────
(function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step = 16;
    const totalSteps = duration / step;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const value = Math.round(easeOut(current / totalSteps) * target);
      el.textContent = value;
      if (current >= totalSteps) {
        el.textContent = target + '+';
        clearInterval(timer);
      }
    }, step);
  }

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }
})();

// ─── FX POPUP ON HOVER ───────────────────────────
(function initFXPopups() {
  const popup = document.getElementById('fx-popup');
  if (!popup) return;
  const fxWords = ['POW!', 'WOW!', 'EPIC!', 'SICK!', 'NICE!', 'XP UP!', 'MAX LEVEL!', 'GG!'];
  let lastTime = 0;

  const hotspots = [
    ...document.querySelectorAll('.skill-card'),
    ...document.querySelectorAll('.project-card'),
    ...document.querySelectorAll('.nav-tab'),
    ...document.querySelectorAll('.cover-cta'),
  ];

  hotspots.forEach(el => {
    el.addEventListener('mouseenter', (e) => {
      const now = Date.now();
      if (now - lastTime < 600) return;
      lastTime = now;

      const word = fxWords[Math.floor(Math.random() * fxWords.length)];
      popup.textContent = word;
      const colors = ['#FFD93D', '#4D96FF', '#FF4D6D', '#6BCB77'];
      popup.style.color = colors[Math.floor(Math.random() * colors.length)];

      const rect = el.getBoundingClientRect();
      popup.style.left = (rect.left + rect.width / 2 - 40) + 'px';
      popup.style.top  = (rect.top - 20) + 'px';
      popup.classList.remove('show');
      void popup.offsetWidth;
      popup.classList.add('show');
      setTimeout(() => popup.classList.remove('show'), 700);
    });
  });
})();

// ─── ROBOT MASCOT ────────────────────────────────
(function initMascot() {
  const mascot = document.getElementById('robot-mascot');
  const speech = document.getElementById('mascot-speech');
  if (!mascot || !speech) return;

  const quotes = [
    'System: Active',
    'Let\'s build!',
    'Analyzing PCB design...',
    'Training AI model...',
    'Initiating boot sequence...',
    'Compile successful!',
    'PUP Manila connected.',
    'Level 22 Computer Engineering.',
    'System status: OPTIMAL',
  ];

  let showTimer = null;

  document.addEventListener('mousemove', (e) => {
    // Position mascot speech bubble indicator — mascot stays fixed at bottom-right
    // Show random speech on movement
    clearTimeout(showTimer);
    showTimer = setTimeout(() => {
      speech.textContent = quotes[Math.floor(Math.random() * quotes.length)];
      speech.classList.add('show');
      setTimeout(() => speech.classList.remove('show'), 2000);
    }, 3000);
  });
})();

// ─── CONFETTI ON CONTACT SECTION ─────────────────
(function initConfetti() {
  const canvas  = document.getElementById('confetti-canvas');
  const section = document.getElementById('contact');
  if (!canvas || !section) return;

  let animId  = null;
  let fired   = false;
  const ctx   = canvas.getContext('2d');
  const pieces = [];

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function createPieces() {
    const colors = ['#FFD93D', '#4D96FF', '#FF4D6D', '#6BCB77', '#FFFFFF'];
    for (let i = 0; i < 80; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 200,
        w: Math.random() * 10 + 5,
        h: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 3,
        vy: Math.random() * 3 + 1,
        va: (Math.random() - 0.5) * 0.15,
        alpha: 1,
      });
    }
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    for (const p of pieces) {
      p.x     += p.vx;
      p.y     += p.vy;
      p.angle += p.va;
      p.vy    += 0.05;
      if (p.y > canvas.height - 20) p.alpha -= 0.02;
      if (p.alpha <= 0) continue;
      alive = true;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    if (alive) animId = requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !fired) {
        fired = true;
        resize();
        createPieces();
        tick();
      }
    });
  }, { threshold: 0.2 });

  observer.observe(section);
})();

// ─── SKILL CARD KEYBOARD FLIP ────────────────────
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.classList.toggle('flipped');
    }
  });
});

// ─── STICKER CLICK EFFECT ────────────────────────
document.querySelectorAll('.sticker').forEach(sticker => {
  sticker.style.cursor = 'pointer';
  sticker.addEventListener('click', () => {
    sticker.style.transform = 'scale(1.4) rotate(15deg)';
    setTimeout(() => {
      sticker.style.transform = '';
    }, 300);
  });
});

// ─── SMOOTH ANCHOR SCROLLING ─────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── PCB TRACE HOVER ON HERO ─────────────────────
(function initHeroHover() {
  const canvas = document.getElementById('pcb-canvas');
  if (!canvas) return;

  let mx = 0, my = 0;
  canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mx = e.clientX - rect.left;
    my = e.clientY - rect.top;
  });
})();

// ─── NAV SCROLL SHADOW ────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('main-nav');
  if (window.scrollY > 60) {
    nav.style.boxShadow = '0 4px 40px rgba(255,217,61,0.25)';
  } else {
    nav.style.boxShadow = '0 4px 24px rgba(255,217,61,0.15)';
  }
}, { passive: true });

// ─── TIMELINE BADGE COLORS ────────────────────────
(function colorTimelineBadges() {
  const badges = document.querySelectorAll('.timeline-badge');
  const colors = ['#FFD93D', '#4D96FF', '#FF4D6D', '#6BCB77', '#4D96FF', '#FFD93D'];
  badges.forEach((b, i) => {
    b.style.background = colors[i % colors.length];
    b.style.color = (colors[i % colors.length] === '#4D96FF' || colors[i % colors.length] === '#FF4D6D') ? '#fff' : '#0d0d0f';
    b.style.boxShadow = `0 0 20px ${colors[i % colors.length]}66, 0 0 0 4px #0d0d0f`;
  });
})();

// ─── LIVE ACTIVE COUNT SIMULATION ────────────────
(function initActiveVisitorCounter() {
  const counterEl = document.getElementById('active-count');
  if (!counterEl) return;

  function updateCounter() {
    const count = Math.floor(Math.random() * 5) + 2;
    counterEl.textContent = count;
    const nextInterval = (Math.random() * 10 + 10) * 1000;
    setTimeout(updateCounter, nextInterval);
  }
  updateCounter();
})();

// ─── GUESTBOOK WIDGET CONTROLLER ──────────────────
(function initGuestbook() {
  const widget = document.getElementById('comments-widget');
  const header = document.getElementById('widget-header');
  const form   = document.getElementById('comment-form');
  const list   = document.getElementById('comments-list');
  const inputName = document.getElementById('comment-name');
  const inputText = document.getElementById('comment-text');

  if (!widget || !header || !form || !list) return;

  header.addEventListener('click', () => {
    widget.classList.toggle('expanded');
  });

  const defaultComments = [
    { name: 'EC_STUDENT', text: 'Solid work bro! The K-Zone theme is nostalgic.', time: '2 mins ago' },
    { name: 'KICAD_PRO', text: 'Loved the custom PCB designs. Transmit success!', time: '10 mins ago' },
    { name: 'BOT_BUILDER', text: 'Sumobot competition rules. Keep leveling up!', time: '1 hour ago' }
  ];

  let comments = JSON.parse(localStorage.getItem('guestbook_comments'));
  if (!comments) {
    comments = defaultComments;
    localStorage.setItem('guestbook_comments', JSON.stringify(comments));
  }

  function renderComments() {
    list.innerHTML = '';
    comments.forEach(c => {
      const item = document.createElement('div');
      item.className = 'comment-item';
      item.innerHTML = `
        <div class="comment-item-header">
          <span class="comment-item-name">${escapeHTML(c.name)}</span>
          <span class="comment-item-time">${escapeHTML(c.time)}</span>
        </div>
        <div class="comment-item-text">${escapeHTML(c.text)}</div>
      `;
      list.appendChild(item);
    });
    list.scrollTop = list.scrollHeight;
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = inputName.value.trim();
    const text = inputText.value.trim();
    if (!name || !text) return;

    comments.push({
      name: name,
      text: text,
      time: 'Just now'
    });

    localStorage.setItem('guestbook_comments', JSON.stringify(comments));
    renderComments();
    form.reset();
  });

  renderComments();
})();

console.log(`
  ████████╗███████╗ ██████╗██╗  ██╗    ███████╗██╗  ██╗██████╗ ██╗      ██████╗ ██████╗ ███████╗██████╗
     ██╔══╝██╔════╝██╔════╝██║  ██║    ██╔════╝╚██╗██╔╝██╔══██╗██║     ██╔═══██╗██╔══██╗██╔════╝██╔══██╗
     ██║   █████╗  ██║     ███████║    █████╗   ╚███╔╝ ██████╔╝██║     ██║   ██║██████╔╝█████╗  ██████╔╝
     ██║   ██╔══╝  ██║     ██╔══██║    ██╔══╝   ██╔██╗ ██╔═══╝ ██║     ██║   ██║██╔══██╗██╔══╝  ██╔══██╗
     ██║   ███████╗╚██████╗██║  ██║    ███████╗██╔╝ ██╗██║     ███████╗╚██████╔╝██║  ██║███████╗██║  ██║
     ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝    ╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝

  [SYS] Daniel Rein Cosare — Tech Explorer Magazine Portfolio
  Built with passion for robotics, AI, and code.
  © 2026 Daniel Rein Cosare
`);

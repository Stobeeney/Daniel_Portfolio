/* ════════════════════════════════════════════════════════════
   BUG RUN — a tiny endless runner for the portfolio arcade.
   Jump the bugs, duck the drones, grab the chips.
   Controls: Space / ↑ / W jump (hold = higher), ↓ / S fast-drop,
             P / Esc pause, tap/click on mobile.
   ════════════════════════════════════════════════════════════ */
'use strict';

(function bugRun() {
  const canvas = document.getElementById('game');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Achievement toasts come from script.js (loaded first)
  const say = (kicker, text, icon) => { if (typeof toast === 'function') toast(kicker, text, icon); };

  /* ─── Colors follow the site's CSS variables (incl. God Mode) ─── */
  let C = {};
  function readColors() {
    const cs = getComputedStyle(document.body);
    const v = (n) => cs.getPropertyValue(n).trim();
    C = { bg: v('--bg'), panel: v('--panel'), line: v('--line'), text: v('--text'), muted: v('--muted'), acc: v('--acc'), hot: v('--hot') };
  }
  readColors();
  const godMode = () => document.body.classList.contains('cheat');
  new MutationObserver(() => { readColors(); if (!raf) draw(); })
    .observe(document.body, { attributes: true, attributeFilter: ['class'] });

  /* ─── High score (per visitor, optional) ─── */
  const HI_KEY = 'bugrun_hi';
  let hi = 0;
  try { hi = parseInt(localStorage.getItem(HI_KEY), 10) || 0; } catch (e) { /* storage blocked */ }
  function saveHi() { try { localStorage.setItem(HI_KEY, String(hi)); } catch (e) { /* ignore */ } }

  /* ─── World constants ─── */
  const BOT = { x: 64, w: 30, h: 38 };
  const GRAVITY = 2000;
  const JUMP_V = -690;
  const START_SPEED = 380;
  const MAX_SPEED = 920;

  /* ─── State ─── */
  let W = 0, H = 0, GY = 0;            // canvas size + ground line
  let state = 'ready';                  // ready | playing | paused | over
  let bot, obstacles, chips, fx, pops, speed, dist, bonus, chipCount, spawnT, chipT, t, shake, diedAt, newHi, cheated;
  let fastFall = false;
  const unlocked = new Set();

  function reset() {
    bot = { y: GY - BOT.h, vy: 0, onGround: true, cut: false };
    obstacles = []; chips = []; fx = []; pops = [];
    speed = START_SPEED; dist = 0; bonus = 0; chipCount = 0;
    spawnT = 1.1; chipT = 2.0; t = 0; shake = 0; newHi = false; cheated = false;
  }

  const score = () => Math.floor(dist / 10) + bonus;
  const pad = (n) => String(n).padStart(5, '0');

  /* ─── Sizing (crisp on retina) ─── */
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const oldGY = GY;
    GY = H - 34;
    if (bot) {
      bot.y += GY - oldGY;
      obstacles.forEach((o) => { o.y += GY - oldGY; });
      chips.forEach((c) => { c.y += GY - oldGY; });
    }
    if (!raf) draw();
  }

  /* ─── Spawning ─── */
  function spawnObstacle() {
    const r = Math.random();
    const x = W + 20;
    if (r < 0.5)       obstacles.push({ kind: 'bug',   x, y: GY - 18, w: 28, h: 18 });
    else if (r < 0.78) obstacles.push({ kind: 'cap',   x, y: GY - 44, w: 18, h: 44 });
    else               obstacles.push({ kind: 'drone', x, y: GY - 98 + Math.random() * 12, w: 34, h: 18 });

    // Time until next obstacle — always longer than one jump's airtime
    const level = Math.min(1, (speed - START_SPEED) / (MAX_SPEED - START_SPEED));
    spawnT = 0.82 + Math.random() * 0.95 * (1 - level * 0.45);
  }

  function spawnChip() {
    const high = Math.random() < 0.55;
    chips.push({ x: W + 20, y: high ? GY - 118 : GY - 30, w: 14, h: 14, phase: Math.random() * 6 });
    chipT = 1.6 + Math.random() * 2.2;
  }

  /* ─── Effects ─── */
  function burst(x, y, color, n = 14) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = 80 + Math.random() * 260;
      fx.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 120, life: 0.6 + Math.random() * 0.4, color });
    }
  }
  function pop(x, y, txt, color) { pops.push({ x, y, txt, color, life: 0.8 }); }

  function unlock(id, kicker, text, icon) {
    if (unlocked.has(id)) return;
    unlocked.add(id);
    say(kicker, text, icon);
  }

  /* ─── Game flow ─── */
  function start() {
    reset();
    state = 'playing';
    unlock('boot', 'Achievement unlocked', 'Insert Coin: started Bug Run', '▶');
    canvas.focus({ preventScroll: true });
    run();
  }

  function pause() {
    if (state !== 'playing') return;
    state = 'paused';
  }

  function die(o) {
    state = 'over';
    diedAt = performance.now();
    shake = 10;
    burst(BOT.x + BOT.w / 2, bot.y + BOT.h / 2, C.hot, 26);
    burst(o.x + o.w / 2, o.y + o.h / 2, C.text, 10);

    const s = score();
    if (!cheated && s > hi) {
      newHi = hi > 0;               // only celebrate if beating a previous score
      hi = s;
      saveHi();
      if (newHi) say('New high score', pad(s) + ' pts', '♛');
    }
  }

  /* ─── Input ─── */
  function press() {
    if (state === 'ready') return start();
    if (state === 'over') { if (performance.now() - diedAt > 450) start(); return; }
    if (state === 'paused') { state = 'playing'; return run(); }
    if (bot.onGround) {
      bot.vy = JUMP_V;
      bot.onGround = false;
      bot.cut = false;
    }
  }
  function release() {
    // Short tap = short hop: cut upward velocity when the key is released early
    if (state === 'playing' && !bot.cut && bot.vy < -220) { bot.vy *= 0.45; bot.cut = true; }
  }

  const JUMP_KEYS = [' ', 'Spacebar', 'ArrowUp', 'w', 'W', 'Enter'];
  const DOWN_KEYS = ['ArrowDown', 's', 'S'];

  window.addEventListener('keydown', (e) => {
    // Only grab keys while playing, or when the game screen has focus
    const focused = document.activeElement === canvas;
    if (!focused && state !== 'playing') return;
    if (JUMP_KEYS.includes(e.key)) {
      e.preventDefault();
      if (!e.repeat) press();
    } else if (DOWN_KEYS.includes(e.key)) {
      if (state === 'playing') { e.preventDefault(); fastFall = true; }
    } else if (e.key === 'Escape' || e.key === 'p' || e.key === 'P') {
      pause();
    }
  });
  window.addEventListener('keyup', (e) => {
    if (JUMP_KEYS.includes(e.key)) release();
    if (DOWN_KEYS.includes(e.key)) fastFall = false;
  });
  canvas.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    canvas.focus({ preventScroll: true });
    press();
  });
  window.addEventListener('pointerup', release);
  window.addEventListener('pointercancel', release);

  /* ─── Update ─── */
  const hit = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

  function update(dt) {
    t += dt;
    speed = Math.min(MAX_SPEED, speed + 14 * dt);
    dist += speed * dt;
    if (godMode()) cheated = true;

    // Robot physics
    bot.vy += GRAVITY * dt * (fastFall && !bot.onGround ? 2.4 : 1);
    bot.y += bot.vy * dt;
    if (bot.y >= GY - BOT.h) {
      if (!bot.onGround && bot.vy > 400) burst(BOT.x + BOT.w / 2, GY, C.muted, 5);
      bot.y = GY - BOT.h;
      bot.vy = 0;
      bot.onGround = true;
    }

    // Spawning
    spawnT -= dt; if (spawnT <= 0) spawnObstacle();
    chipT -= dt;  if (chipT <= 0) spawnChip();

    // Move world
    obstacles.forEach((o) => { o.x -= speed * dt * (o.kind === 'drone' ? 1.12 : 1); });
    chips.forEach((c) => { c.x -= speed * dt; });
    obstacles = obstacles.filter((o) => o.x + o.w > -30 && !o.dead);
    chips = chips.filter((c) => c.x + c.w > -30 && !c.taken);

    // Collisions (hitbox slightly smaller than the sprite = fair)
    const hb = { x: BOT.x + 5, y: bot.y + 4, w: BOT.w - 10, h: BOT.h - 6 };
    for (const o of obstacles) {
      const ob = { x: o.x + 3, y: o.y + 3, w: o.w - 6, h: o.h - 4 };
      if (!hit(hb, ob)) continue;
      if (godMode()) {
        o.dead = true; bonus += 25;
        burst(o.x + o.w / 2, o.y + o.h / 2, C.acc, 12);
        pop(o.x, o.y - 6, 'SMASH +25', C.acc);
        shake = 4;
      } else {
        return die(o);
      }
    }
    for (const c of chips) {
      if (hit(hb, c)) {
        c.taken = true; bonus += 50; chipCount++;
        burst(c.x + 7, c.y + 7, C.acc, 8);
        pop(c.x, c.y - 6, '+50', C.acc);
      }
    }

    // Achievements
    const s = score();
    if (s >= 500)  unlock('s500',  'Achievement unlocked', 'Debugger: 500 points', '◆');
    if (s >= 1000) unlock('s1000', 'Achievement unlocked', 'Overclocked: 1,000 points', '⚡');
    if (s >= 2500) unlock('s2500', 'Achievement unlocked', 'Zero Bugs Shipped: 2,500 points', '♛');
    if (chipCount >= 5) unlock('chips5', 'Achievement unlocked', 'Chip Collector: 5 chips in one run', '▣');
  }

  function updateFx(dt) {
    fx.forEach((p) => { p.vy += 900 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt; });
    fx = fx.filter((p) => p.life > 0);
    pops.forEach((p) => { p.y -= 40 * dt; p.life -= dt; });
    pops = pops.filter((p) => p.life > 0);
    shake = Math.max(0, shake - 40 * dt);
  }

  /* ─── Drawing ─── */
  function drawBot(x, y) {
    const dead = state === 'over';
    const blink = Math.floor((t || performance.now() / 1000) * 3) % 2 === 0;
    // antenna
    ctx.fillStyle = C.muted;
    ctx.fillRect(x + 14, y - 7, 2, 9);
    ctx.fillStyle = dead ? C.hot : (blink ? C.acc : C.muted);
    ctx.fillRect(x + 12, y - 11, 6, 5);
    // head + visor
    ctx.fillStyle = C.text;
    ctx.fillRect(x + 5, y + 2, 20, 12);
    ctx.fillStyle = dead ? C.hot : C.acc;
    ctx.fillRect(x + 9, y + 6, 14, 4);
    // body + chest light
    ctx.fillStyle = C.text;
    ctx.fillRect(x + 2, y + 16, 26, 15);
    ctx.fillStyle = C.bg;
    ctx.fillRect(x + 7, y + 20, 6, 6);
    ctx.fillStyle = dead ? C.hot : C.acc;
    ctx.fillRect(x + 8, y + 21, 4, 4);
    // wheels (animate while rolling)
    const roll = bot.onGround && state === 'playing' ? Math.floor(dist / 12) % 2 : 0;
    ctx.fillStyle = C.muted;
    ctx.fillRect(x + 3, y + 31, 8, 7);
    ctx.fillRect(x + 19, y + 31, 8, 7);
    ctx.fillStyle = C.bg;
    ctx.fillRect(x + 5 + roll * 3, y + 33, 2, 3);
    ctx.fillRect(x + 21 + roll * 3, y + 33, 2, 3);
  }

  function drawObstacle(o) {
    const leg = Math.floor(t * 14) % 2;
    if (o.kind === 'bug') {
      ctx.strokeStyle = C.hot; ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const lx = o.x + 7 + i * 7;
        ctx.moveTo(lx, o.y + 10); ctx.lineTo(lx - 3 + (leg ? 2 : 0), o.y + 18);
      }
      ctx.stroke();
      ctx.fillStyle = C.hot;
      ctx.beginPath(); ctx.ellipse(o.x + 15, o.y + 9, 12, 8, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(o.x + 3, o.y + 8, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = C.bg;
      ctx.fillRect(o.x + 14, o.y + 2, 2, 13);           // wing split
      ctx.fillStyle = C.text;
      ctx.fillRect(o.x + 1, o.y + 6, 2, 2);              // eye
    } else if (o.kind === 'cap') {
      ctx.fillStyle = C.muted;
      ctx.fillRect(o.x + 4, o.y + o.h - 6, 2, 6);
      ctx.fillRect(o.x + 12, o.y + o.h - 6, 2, 6);
      ctx.fillStyle = C.text;
      ctx.fillRect(o.x, o.y, o.w, o.h - 6);
      ctx.fillStyle = C.bg;
      ctx.fillRect(o.x + 3, o.y + 6, 3, o.h - 16);      // polarity stripe
      ctx.fillStyle = C.hot;
      ctx.fillRect(o.x, o.y, o.w, 3);
    } else {
      // drone
      ctx.fillStyle = C.text;
      const r = leg ? 12 : 8;
      ctx.fillRect(o.x + 6 - r / 2, o.y, r, 2);
      ctx.fillRect(o.x + 28 - r / 2, o.y, r, 2);
      ctx.fillRect(o.x + 5, o.y + 2, 2, 5);
      ctx.fillRect(o.x + 27, o.y + 2, 2, 5);
      ctx.fillStyle = C.hot;
      ctx.fillRect(o.x, o.y + 7, o.w, 9);
      ctx.fillStyle = C.bg;
      ctx.fillRect(o.x + 4, o.y + 10, 5, 3);
      ctx.fillStyle = C.text;
      ctx.fillRect(o.x + 5, o.y + 11, 3, 1);
    }
  }

  function drawChip(c) {
    const bob = Math.sin(t * 5 + c.phase) * 3;
    const y = c.y + bob;
    ctx.fillStyle = C.acc;
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(c.x - 3, y + 2 + i * 4, 3, 2);
      ctx.fillRect(c.x + c.w, y + 2 + i * 4, 3, 2);
    }
    ctx.fillRect(c.x, y, c.w, c.h);
    ctx.fillStyle = C.bg;
    ctx.fillRect(c.x + 4, y + 4, c.w - 8, c.h - 8);
  }

  function text(str, x, y, font, color, align = 'left') {
    ctx.font = font; ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = 'middle';
    ctx.fillText(str, x, y);
  }

  function overlay(title, sub, sub2, titleColor) {
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(0, 0, W, H);
    const big = Math.max(34, Math.min(64, W / 11));
    text(title, W / 2, H / 2 - 22, `${big}px Anton, Impact, sans-serif`, titleColor || C.text, 'center');
    if (sub2) text(sub2, W / 2, H / 2 + 18, '700 13px "JetBrains Mono", monospace', C.text, 'center');
    const blink = Math.floor(performance.now() / 500) % 2 === 0;
    if (blink) text(sub, W / 2, H / 2 + (sub2 ? 44 : 24), '800 12px "JetBrains Mono", monospace', C.acc, 'center');
  }

  function draw() {
    if (!W || !bot) return;
    ctx.save();
    if (shake > 0) ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);

    // Background + scrolling grid
    ctx.fillStyle = C.panel;
    ctx.fillRect(-12, -12, W + 24, H + 24);
    ctx.strokeStyle = C.line; ctx.lineWidth = 1;
    ctx.beginPath();
    const off = (dist * 0.5) % 40;
    for (let x = -off; x < W; x += 40) { ctx.moveTo(Math.round(x) + 0.5, 0); ctx.lineTo(Math.round(x) + 0.5, GY); }
    for (let y = GY - 40; y > 0; y -= 40) { ctx.moveTo(0, y + 0.5); ctx.lineTo(W, y + 0.5); }
    ctx.stroke();

    // Ground
    ctx.fillStyle = C.text;
    ctx.fillRect(0, GY, W, 2);
    ctx.fillStyle = C.muted;
    const g = dist % 26;
    for (let x = -g; x < W; x += 26) ctx.fillRect(Math.round(x), GY + 12, 12, 2);
    for (let x = -((dist * 1.4) % 60); x < W; x += 60) ctx.fillRect(Math.round(x), GY + 22, 4, 2);

    chips.forEach(drawChip);
    obstacles.forEach(drawObstacle);
    if (state !== 'over') drawBot(BOT.x, bot.y);

    fx.forEach((p) => { ctx.globalAlpha = Math.max(0, Math.min(1, p.life * 2)); ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, 4, 4); });
    ctx.globalAlpha = 1;
    pops.forEach((p) => { ctx.globalAlpha = Math.min(1, p.life * 2); text(p.txt, p.x, p.y, '800 12px "JetBrains Mono", monospace', p.color); });
    ctx.globalAlpha = 1;

    // HUD
    const hudFont = '800 13px "JetBrains Mono", monospace';
    text('SCORE ' + pad(score()), 16, 20, hudFont, C.text);
    text('HI ' + pad(hi), W - 16, 20, hudFont, C.muted, 'right');
    if (godMode()) text('GOD MODE', W / 2, 20, hudFont, C.acc, 'center');

    ctx.restore();

    // Overlays (not shaken)
    const touch = window.matchMedia('(pointer: coarse)').matches;
    const go = touch ? 'TAP' : 'PRESS SPACE';
    if (state === 'ready')  overlay('BUG RUN', go + ' TO START', 'Jump bugs · dodge drones · grab chips');
    if (state === 'paused') overlay('PAUSED', go + ' TO RESUME');
    if (state === 'over')   overlay('CRASHED', go + ' TO RETRY', (newHi ? 'NEW HIGH SCORE  ' : 'SCORE  ') + pad(score()), C.hot);
  }

  /* ─── Loop: only runs while the arcade is on screen ─── */
  let raf = 0, last = 0, visible = false;

  function tick(now) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.033, (now - last) / 1000);
    last = now;
    if (state === 'playing') update(dt);
    updateFx(dt);
    draw();
    raf = requestAnimationFrame(tick);
  }
  function run() {
    if (!raf && visible) { last = performance.now(); raf = requestAnimationFrame(tick); }
  }

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (!visible) pause();
    run();
  }, { threshold: 0.2 }).observe(canvas);

  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });

  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
  else window.addEventListener('resize', resize);

  resize();
  reset();
  draw();
  // Redraw once web fonts are ready so the title uses Anton
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (!raf) draw(); });
})();

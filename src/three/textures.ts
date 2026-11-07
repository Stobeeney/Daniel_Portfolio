import * as THREE from 'three';

/**
 * Procedural textures. Each `draw*` function paints onto a 2D canvas context;
 * `makeTexture` wraps one in a CanvasTexture. Sans-serif only — no monospace.
 */

const SANS = 'Inter, "Helvetica Neue", Arial, sans-serif';

export function makeTexture(
  w: number,
  h: number,
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  draw(ctx, w, h);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

/* ───────────────────────── Desmos-style Mona Lisa ───────────────────────── */

// Desmos' default curve colours
const RED = '#c74440';
const BLUE = '#2d70b3';
const GREEN = '#388c46';
const PURPLE = '#6042a6';
const ORANGE = '#fa7e19';
const BLACK = '#1d1d1d';

type Pt = [number, number];

export function drawMonaLisaGraph(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, w, h);

  // grid: minor every 20px, major every 100px
  ctx.lineWidth = 1;
  for (let x = 0; x <= w; x += 20) {
    ctx.strokeStyle = x % 100 === 0 ? '#c4c4c4' : '#e6e6e6';
    ctx.beginPath(); ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, h); ctx.stroke();
  }
  for (let y = 0; y <= h; y += 20) {
    ctx.strokeStyle = y % 100 === 0 ? '#c9c9c9' : '#ececec';
    ctx.beginPath(); ctx.moveTo(0, y + 0.5); ctx.lineTo(w, y + 0.5); ctx.stroke();
  }
  // axes
  const ax = w / 2;
  const ay = h * 0.86;
  ctx.strokeStyle = '#4d4d4d';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, ay); ctx.lineTo(w, ay); ctx.moveTo(ax, 0); ctx.lineTo(ax, h); ctx.stroke();
  ctx.fillStyle = '#777';
  ctx.font = `500 11px ${SANS}`;
  ctx.textAlign = 'center';
  for (let x = 100; x < w; x += 100) if (x !== ax) ctx.fillText(String((x - ax) / 50), x, ay + 14);
  ctx.textAlign = 'right';
  for (let y = 100; y < h; y += 100) ctx.fillText(String(Math.round((ay - y) / 50)), ax - 5, y + 4);

  const curve = (pts: Pt[], color: string, lw = 3) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = lw * 1.7;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length - 1; i++) {
      const mx = (pts[i][0] + pts[i + 1][0]) / 2;
      const my = (pts[i][1] + pts[i + 1][1]) / 2;
      ctx.quadraticCurveTo(pts[i][0], pts[i][1], mx, my);
    }
    const last = pts[pts.length - 1];
    ctx.lineTo(last[0], last[1]);
    ctx.stroke();
  };
  const region = (pts: Pt[], color: string, alpha: number) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length - 1; i++) {
      const mx = (pts[i][0] + pts[i + 1][0]) / 2;
      const my = (pts[i][1] + pts[i + 1][1]) / 2;
      ctx.quadraticCurveTo(pts[i][0], pts[i][1], mx, my);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };
  const ellipse = (cx: number, cy: number, rx: number, ry: number, color: string, lw = 3, rot = 0) => {
    ctx.strokeStyle = color; ctx.lineWidth = lw * 1.7;
    ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, rot, 0, Math.PI * 2); ctx.stroke();
  };
  const fn = (f: (x: number) => number, x0: number, x1: number, color: string, lw = 2.5) => {
    const pts: Pt[] = [];
    for (let x = x0; x <= x1; x += 4) pts.push([x, f(x)]);
    curve(pts, color, lw);
  };

  // background landscape: wavy horizons + translucent hills
  fn((x) => 170 + 14 * Math.sin(x / 34), 0, w, BLUE, 2);
  fn((x) => 200 + 10 * Math.sin(x / 26 + 1), 0, w, BLUE, 2);
  fn((x) => 250 + 18 * Math.sin(x / 55 + 2), 0, w, GREEN, 2.5);
  region([[0, 250], [90, 235], [170, 270], [170, 420], [0, 420]], GREEN, 0.3);
  region([[w, 250], [510, 240], [430, 275], [430, 420], [w, 420]], GREEN, 0.3);
  fn((x) => 300 - 40 * Math.exp(-Math.pow((x - 90) / 40, 2)), 20, 180, ORANGE, 2); // winding road
  fn((x) => 310 - 34 * Math.exp(-Math.pow((x - 520) / 36, 2)), 420, 580, ORANGE, 2);

  // hair: two long purple outlines with a translucent fill
  const hairL: Pt[] = [[300, 128], [248, 140], [222, 200], [214, 290], [196, 372], [182, 440]];
  const hairR: Pt[] = [[300, 128], [352, 140], [378, 200], [386, 290], [404, 372], [418, 440]];
  region([...hairL, [250, 330], [250, 200], [300, 150], [350, 200], [350, 330], ...hairR.slice().reverse()], PURPLE, 0.34);
  curve(hairL, PURPLE, 3.5);
  curve(hairR, PURPLE, 3.5);
  curve([[250, 330], [246, 400], [236, 470]], PURPLE, 2.5);
  curve([[350, 330], [354, 400], [364, 470]], PURPLE, 2.5);

  // face
  region([[300, 150], [352, 180], [358, 240], [330, 305], [300, 320], [270, 305], [242, 240], [248, 180]], ORANGE, 0.3);
  ellipse(300, 236, 60, 84, ORANGE, 3);
  // brows, eyes, nose, smile
  fn((x) => 198 - 7 * Math.sin(((x - 252) / 36) * Math.PI), 252, 288, BLACK, 2);
  fn((x) => 198 - 7 * Math.sin(((x - 312) / 36) * Math.PI), 312, 348, BLACK, 2);
  ellipse(270, 220, 16, 6.5, BLACK, 2.5);
  ellipse(330, 220, 16, 6.5, BLACK, 2.5);
  ctx.fillStyle = BLACK;
  ctx.beginPath(); ctx.arc(272, 220, 3.4, 0, Math.PI * 2); ctx.arc(332, 220, 3.4, 0, Math.PI * 2); ctx.fill();
  curve([[299, 224], [295, 252], [290, 262], [300, 266], [310, 262]], ORANGE, 2.5);
  curve([[272, 288], [286, 296], [300, 298], [316, 294], [330, 282]], RED, 3.5);

  // neck + dress
  curve([[268, 310], [262, 350], [250, 372]], ORANGE, 2.5);
  curve([[332, 310], [338, 350], [350, 372]], ORANGE, 2.5);
  region([[250, 372], [198, 410], [172, 520], [166, h * 0.86], [434, h * 0.86], [428, 520], [402, 410], [350, 372], [300, 392]], '#3a6b52', 0.4);
  curve([[250, 372], [198, 410], [172, 520], [166, h * 0.86]], BLACK, 3);
  curve([[350, 372], [402, 410], [428, 520], [434, h * 0.86]], BLACK, 3);
  curve([[250, 372], [276, 392], [300, 396], [324, 392], [350, 372]], GREEN, 2.5);
  // sleeves (orange) and folded hands
  region([[198, 410], [176, 500], [196, 560], [250, 566], [262, 500], [244, 430]], ORANGE, 0.34);
  region([[402, 410], [424, 500], [404, 560], [350, 566], [338, 500], [356, 430]], ORANGE, 0.34);
  curve([[198, 410], [176, 500], [196, 560], [250, 566]], ORANGE, 2.5);
  curve([[402, 410], [424, 500], [404, 560], [350, 566]], ORANGE, 2.5);
  ellipse(285, 548, 44, 20, ORANGE, 2.5, -0.15);
  ellipse(330, 556, 40, 17, ORANGE, 2.5, 0.12);
  curve([[250, 566], [292, 580], [348, 580], [352, 566]], BLACK, 2);
}

/* ───────────────────────── Embedded-system schematic ───────────────────────── */

export function drawSchematic(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, w, h);
  const INK = '#1f2937';
  const BLUE_LINE = '#2d70b3';
  ctx.strokeStyle = INK;
  ctx.fillStyle = INK;
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';

  const label = (txt: string, x: number, y: number, size = 15, weight = 600, align: CanvasTextAlign = 'left', color = INK) => {
    ctx.font = `${weight} ${size}px ${SANS}`;
    ctx.textAlign = align;
    ctx.fillStyle = color;
    ctx.fillText(txt, x, y);
  };
  const line = (x1: number, y1: number, x2: number, y2: number, color = INK, lw = 2) => {
    ctx.strokeStyle = color; ctx.lineWidth = lw;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  };
  const box = (x: number, y: number, bw: number, bh: number, title?: string) => {
    ctx.strokeStyle = INK; ctx.lineWidth = 2.4;
    ctx.strokeRect(x, y, bw, bh);
    if (title) label(title, x + bw / 2, y + bh / 2 + 6, 17, 700, 'center');
  };
  const dot = (x: number, y: number) => { ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(x, y, 3.5, 0, Math.PI * 2); ctx.fill(); };
  const cap = (x: number, y: number) => { // vertical capacitor, plates horizontal
    line(x, y, x, y + 14); line(x - 12, y + 14, x + 12, y + 14); line(x - 12, y + 22, x + 12, y + 22); line(x, y + 22, x, y + 38);
  };
  const gnd = (x: number, y: number) => {
    line(x, y, x, y + 8); line(x - 12, y + 8, x + 12, y + 8); line(x - 8, y + 14, x + 8, y + 14); line(x - 4, y + 20, x + 4, y + 20);
  };
  const resistor = (x: number, y: number, len = 56) => { // horizontal zigzag
    ctx.strokeStyle = INK; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x, y);
    const n = 6; const step = len / n;
    for (let i = 0; i < n; i++) ctx.lineTo(x + step * (i + 0.5), y + (i % 2 ? 9 : -9));
    ctx.lineTo(x + len, y); ctx.stroke();
  };

  // title
  label('SUMOBOT MAIN CONTROLLER', 40, 52, 22, 800);
  line(40, 64, w - 40, 64, INK, 2.5);

  // 3.3 V LDO (top left)
  box(60, 110, 130, 76, 'LDO 3.3V');
  line(20, 130, 60, 130); label('VIN', 22, 122, 13, 600);
  line(190, 130, 250, 130, BLUE_LINE); label('3V3', 232, 122, 13, 700, 'left', BLUE_LINE);
  line(125, 186, 125, 214); gnd(125, 214);
  cap(40, 130); gnd(40, 168);
  cap(222, 130); gnd(222, 168);

  // MCU (centre)
  const mx = 300, my = 250, mw = 230, mh = 270;
  box(mx, my, mw, mh, 'MCU');
  label('ARM Cortex-M0', mx + mw / 2, my + mh / 2 + 28, 12, 500, 'center');
  const leftPins = ['XTAL1', 'XTAL2', 'NRST', 'PA0', 'PA1', 'PA2'];
  const rightPins = ['PB0', 'PB1', 'PB2', 'SDA', 'SCL', 'LED'];
  leftPins.forEach((p, i) => { const y = my + 34 + i * 40; line(mx - 34, y, mx, y); label(p, mx + 8, y + 5, 12, 500); });
  rightPins.forEach((p, i) => { const y = my + 34 + i * 40; line(mx + mw, y, mx + mw + 34, y); label(p, mx + mw - 8, y + 5, 12, 500, 'right'); });
  line(mx + mw / 2, my - 28, mx + mw / 2, my, BLUE_LINE); label('3V3', mx + mw / 2 + 6, my - 14, 12, 700, 'left', BLUE_LINE);
  line(mx + mw / 2, 140, mx + mw / 2, my - 28, BLUE_LINE);
  line(250, 130, mx + mw / 2, 130, BLUE_LINE);
  dot(250, 130);

  // crystal on XTAL1/2 (left of MCU)
  const cy1 = my + 34, cy2 = my + 74;
  line(mx - 34, cy1, 214, cy1); line(mx - 34, cy2, 214, cy2);
  line(214, cy1, 214, cy1 + 10); line(214, cy2, 214, cy2 - 10);
  ctx.lineWidth = 2; ctx.strokeRect(204, cy1 + 10, 20, 20);
  line(196, cy1 + 8, 232, cy1 + 8); line(196, cy1 + 32, 232, cy1 + 32);
  label('16 MHz', 168, cy1 + 26, 12, 600, 'right');

  // reset button on NRST
  const ry = my + 114;
  line(mx - 34, ry, 160, ry);
  ctx.beginPath(); ctx.arc(160, ry + 10, 3, 0, 6.3); ctx.stroke();
  line(160, ry + 10, 160, ry + 40); line(146, ry + 18, 174, ry + 12);
  gnd(160, ry + 40);
  label('RESET', 100, ry + 6, 12, 700, 'left');

  // IR sensor header (left, below)
  box(40, 470, 78, 96);
  label('IR', 79, 458, 13, 700, 'center');
  ['VCC', 'OUT L', 'OUT R', 'GND'].forEach((p, i) => { const y = 488 + i * 22; ctx.beginPath(); ctx.arc(60, y, 5, 0, 6.3); ctx.stroke(); label(p, 74, y + 4, 11, 600); });
  line(60 + 5, 510, 150, 510, BLUE_LINE); line(150, 510, 150, my + 34 + 3 * 40, BLUE_LINE); line(150, my + 154, mx - 34, my + 154, BLUE_LINE);

  // status LED + resistor on LED pin
  const ly = my + 34 + 5 * 40;
  line(mx + mw + 34, ly, mx + mw + 50, ly);
  resistor(mx + mw + 50, ly, 40);
  line(mx + mw + 90, ly, mx + mw + 104, ly);
  line(mx + mw + 104, ly - 12, mx + mw + 104, ly + 12);
  line(mx + mw + 104, ly - 12, mx + mw + 124, ly); line(mx + mw + 104, ly + 12, mx + mw + 124, ly); line(mx + mw + 124, ly - 12, mx + mw + 124, ly + 12);
  gnd(mx + mw + 124, ly + 12 + 0);
  label('STATUS', mx + mw + 20, ly - 22, 11, 700);

  // IMU on I²C (top right)
  box(580, 110, 150, 90, 'IMU');
  label('I²C', 655, 100, 13, 700, 'center');
  line(580, 140, 545, 140, BLUE_LINE); line(580, 170, 545, 170, BLUE_LINE);
  label('SDA', 566, 134, 11, 600, 'right'); label('SCL', 566, 164, 11, 600, 'right');
  line(545, 140, 545, my + 34 + 3 * 40, BLUE_LINE); line(545, my + 34 + 3 * 40, mx + mw, my + 34 + 3 * 40, BLUE_LINE);
  line(556, 170, 556, my + 34 + 4 * 40, BLUE_LINE); line(556, my + 34 + 4 * 40, mx + mw, my + 34 + 4 * 40, BLUE_LINE);
  // (the two bus lines above are drawn on top of the right-hand pin stubs)

  // H-bridge driving two motors (bottom)
  const hx = 270, hy = 640;
  label('H-BRIDGE', hx + 120, hy - 20, 14, 800, 'center');
  const fet = (x: number, y: number, name: string) => { box(x, y, 46, 54); label(name, x + 23, y + 33, 12, 700, 'center'); };
  fet(hx, hy, 'Q1'); fet(hx + 194, hy, 'Q2');
  fet(hx, hy + 120, 'Q3'); fet(hx + 194, hy + 120, 'Q4');
  line(hx + 23, hy - 6, hx + 217, hy - 6); label('VBAT', hx + 120, hy - 36, 11, 700, 'center');
  line(hx + 23, hy - 6, hx + 23, hy); line(hx + 217, hy - 6, hx + 217, hy);
  line(hx + 23, hy + 54, hx + 23, hy + 120); line(hx + 217, hy + 54, hx + 217, hy + 120);
  line(hx + 23, hy + 87, hx + 217, hy + 87);
  ctx.strokeStyle = INK; ctx.lineWidth = 2.4;
  ctx.beginPath(); ctx.arc(hx + 120, hy + 87, 26, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill(); ctx.stroke();
  label('M1', hx + 120, hy + 93, 15, 800, 'center');
  line(hx + 23, hy + 174, hx + 217, hy + 174); gnd(hx + 120, hy + 174);
  dot(hx + 23, hy + 87); dot(hx + 217, hy + 87);
  // second motor on the right
  line(hx + 217, hy + 87, hx + 280, hy + 87);
  ctx.beginPath(); ctx.arc(hx + 306, hy + 87, 26, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill(); ctx.stroke();
  label('M2', hx + 306, hy + 93, 15, 800, 'center');
  label('PWM / DIR from MCU', 40, hy + 100, 12, 600);
  line(40, hy + 108, hx - 14, hy + 108, BLUE_LINE);
  line(mx + mw / 2, my + mh, mx + mw / 2, hy - 56, BLUE_LINE);
  line(mx + mw / 2, hy - 56, hx - 14, hy - 56, BLUE_LINE);

  // title block
  const tx = w - 340, ty = h - 120;
  ctx.strokeStyle = INK; ctx.lineWidth = 3;
  ctx.strokeRect(tx, ty, 300, 80);
  line(tx, ty + 40, tx + 300, ty + 40, INK, 1.5);
  label('SUMOBOT MAIN CONTROLLER — REV B', tx + 150, ty + 26, 13, 800, 'center');
  label('Daniel Cosare · Sheet 1 / 1', tx + 150, ty + 64, 12, 500, 'center');
}

/* ───────────────────────── PCB traces ───────────────────────── */

export function drawPcb(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = '#1FBFB8';
  ctx.fillRect(0, 0, w, h);
  // faint board border
  ctx.strokeStyle = '#7EE7DA';
  ctx.lineWidth = 3;
  ctx.strokeRect(10, 10, w - 20, h - 20);

  // traces: horizontal / 45° / vertical runs between pads
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  let seed = 7;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  for (let i = 0; i < 46; i++) {
    const x = 30 + rnd() * (w - 60);
    const y = 30 + rnd() * (h - 60);
    const len1 = 40 + rnd() * 120;
    const len2 = 20 + rnd() * 70;
    const dir = rnd() < 0.5 ? -1 : 1;
    ctx.strokeStyle = i % 3 === 0 ? '#0E7F7A' : '#7EE7DA';
    ctx.lineWidth = i % 3 === 0 ? 4 : 3;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + len1, y);
    ctx.lineTo(x + len1 + len2 * 0.7, y + dir * len2 * 0.7);
    ctx.lineTo(x + len1 + len2 * 0.7, y + dir * (len2 * 0.7 + 30));
    ctx.stroke();
    ctx.fillStyle = '#EAFBF7';
    ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x + len1 + len2 * 0.7, y + dir * (len2 * 0.7 + 30), 5, 0, Math.PI * 2); ctx.fill();
  }
  // vias
  for (let i = 0; i < 26; i++) {
    const x = 24 + rnd() * (w - 48), y = 24 + rnd() * (h - 48);
    ctx.fillStyle = '#EAFBF7'; ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0E7F7A'; ctx.beginPath(); ctx.arc(x, y, 2.6, 0, Math.PI * 2); ctx.fill();
  }
  // mounting holes
  [[34, 34], [w - 34, 34], [34, h - 34], [w - 34, h - 34]].forEach(([x, y]) => {
    ctx.fillStyle = '#EAFBF7'; ctx.beginPath(); ctx.arc(x, y, 14, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#F4F3EF'; ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill();
  });
  // silkscreen
  ctx.fillStyle = '#EAFBF7';
  ctx.font = `800 20px ${SANS}`;
  ctx.textAlign = 'left';
  ctx.fillText('SUMOCTRL  rev B', 60, h - 50);
}

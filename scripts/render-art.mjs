// Renders the abstract brand compositions used as placeholder art.
// These are deliberately abstract (pigment, texture, colour) and never depict
// lips, skin results or people. Replace with Zheen's real photography when ready.
//
// Usage: node scripts/render-art.mjs   (needs a global `playwright` install)
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = new URL('../src/assets/art/', import.meta.url);
mkdirSync(OUT, { recursive: true });

// Deterministic pseudo-random so renders are reproducible.
function rng(seed) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

const grain = (id, opacity) => `
  <filter id="${id}" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
    <feComponentTransfer><feFuncA type="linear" slope="${opacity}"/></feComponentTransfer>
  </filter>`;

const organic = (id, scale, seed) => `
  <filter id="${id}" x="-30%" y="-30%" width="160%" height="160%">
    <feTurbulence type="fractalNoise" baseFrequency="0.006" numOctaves="3" seed="${seed}" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="${scale}" xChannelSelector="R" yChannelSelector="G" result="d"/>
    <feGaussianBlur in="d" stdDeviation="18"/>
  </filter>`;

// Fine striations inside a soft horizontal band: reads as "detail", not as an anatomy.
function striations(r, { cx, cy, w, h, count, color, opacity }) {
  let d = '';
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const x = cx - w / 2 + t * w;
    const env = Math.sin(Math.PI * t) ** 0.7;
    const top = cy - (h / 2) * env * (0.85 + r() * 0.2);
    const bot = cy + (h / 2) * env * (0.85 + r() * 0.2);
    const bend = (r() - 0.5) * 26;
    d += `M${x.toFixed(1)} ${top.toFixed(1)} Q${(x + bend).toFixed(1)} ${cy.toFixed(1)} ${(x + bend * 0.4).toFixed(1)} ${bot.toFixed(1)} `;
  }
  return `<path d="${d}" fill="none" stroke="${color}" stroke-opacity="${opacity}" stroke-width="1.1" stroke-linecap="round"/>`;
}

// Hero: a run of brushed pigment swatches, light to deep, on an ink ground.
function swatch(r, { x, y, w, h, color, rot }) {
  let lines = '';
  for (let i = 0; i < 70; i++) {
    const yy = y + (i / 69) * h;
    const x0 = x + r() * 30;
    const x1 = x + w - r() * 60;
    lines += `M${x0.toFixed(1)} ${yy.toFixed(1)} L${x1.toFixed(1)} ${(yy + (r() - 0.5) * 6).toFixed(1)} `;
  }
  return `<g transform="rotate(${rot} ${x + w / 2} ${y + h / 2})">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${color}" filter="url(#edge)"/>
    <path d="${lines}" stroke="#fff" stroke-opacity=".07" stroke-width="1.2" fill="none" filter="url(#edge)"/>
  </g>`;
}

const hero = () => {
  const r = rng(7);
  const tones = ['#EAC4D0', '#d79aab', '#BD738B', '#a0566f', '#743C51', '#8a5a48', '#5a3530', '#3e2422'];
  const strokes = tones
    .map((color, i) => swatch(r, { x: 140 + i * 38, y: 300 + i * 132, w: 1080 + (i % 3) * 90, h: 112, color, rot: -9 }))
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1600" width="1600" height="1600">
  <defs>
    <radialGradient id="bg" cx="55%" cy="45%" r="75%">
      <stop offset="0" stop-color="#34222b"/><stop offset=".6" stop-color="#1f181c"/><stop offset="1" stop-color="#141113"/>
    </radialGradient>
    <filter id="edge" x="-10%" y="-40%" width="120%" height="180%">
      <feTurbulence type="fractalNoise" baseFrequency="0.012 0.08" numOctaves="3" seed="9" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="38" xChannelSelector="R" yChannelSelector="G" result="d"/>
      <feGaussianBlur in="d" stdDeviation="1.4"/>
    </filter>
    ${grain('g', 0.16)}
  </defs>
  <rect width="1600" height="1600" fill="url(#bg)"/>
  ${strokes}
  <rect width="1600" height="1600" filter="url(#g)" opacity=".5"/>
</svg>`;
};

const lips = () => {
  const r = rng(19);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1500" width="1200" height="1500">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#F6E8E8"/><stop offset="1" stop-color="#EAC4D0"/>
    </linearGradient>
    ${organic('o', 200, 5)}${grain('g', 0.12)}
  </defs>
  <rect width="1200" height="1500" fill="url(#bg)"/>
  <g filter="url(#o)">
    <ellipse cx="420" cy="560" rx="300" ry="190" fill="#5a3530" opacity=".9"/>
    <ellipse cx="700" cy="720" rx="330" ry="200" fill="#BD738B"/>
    <ellipse cx="560" cy="980" rx="320" ry="190" fill="#743C51" opacity=".9"/>
    <ellipse cx="800" cy="1060" rx="200" ry="120" fill="#EAC4D0" opacity=".7"/>
  </g>
  ${striations(r, { cx: 600, cy: 780, w: 860, h: 760, count: 170, color: '#F6E8E8', opacity: 0.16 })}
  <rect width="1200" height="1500" filter="url(#g)" opacity=".5"/>
</svg>`;
};

const skin = () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1500" width="1200" height="1500">
  <defs>
    <linearGradient id="tones" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f1d6c6"/><stop offset=".25" stop-color="#ddb096"/>
      <stop offset=".5" stop-color="#b47e60"/><stop offset=".75" stop-color="#7d4f39"/>
      <stop offset="1" stop-color="#432820"/>
    </linearGradient>
    <radialGradient id="light" cx="30%" cy="25%" r="70%">
      <stop offset="0" stop-color="#fff6f0" stop-opacity=".5"/><stop offset="1" stop-color="#fff6f0" stop-opacity="0"/>
    </radialGradient>
    <filter id="tex" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.09 0.11" numOctaves="3" seed="4"/>
      <feDiffuseLighting lighting-color="#fff" surfaceScale="1.6" diffuseConstant="1">
        <feDistantLight azimuth="225" elevation="55"/>
      </feDiffuseLighting>
      </filter>
    ${grain('g', 0.12)}
  </defs>
  <rect width="1200" height="1500" fill="url(#tones)"/>
  <rect width="1200" height="1500" filter="url(#tex)" opacity=".6" style="mix-blend-mode:multiply"/>
  <rect width="1200" height="1500" fill="url(#light)"/>
  <rect width="1200" height="1500" filter="url(#g)" opacity=".5"/>
</svg>`;

const browser = await chromium.launch();
const page = await browser.newPage();
for (const [name, svg, w, h] of [
  ['hero-pigment', hero(), 1600, 1600],
  ['portal-lips', lips(), 1200, 1500],
  ['portal-skin', skin(), 1200, 1500],
]) {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(`<body style="margin:0">${svg}</body>`);
  await page.locator('svg').screenshot({ path: new URL(`${name}.png`, OUT).pathname });
  console.log('rendered', name);
}
await browser.close();

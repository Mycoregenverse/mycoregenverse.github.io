#!/usr/bin/env node
/**
 * Gera o conjunto de favicons a partir de public/favicon.svg.
 *
 * O glyph é feito de filamentos finos: sozinho ele some a 16px e fica com
 * pouco contraste em aba de navegador clara. Por isso os PNGs saem sobre um
 * quadrado escuro arredondado — massa sólida que lê em qualquer tamanho e em
 * qualquer tema. O SVG continua sendo servido puro para quem suporta.
 *
 *   node scripts/gerar-favicons.mjs
 */
import { readFileSync, writeFileSync, mkdtempSync, rmSync, existsSync, copyFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUB = join(RAIZ, 'public');
const SVG = join(PUB, 'favicon.svg');

/* O glyph é um nó central com filamentos finos que se afinam até sumir. Quanto
   menor o alvo, mais agressivo o tratamento: `zoom` recorta as pontas para o nó
   ocupar o quadrado, e `realce` engrossa o que resta em brilho e contraste. Sem
   isso o favicon de 16px vira um borrão cinza. */
const TAMANHOS = [
  { arq: 'favicon-16.png', px: 16, raio: 3, margem: 0, zoom: 1.32, realce: 'brightness(2.2) contrast(1.7) saturate(2.4)' },
  { arq: 'favicon-32.png', px: 32, raio: 6, margem: 0, zoom: 1.4, realce: 'brightness(1.95) contrast(1.5) saturate(1.8)' },
  { arq: 'favicon-48.png', px: 48, raio: 9, margem: 0, zoom: 1.3, realce: 'brightness(1.6) contrast(1.3)' },
  { arq: 'apple-touch-icon.png', px: 180, raio: 40, margem: 0.12, zoom: 1, realce: 'brightness(1.1)' },
  { arq: 'icon-192.png', px: 192, raio: 42, margem: 0.1, zoom: 1, realce: 'brightness(1.1)' },
  { arq: 'icon-512.png', px: 512, raio: 112, margem: 0.1, zoom: 1, realce: 'none' },
  /* marca do cabeçalho: fundo transparente, sem cantos, sem moldura */
  { arq: 'logo-mark.png', px: 128, raio: 0, margem: 0, zoom: 1, realce: 'none', fundo: 'transparent' },
];

const navegadores = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];
const navegador = navegadores.find((p) => existsSync(p));
if (!navegador) {
  console.error('Nenhum Chrome/Edge encontrado para rasterizar o SVG.');
  process.exit(1);
}

const svgB64 = Buffer.from(readFileSync(SVG)).toString('base64');
const tmp = mkdtempSync(join(tmpdir(), 'fav-'));

for (const { arq, px, raio, margem, realce, zoom, fundo } of TAMANHOS) {
  const pad = Math.round(px * margem);
  const html = `<!doctype html><meta charset="utf-8"><style>
    html,body{margin:0;padding:0;width:${px}px;height:${px}px;background:transparent}
    .b{width:${px}px;height:${px}px;border-radius:${raio}px;background:${fundo ?? '#080808'};
       display:flex;align-items:center;justify-content:center;box-sizing:border-box;
       padding:${pad}px;overflow:hidden}
    img{width:100%;height:100%;object-fit:contain;display:block;
        transform:scale(${zoom});filter:${realce}}
  </style><div class="b"><img src="data:image/svg+xml;base64,${svgB64}"></div>`;

  const htmlPath = join(tmp, `${px}.html`);
  writeFileSync(htmlPath, html, 'utf8');

  execFileSync(
    navegador,
    [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      '--default-background-color=00000000',
      `--window-size=${px},${px}`,
      `--screenshot=${join(tmp, arq)}`,
      'file:///' + htmlPath.replace(/\\/g, '/'),
    ],
    { stdio: 'pipe' },
  );

  copyFileSync(join(tmp, arq), join(PUB, arq));
  console.log(`${arq.padEnd(22)} ${px}x${px}`);
}

rmSync(tmp, { recursive: true, force: true });
console.log('\nFavicons gerados em public/');

/* ------------------------------------------------------------------ *
 *  Imagem de compartilhamento (Open Graph) — 1200x630
 *  O poster do hero é 16:9; redes sociais recortam para 1.91:1 e cortam
 *  o texto. Este card é montado na proporção certa, com wordmark e coda.
 * ------------------------------------------------------------------ */
{
  const posterB64 = Buffer.from(readFileSync(join(PUB, 'hero-poster.jpg'))).toString('base64');
  const logoB64 = Buffer.from(readFileSync(join(PUB, 'logo.svg'))).toString('base64');

  const html = `<!doctype html><meta charset="utf-8"><style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syncopate:wght@700&display=swap');
    html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#080808}
    .w{position:relative;width:1200px;height:630px}
    .bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
        filter:grayscale(.25) brightness(.5) contrast(1.05)}
    .scrim{position:absolute;inset:0;background:
      linear-gradient(90deg,rgba(8,8,8,.96) 0%,rgba(8,8,8,.82) 46%,rgba(8,8,8,.35) 100%),
      linear-gradient(0deg,rgba(8,8,8,.9) 0%,rgba(8,8,8,0) 45%)}
    .c{position:absolute;inset:0;padding:74px 80px;display:flex;flex-direction:column;
       justify-content:center;box-sizing:border-box}
    .mark{display:flex;align-items:center;gap:18px;margin-bottom:26px}
    /* o glyph é composto de filamentos finíssimos: a 60px sobre preto ele some
       sem realce — o mesmo problema dos favicons pequenos */
    .mark img{width:62px;height:62px;filter:brightness(2.1) contrast(1.3) saturate(1.5)}
    .mark span{font-family:'Space Mono',monospace;font-size:15px;letter-spacing:.34em;
               color:#5B8F8A;text-transform:uppercase}
    h1{font-family:'Syncopate',sans-serif;font-weight:700;font-size:62px;line-height:1;
       letter-spacing:-.04em;color:#F2F5F4;margin:0 0 30px;text-transform:uppercase}
    p{font-family:'Space Mono',monospace;font-size:19px;line-height:1.75;letter-spacing:.02em;
      color:#C9D2D0;margin:0;max-width:660px}
  </style>
  <div class="w">
    <img class="bg" src="data:image/jpeg;base64,${posterB64}">
    <div class="scrim"></div>
    <div class="c">
      <div class="mark">
        <img src="data:image/svg+xml;base64,${logoB64}">
        <span>Ponto de transmissão</span>
      </div>
      <h1>Mycoregenverse</h1>
      <p>Um portal na interseção da inteligência micelial, sistemas regenerativos e design bio-civilizacional.</p>
    </div>
  </div>`;

  const tmp2 = mkdtempSync(join(tmpdir(), 'og-'));
  const htmlPath = join(tmp2, 'og.html');
  writeFileSync(htmlPath, html, 'utf8');
  const png = join(tmp2, 'og.png');

  execFileSync(
    navegador,
    ['--headless', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
     '--window-size=1200,630', '--virtual-time-budget=5000', `--screenshot=${png}`,
     'file:///' + htmlPath.replace(/\\/g, '/')],
    { stdio: 'pipe' },
  );

  execFileSync('ffmpeg', ['-v', 'error', '-i', png, '-q:v', '4', join(PUB, 'og-image.jpg'), '-y'], { stdio: 'pipe' });
  rmSync(tmp2, { recursive: true, force: true });
  console.log('og-image.jpg           1200x630');
}

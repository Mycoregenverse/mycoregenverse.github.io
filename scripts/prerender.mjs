#!/usr/bin/env node
/**
 * Pré-renderização: grava um HTML real para cada rota dentro de dist/.
 *
 * O PROBLEMA. O GitHub Pages é um servidor de arquivos estáticos e não tem
 * reescrita de rota. Numa aplicação de página única, `/manifesto` não é um
 * arquivo — é um caminho que só existe depois que o JavaScript roda. O Pages
 * procura o arquivo, não acha, e responde 404. O `404.html` faz o app carregar
 * assim mesmo (por isso a navegação funciona), mas o código de status continua
 * sendo 404, e buscador não indexa página que responde 404.
 *
 * A SOLUÇÃO. Depois do build, visitar cada rota num navegador de verdade e
 * gravar o HTML resultante em `dist/<rota>/index.html`. Aí o Pages encontra um
 * arquivo, responde 200, e o HTML já vem com o conteúdo e com as meta tags da
 * rota — inclusive para quem não executa JavaScript, que hoje recebe uma div
 * vazia.
 *
 * Sem dependências novas: usa o Chrome que já existe na máquina (e que vem
 * instalado no runner do GitHub Actions) com `--dump-dom`.
 *
 *   node scripts/prerender.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { join, dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(RAIZ, 'dist');
const PORTA = 4319;

/* O idioma precisa ser fixado, e a flag `--lang` do Chrome NÃO basta: no Linux
   ela muda a interface do navegador, não `navigator.language`. Medido — a
   primeira publicação saiu com o site inteiro em inglês, porque a locale do
   runner é en-US. Quem manda é o `?lang=`, que `initialLang()` lê antes de
   qualquer outra coisa. A flag fica junto porque ajuda no Windows e não custa.
   pt-BR é o idioma primário; quem prefere inglês troca no seletor e o React
   reescreve tudo assim que monta. */
const IDIOMA = 'pt-BR';
const PARAM_IDIOMA = 'lang=pt';

/* Tempo virtual: o Chrome adianta timers e espera a rede em vez de dormir um
   número fixo de segundos. Um valor fixo de espera é justamente o que faz
   runners lentos gravarem casca vazia sem ninguém perceber. */
const ORCAMENTO_MS = 20000;

/* ---------------------------------------------------------------- rotas ---
 * Lidas do sitemap, que já precisa listar toda página pública. Uma lista
 * separada aqui sairia do ar em silêncio na primeira página nova.            */
function rotas() {
  const xml = readFileSync(join(RAIZ, 'public', 'sitemap.xml'), 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (locs.length === 0) throw new Error('sitemap.xml não tem nenhuma <loc>.');
  return [...new Set(locs.map((u) => new URL(u).pathname))];
}

/* ------------------------------------------------------- servidor local ---
 * Serve dist/ com o mesmo comportamento do Pages depois desta mudança: arquivo
 * real quando existe, index.html quando não existe.                          */
const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.mp4': 'video/mp4',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json',
};

function servidor() {
  return createServer((req, res) => {
    const caminho = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let arquivo = resolve(DIST, '.' + caminho);
    /* nunca servir fora de dist/ */
    if (!arquivo.startsWith(DIST)) {
      res.writeHead(403).end();
      return;
    }
    if (!existsSync(arquivo) || statSync(arquivo).isDirectory()) arquivo = join(DIST, 'index.html');
    res.writeHead(200, { 'content-type': TIPOS[extname(arquivo)] ?? 'application/octet-stream' });
    res.end(readFileSync(arquivo));
  });
}

/* --------------------------------------------------------------- chrome ---*/
function acharChrome() {
  const candidatos = [
    process.env['CHROME_PATH'],
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  ].filter(Boolean);
  const achado = candidatos.find((p) => existsSync(p));
  if (!achado) throw new Error('Nenhum Chrome encontrado. Defina CHROME_PATH.');
  return achado;
}

/**
 * Precisa ser assíncrono. O servidor acima roda neste mesmo processo, e
 * `execFileSync` bloqueia o event loop do Node — o Chrome pediria o HTML e
 * ficaria esperando para sempre uma resposta que o Node não pode enviar
 * enquanto está parado. Com `spawn`, o loop segue livre para servir os pedidos.
 */
function capturar(chrome, url) {
  return new Promise((cumprir, rejeitar) => {
    const p = spawn(
      chrome,
      [
        '--headless',
        '--disable-gpu',
        '--no-sandbox',
        '--disable-dev-shm-usage',
        `--lang=${IDIOMA}`,
        `--virtual-time-budget=${ORCAMENTO_MS}`,
        '--dump-dom',
        url,
      ],
      { stdio: ['ignore', 'pipe', 'ignore'] },
    );

    const pedacos = [];
    p.stdout.on('data', (d) => pedacos.push(d));

    /* teto por rota: sem isto uma página que nunca termina de carregar trava o
       build inteiro sem dizer qual foi */
    const limite = setTimeout(() => {
      p.kill('SIGKILL');
      rejeitar(new Error('tempo esgotado'));
    }, 90000);

    p.on('error', (e) => {
      clearTimeout(limite);
      rejeitar(e);
    });
    p.on('close', (codigo) => {
      clearTimeout(limite);
      if (codigo !== 0) return rejeitar(new Error(`chrome saiu com código ${codigo}`));
      cumprir(Buffer.concat(pedacos).toString('utf8'));
    });
  });
}

/* ------------------------------------------------------------ validação ---
 * Sem isto, uma captura que falhou vira uma página vazia publicada sem aviso —
 * pior do que o 404, porque ninguém percebe.                                  */
function conferir(html, rota) {
  const problemas = [];
  const titulo = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  if (!titulo.trim()) problemas.push('sem <title>');

  const raiz = html.match(/<div id="root">([\s\S]*?)<\/div>\s*<!--|<div id="root">([\s\S]*)/)?.[0] ?? '';
  if (raiz.length < 2000) problemas.push(`#root quase vazio (${raiz.length} bytes)`);

  const canonica = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? '';
  if (!canonica.endsWith(rota)) problemas.push(`canônica não bate: ${canonica}`);

  return { titulo, problemas };
}

/* ----------------------------------------------------------------- main ---*/
if (!existsSync(join(DIST, 'index.html'))) {
  console.error('dist/index.html não existe. Rode `pnpm build` antes.');
  process.exit(1);
}

const chrome = acharChrome();
const lista = rotas();
const srv = servidor();
await new Promise((r) => srv.listen(PORTA, '127.0.0.1', r));

console.log(`pré-renderizando ${lista.length} rotas com ${chrome}\n`);

let falhas = 0;
for (const rota of lista) {
  let html;
  try {
    html = await capturar(chrome, `http://127.0.0.1:${PORTA}${rota}?${PARAM_IDIOMA}`);
  } catch (e) {
    console.error(`  ✗ ${rota} — captura falhou: ${e.message.split('\n')[0]}`);
    falhas++;
    continue;
  }

  const { titulo, problemas } = conferir(html, rota);
  if (problemas.length) {
    console.error(`  ✗ ${rota} — ${problemas.join('; ')}`);
    falhas++;
    continue;
  }

  /* a home sobrescreve o próprio dist/index.html; o 404.html já foi copiado
     antes disso pelo workflow, e continua sendo a casca neutra */
  const destino = join(DIST, rota.replace(/^\//, ''), 'index.html');
  mkdirSync(dirname(destino), { recursive: true });
  writeFileSync(destino, html, 'utf8');
  console.log(`  ✓ ${rota.padEnd(46)} ${(html.length / 1024).toFixed(0).padStart(4)} kB  ${titulo}`);
}

srv.close();

if (falhas) {
  console.error(`\n${falhas} rota(s) falharam. Nada publicado pela metade: corrija antes do deploy.`);
  process.exit(1);
}
console.log(`\n${lista.length} rotas gravadas em dist/`);

/**
 * Metadados por rota.
 *
 * O site é uma SPA: o `<head>` do index.html é o mesmo para todas as URLs. Sem
 * isto, `/manifesto` e `/archive/axia-fund` seriam indexados com o título e a
 * descrição da home, e todo link compartilhado mostraria o mesmo texto.
 *
 * O hook abaixo reescreve título, descrição, canônica e as tags Open Graph a
 * cada mudança de rota e de idioma. Buscadores que executam JavaScript (Google,
 * Bing) leem o resultado; os que não executam continuam vendo o `<head>`
 * estático, que descreve a home — por isso ele permanece completo no HTML.
 *
 * O endereço do site aparece em cinco arquivos e precisa ser trocado nos cinco
 * de uma vez: aqui (SITE_URL), index.html, public/sitemap.xml, public/llms.txt
 * e public/robots.txt. Hoje é o endereço do GitHub Pages; ao registrar o
 * domínio próprio, trocar nos cinco e acrescentar public/CNAME.
 */
import { useEffect } from 'react';
import type { Lang, Translations } from './i18n';
import { slugify } from './content/slugify';

export const SITE_URL = 'https://mycoregenverse.github.io';

const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

interface Meta {
  title: string;
  description: string;
  /** Rotas duplicadas ou sem valor de busca saem do índice. */
  noindex?: boolean;
}

/** Uma linha, sem quebras, dentro do que buscadores exibem. */
function resumir(texto: string, max = 160): string {
  const limpo = texto.replace(/\s+/g, ' ').trim();
  if (limpo.length <= max) return limpo;
  const corte = limpo.slice(0, max);
  return corte.slice(0, corte.lastIndexOf(' ')) + '…';
}

function comMarca(titulo: string): string {
  return `${titulo} — Mycoregenverse`;
}

export function metaForRoute(path: string, t: Translations, lang: Lang): Meta {
  const seg = path.replace(/\/+$/, '').split('/').filter(Boolean);

  if (seg.length === 0) {
    return {
      title: comMarca(
        lang === 'pt'
          ? 'Inteligência micelial e design bio-civilizacional'
          : 'Mycelial intelligence and bio-civilizational design',
      ),
      description: resumir(t.home.hero.coda),
    };
  }

  switch (seg[0]) {
    /* Mesma matéria da home, em layout antigo: fora do índice para não competir. */
    case 'classic':
      return { title: comMarca(t.nav.wordmark), description: resumir(t.home.hero.coda), noindex: true };

    case 'manifesto':
      return { title: comMarca(t.manifesto.open.title), description: resumir(t.manifesto.open.lead) };

    case 'field-notes': {
      if (!seg[1]) return { title: comMarca(t.fieldNotes.title), description: resumir(t.fieldNotes.subtitle) };
      const ensaio = t.fieldNotes.essays.find((e) => e.slug === seg[1]);
      if (!ensaio) return { title: comMarca(t.fieldNotes.title), description: resumir(t.fieldNotes.subtitle), noindex: true };
      return { title: comMarca(ensaio.title), description: resumir(ensaio.excerpt) };
    }

    case 're-sources':
      if (seg[1] === 'bibliografia')
        return { title: comMarca(t.bibliography.title), description: resumir(t.bibliography.subtitle) };
      return { title: comMarca(t.reSources.title), description: resumir(t.reSources.subtitle) };

    case 'archive': {
      if (!seg[1]) return { title: comMarca(t.archive.title), description: resumir(t.archive.subtitle) };
      /* As rotas de detalhe usam o nome do projeto slugificado. */
      const projeto = t.archive.projects.find((p) => slugify(p.name) === seg[1]);
      if (!projeto) return { title: comMarca(t.archive.title), description: resumir(t.archive.subtitle), noindex: true };
      return { title: comMarca(projeto.name), description: resumir(projeto.desc) };
    }

    case 'connect':
      return { title: comMarca(t.connect.title.replace(/\n/g, ' ')), description: resumir(t.connect.body1) };

    default:
      return { title: comMarca(t.notFound.sub), description: resumir(t.home.hero.coda), noindex: true };
  }
}

/** Cria a tag na primeira vez e reaproveita nas seguintes. */
function setMeta(seletor: string, criar: () => HTMLMetaElement, valor: string) {
  let el = document.head.querySelector<HTMLMetaElement>(seletor);
  if (!el) {
    el = criar();
    document.head.appendChild(el);
  }
  el.setAttribute('content', valor);
}

function metaName(nome: string, valor: string) {
  setMeta(`meta[name="${nome}"]`, () => {
    const m = document.createElement('meta');
    m.setAttribute('name', nome);
    return m;
  }, valor);
}

function metaProp(prop: string, valor: string) {
  setMeta(`meta[property="${prop}"]`, () => {
    const m = document.createElement('meta');
    m.setAttribute('property', prop);
    return m;
  }, valor);
}

export function useDocumentMeta(path: string, t: Translations, lang: Lang) {
  useEffect(() => {
    const { title, description, noindex } = metaForRoute(path, t, lang);
    const url = SITE_URL + (path === '/' ? '/' : path);

    document.title = title;
    metaName('description', description);
    metaName(
      'robots',
      noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    );

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    metaProp('og:title', title);
    metaProp('og:description', description);
    metaProp('og:url', url);
    metaProp('og:image', OG_IMAGE);
    metaProp('og:locale', lang === 'pt' ? 'pt_BR' : 'en_US');
    metaProp('og:locale:alternate', lang === 'pt' ? 'en_US' : 'pt_BR');
    metaName('twitter:title', title);
    metaName('twitter:description', description);
    metaName('twitter:image', OG_IMAGE);
  }, [path, t, lang]);
}

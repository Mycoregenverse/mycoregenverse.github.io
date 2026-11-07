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
  /** Dados estruturados próprios da rota (além do grafo fixo do index.html). */
  ld?: Record<string, unknown>[];
  ogType?: 'website' | 'article';
}

const ORG = { '@id': `${SITE_URL}/#organization` };
const WEBSITE = { '@id': `${SITE_URL}/#website` };

function urlDe(caminho: string): string {
  const semBarra = caminho.replace(/\/+$/, '');
  return SITE_URL + (semBarra === '' ? '/' : `${semBarra}/`);
}

/** Trilha de navegação: buscadores mostram no resultado, e modelos usam para situar a página. */
function trilha(itens: { nome: string; caminho: string }[]): Record<string, unknown> {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: itens.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.nome,
      item: urlDe(it.caminho),
    })),
  };
}

function pagina(tipo: string, caminho: string, nome: string, descricao: string, lang: Lang) {
  return {
    '@type': tipo,
    '@id': `${urlDe(caminho)}#webpage`,
    url: urlDe(caminho),
    name: nome,
    description: descricao,
    inLanguage: lang === 'pt' ? 'pt-BR' : 'en',
    isPartOf: WEBSITE,
    about: ORG,
  };
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
  const inicio = lang === 'pt' ? 'Início' : 'Home';

  if (seg.length === 0) {
    const title = comMarca(
      lang === 'pt'
        ? 'Inteligência micelial e design bio-civilizacional'
        : 'Mycelial intelligence and bio-civilizational design',
    );
    const description = resumir(t.home.hero.coda);
    return {
      title,
      description,
      ld: [{ ...pagina('WebPage', '/', title, description, lang), primaryImageOfPage: OG_IMAGE }],
    };
  }

  switch (seg[0]) {
    /* Mesma matéria da home, em layout antigo: fora do índice para não competir. */
    case 'classic':
      return { title: comMarca(t.nav.wordmark), description: resumir(t.home.hero.coda), noindex: true };

    case 'manifesto': {
      const description = resumir(t.manifesto.open.lead);
      return {
        title: comMarca(t.manifesto.open.title),
        description,
        ld: [
          pagina('WebPage', path, t.manifesto.open.title, description, lang),
          trilha([{ nome: inicio, caminho: '/' }, { nome: 'Manifesto', caminho: '/manifesto' }]),
        ],
      };
    }

    case 'field-notes': {
      const nivel1 = { nome: t.fieldNotes.title, caminho: '/field-notes' };
      if (!seg[1]) {
        const description = resumir(t.fieldNotes.subtitle);
        return {
          title: comMarca(t.fieldNotes.title),
          description,
          ld: [
            pagina('CollectionPage', path, t.fieldNotes.title, description, lang),
            trilha([{ nome: inicio, caminho: '/' }, nivel1]),
          ],
        };
      }
      const ensaio = t.fieldNotes.essays.find((e) => e.slug === seg[1]);
      if (!ensaio) return { title: comMarca(t.fieldNotes.title), description: resumir(t.fieldNotes.subtitle), noindex: true };
      const description = resumir(ensaio.excerpt);
      return {
        title: comMarca(ensaio.title),
        description,
        ogType: 'article',
        ld: [
          {
            '@type': 'Article',
            '@id': `${urlDe(path)}#article`,
            headline: ensaio.title,
            description,
            datePublished: ensaio.iso,
            articleSection: ensaio.category,
            inLanguage: lang === 'pt' ? 'pt-BR' : 'en',
            url: urlDe(path),
            mainEntityOfPage: urlDe(path),
            image: OG_IMAGE,
            author: ORG,
            publisher: ORG,
            isPartOf: WEBSITE,
            license: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
          },
          trilha([{ nome: inicio, caminho: '/' }, nivel1, { nome: ensaio.title, caminho: path }]),
        ],
      };
    }

    case 're-sources': {
      const nivel1 = { nome: t.reSources.title, caminho: '/re-sources' };
      if (seg[1] === 'bibliografia') {
        const description = resumir(t.bibliography.subtitle);
        return {
          title: comMarca(t.bibliography.title),
          description,
          ld: [
            pagina('CollectionPage', path, t.bibliography.title, description, lang),
            trilha([{ nome: inicio, caminho: '/' }, nivel1, { nome: t.bibliography.title, caminho: path }]),
          ],
        };
      }
      const description = resumir(t.reSources.subtitle);
      return {
        title: comMarca(t.reSources.title),
        description,
        ld: [
          pagina('CollectionPage', path, t.reSources.title, description, lang),
          trilha([{ nome: inicio, caminho: '/' }, nivel1]),
        ],
      };
    }

    case 'archive': {
      const nivel1 = { nome: t.archive.title, caminho: '/archive' };
      if (!seg[1]) {
        const description = resumir(t.archive.subtitle);
        return {
          title: comMarca(t.archive.title),
          description,
          ld: [
            pagina('CollectionPage', path, t.archive.title, description, lang),
            trilha([{ nome: inicio, caminho: '/' }, nivel1]),
          ],
        };
      }
      /* As rotas de detalhe usam o nome do projeto slugificado. */
      const projeto = t.archive.projects.find((p) => slugify(p.name) === seg[1]);
      if (!projeto) return { title: comMarca(t.archive.title), description: resumir(t.archive.subtitle), noindex: true };
      const description = resumir(projeto.desc);
      return {
        title: comMarca(projeto.name),
        description,
        ld: [
          /* Proposta, não caso entregue — o tipo genérico evita prometer o que não é. */
          {
            '@type': 'CreativeWork',
            '@id': `${urlDe(path)}#work`,
            name: projeto.name,
            description,
            inLanguage: lang === 'pt' ? 'pt-BR' : 'en',
            url: urlDe(path),
            creator: ORG,
            isPartOf: WEBSITE,
            license: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
          },
          trilha([{ nome: inicio, caminho: '/' }, nivel1, { nome: projeto.name, caminho: path }]),
        ],
      };
    }

    case 'connect': {
      const titulo = t.connect.title.replace(/\n/g, ' ');
      const description = resumir(t.connect.body1);
      return {
        title: comMarca(titulo),
        description,
        ld: [
          { ...pagina('ContactPage', path, titulo, description, lang), mainEntity: ORG },
          trilha([{ nome: inicio, caminho: '/' }, { nome: titulo, caminho: '/connect' }]),
        ],
      };
    }

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
    const { title, description, noindex, ld, ogType } = metaForRoute(path, t, lang);
    /* Com barra no fim. Cada rota é publicada como `<rota>/index.html`, e o
       Pages responde 301 de `/manifesto` para `/manifesto/`. Declarar a versão
       sem barra faria a canônica apontar para um endereço que redireciona —
       sinal contraditório para o buscador. A navegação interna continua usando
       a forma sem barra; isto aqui é só o que se declara ao robô. */
    const semBarra = path.replace(/\/+$/, '');
    const url = SITE_URL + (semBarra === '' ? '/' : `${semBarra}/`);

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

    /* Grafo da rota num <script> próprio, separado do grafo fixo do index.html.
       A pré-renderização grava o DOM já montado, então isto chega no HTML
       estático de cada página — inclusive para robôs que não rodam JS. */
    let script = document.head.querySelector<HTMLScriptElement>('script#ld-rota');
    if (ld && ld.length && !noindex) {
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'ld-rota';
        document.head.appendChild(script);
      }
      /* `<` escapado: nenhum texto de conteúdo consegue fechar o <script> antes da hora. */
      script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': ld }).replace(/</g, '\\u003c');
    } else if (script) {
      script.remove();
    }

    metaProp('og:type', ogType ?? 'website');
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

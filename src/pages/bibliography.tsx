import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { pageTransition } from '@/components/FadeIn';
import { SectionHeader } from '@/components/Typography';
import { useLang } from '@/i18n';
import '@/components/cinema/cinema.css';
import { usePinnedZoom } from '@/components/cinema/motion';
import { CinemaFooter } from '@/components/cinema/CinemaFooter';
import { BIBLIOGRAPHY, LINK_LABEL } from '@/content/bibliography';
import { RESOURCE_REFS, itemAnchor } from '@/content/resource-refs';

const clamp = (n: number, lo = 0, hi = 1) => (n < lo ? lo : n > hi ? hi : n);

/* o cabeçalho é fixo; sem esta folga a âncora para debaixo dele */
const OFFSET_CABECALHO = 112;

/** por quanto tempo insistir no salto antes de desistir */
const JANELA_MS = 1200;

/**
 * Leva até o item apontado pela âncora e o destaca por um instante.
 *
 * Chegar ao item é disputado: `useScrollTopOnRouteChange`, no App, zera a
 * rolagem a cada troca de rota; esta página é carregada sob demanda, então
 * monta depois do commit que trocou a rota; e o texto ainda se desloca quando
 * as fontes terminam de carregar. Um único salto perde para qualquer um dos
 * três — medido: a posição voltava a zero.
 *
 * Por isso o salto é dado de imediato e reafirmado a cada quadro até se
 * sustentar, com teto de tempo. Também neutraliza o `scroll-behavior: smooth`
 * que a home deixa no <html> (senão isto vira uma rolagem animada de milhares
 * de pixels) e desconta o cabeçalho fixo, que `scrollIntoView` ignoraria.
 *
 * A primeira tentativa é síncrona de propósito: em aba de fundo — abrir um link
 * compartilhado em nova aba é o caso comum — o navegador congela
 * `requestAnimationFrame` em zero quadro, e um salto que dependesse só dele
 * nunca aconteceria. O leitor voltaria para a aba e a encontraria no topo.
 * Medido: 0 quadros em 800 ms com a aba oculta.
 */
function useAnchorJump(): number | null {
  const [destacado, setDestacado] = useState<number | null>(null);

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id.startsWith('item-')) return;

    const limite = performance.now() + JANELA_MS;
    let quadro = 0;
    let firme = 0;
    let apaga = 0;
    let marcou = false;
    let encerrado = false;

    /** Reposiciona; devolve `true` quando o alvo já está onde deveria. */
    const posicionar = (): boolean => {
      const alvo = document.getElementById(id);
      if (!alvo) return false;
      const html = document.documentElement;
      const anterior = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';
      const destino = Math.max(0, alvo.getBoundingClientRect().top + window.scrollY - OFFSET_CABECALHO);
      const chegou = Math.abs(window.scrollY - destino) <= 2;
      if (!chegou) window.scrollTo(0, destino);
      html.style.scrollBehavior = anterior;
      if (!marcou) {
        marcou = true;
        setDestacado(Number(id.slice(5)));
      }
      return chegou;
    };

    const encerrar = () => {
      encerrado = true;
      apaga = window.setTimeout(() => setDestacado(null), 2600);
    };

    const insistir = () => {
      firme = posicionar() ? firme + 1 : 0;
      /* parado em três quadros seguidos: ninguém mais está disputando */
      if (firme >= 3) return encerrar();
      if (performance.now() < limite) quadro = requestAnimationFrame(insistir);
      else encerrar();
    };

    posicionar();
    quadro = requestAnimationFrame(insistir);

    /* aba oculta: o laço acima não roda. Refaz o salto ao voltar, caso algo
       tenha mexido na rolagem enquanto ninguém olhava. */
    const aoVoltar = () => {
      if (!document.hidden && !encerrado) posicionar();
    };
    document.addEventListener('visibilitychange', aoVoltar);

    return () => {
      cancelAnimationFrame(quadro);
      window.clearTimeout(apaga);
      document.removeEventListener('visibilitychange', aoVoltar);
    };
  }, []);

  return destacado;
}

export default function Bibliography() {
  const { lang, t } = useLang();
  const b = t.bibliography;
  const destacado = useAnchorJump();
  // zoom preso pelos primeiros ~66% do percurso; nos ~34% finais os textos aparecem
  const { sectionRef, imgRef, progress } = usePinnedZoom<HTMLElement, HTMLImageElement>(
    1.06,
    1.44,
    0.66,
  );
  const reveal = clamp((progress - 0.66) / 0.24);

  /* Renumerar a Bibliografia sem atualizar RESOURCE_REFS levaria o visitante à
     obra errada, em silêncio. Aqui o acervo já está carregado, então a conta é
     de graça; em produção o aviso não vai junto. */
  if (import.meta.env.DEV) {
    const porNumero = new Set(BIBLIOGRAPHY.flatMap((s) => s.items).map((i) => i.n));
    for (const [titulo, n] of Object.entries(RESOURCE_REFS)) {
      if (!porNumero.has(n)) {
        console.error(`[bibliografia] "${titulo}" aponta para o item ${n}, que não existe.`);
      }
    }
  }

  return (
    <motion.div {...pageTransition} className="w-full min-h-screen bg-background">
      {/* ── HEADER — imagem de fundo, zoom preso, texto surge depois ── */}
      <div className="cinema-root">
        <header className="mf-open mf-open--tall mf-open--signal" ref={sectionRef}>
          <div className="mf-open__sticky">
            <div className="mf-open__media">
              <img ref={imgRef} src="/bibliografia-header.jpg" alt={b.headerAlt} />
            </div>
            <div className="mf-open__scrim" />
            <div className="mf-open__inner mf-wrap" style={{ justifyContent: 'flex-end' }}>
              <div style={{ opacity: reveal, transform: `translateY(${(1 - reveal) * 24}px)` }}>
                <SectionHeader label={b.marker} />
                <h1 className="mf-hero__title" style={{ margin: 'var(--s-4) 0 var(--s-5)' }}>
                  {b.title}
                </h1>
                <p
                  className="mf-lead"
                  style={{ maxWidth: '46ch', fontSize: 'var(--step-1)', lineHeight: 1.5 }}
                >
                  {b.subtitle}
                </p>
              </div>
            </div>
          </div>
        </header>
      </div>

      <div className="px-6 md:px-12 lg:px-24 pt-24 pb-40">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/re-sources"
            className="font-mono text-xs tracking-widest text-muted-foreground hover:text-white uppercase transition-colors"
          >
            {b.backToResources}
          </Link>

          <div className="mt-20 space-y-24">
            {BIBLIOGRAPHY.map((section) => (
              <section key={section.roman}>
                {/* numeral e título da unidade em ciano — é o sinal que marca
                    a estrutura da página, o mesmo papel dos marcadores de seção
                    no resto do site */}
                <div className="flex items-baseline gap-4 pb-4" style={{ color: 'var(--signal)' }}>
                  <span className="font-mono text-xs">{section.roman}</span>
                  <h2 className="font-display text-lg md:text-xl uppercase tracking-tight">
                    {section.title[lang]}
                  </h2>
                </div>
                <ol className="mt-8 space-y-8">
                  {section.items.map((item) => (
                    <li
                      key={item.n}
                      id={itemAnchor(item.n)}
                      /* scroll-mt-28 = OFFSET_CABECALHO: é o que faz a rolagem
                         nativa do navegador (link colado na barra de endereços)
                         parar no mesmo lugar que o salto em JS, em vez de
                         enfiar o item debaixo do cabeçalho fixo */
                      className={`scroll-mt-28 flex gap-4 md:gap-6 -mx-4 px-4 py-2 rounded-sm transition-colors duration-700 ${
                        destacado === item.n ? 'bg-white/[0.055]' : 'bg-transparent'
                      }`}
                    >
                      <span className="shrink-0 w-8 md:w-10 font-mono text-xs text-muted-foreground pt-1">
                        {item.n}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-sans text-base md:text-lg font-medium text-foreground leading-snug">
                          {item.title}
                        </h3>
                        <p className="mt-1 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
                          {b.byLabel} {item.author} · {item.edition}
                        </p>

                        {item.links.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {item.links.map((l, i) => (
                              <a
                                key={i}
                                href={l.href}
                                target="_blank"
                                rel="noreferrer"
                                className="font-mono text-[10px] tracking-widest uppercase border border-border px-2.5 py-1 hover:border-white/50 hover:text-white text-white/60 transition-colors"
                              >
                                {LINK_LABEL[l.kind][lang]}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>

          <div className="mt-24 pt-10">
            <Link
              href="/re-sources"
              className="font-mono text-xs tracking-widest text-muted-foreground hover:text-white uppercase transition-colors"
            >
              {b.backToResources}
            </Link>
          </div>
        </div>
      </div>
      <CinemaFooter />
    </motion.div>
  );
}

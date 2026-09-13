import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import '@/components/cinema/cinema.css';
import { useLang } from '@/i18n';
import { CinemaNav, LoadingScreen } from '@/components/cinema/chrome';
import { CinemaHero } from '@/components/cinema/CinemaHero';
import { CinemaScene } from '@/components/cinema/CinemaScene';
import { CinemaFooter } from '@/components/cinema/CinemaFooter';
import { Reveal, CountUp, useParallax } from '@/components/cinema/motion';
import { RedeCarousel } from '@/components/cinema/RedeCarousel';
import { MetodoScene } from '@/components/cinema/MetodoScene';
import { slugify } from '@/content/slugify';

const REDE_IMAGES = ['/section-roots.jpg', '/section-forest.jpg', '/section-spores.jpg', '/archive-header.jpg'];

const METODO_MEDIA = [
  { video: '/metodo-escutar.mp4', poster: '/metodo-escutar-poster.jpg' },
  { video: '/metodo-traduzir.mp4', poster: '/metodo-traduzir-poster.jpg' },
  { video: '/metodo-tecer.mp4', poster: '/metodo-tecer-poster.jpg' },
];

function Band({ src, cap }: { src: string; cap: string }) {
  const ref = useParallax<HTMLImageElement>(0.1);
  return (
    <div className="band" aria-hidden="true">
      <img ref={ref} data-parallax src={src} alt="" loading="lazy" />
      <div className="band__cap">{cap}</div>
    </div>
  );
}

export default function HomeCinema() {
  const { t } = useLang();
  const h = t.home;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    if (!reduced) html.style.scrollBehavior = 'smooth';
    return () => {
      html.style.scrollBehavior = prev;
    };
  }, []);

  return (
    <div className="cinema-root">
      <LoadingScreen done={ready} />
      <CinemaNav />

      <CinemaHero onReady={() => setReady(true)} />

      {/* ─── SINAL — cena full-bleed ───────────────────────────── */}
      <CinemaScene
        id="sinal"
        bleed
        marker={h.sceneSinal.marker}
        videoSrc="/hero-sinal.mp4"
        poster="/scene-sinal-poster.jpg"
        lineA={h.sceneSinal.lineA}
        lineB={h.sceneSinal.lineB}
      >
        <div className="grid-2" style={{ alignItems: 'start' }}>
          <Reveal>
            <h2 className="lede">{h.sceneSinal.heading}</h2>
          </Reveal>
          <div className="prose">
            <Reveal delay={1}>
              <p>{h.sceneSinal.p1}</p>
            </Reveal>
            <Reveal delay={2}>
              <p>{h.sceneSinal.p2}</p>
            </Reveal>
          </div>
        </div>
      </CinemaScene>

      {/* ─── MANIFESTO ─────────────────────────────────────────── */}
      <section id="manifesto" className="section wrap">
        <Reveal>
          <p className="marker">{h.manifesto.marker}</p>
        </Reveal>
        <div className="grid-2" style={{ marginTop: 'var(--s-12)' }}>
          <Reveal>
            <div style={{ position: 'sticky', top: '96px' }}>
              <div style={{ aspectRatio: '3 / 4', overflow: 'hidden' }}>
                <img
                  src="/manifesto-portrait.jpg"
                  alt={t.manifesto.open.portraitAlt}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)' }}
                />
              </div>
              <p className="label" style={{ marginTop: 'var(--s-3)' }}>
                {h.manifesto.portraitLabel}
              </p>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="lede" style={{ marginBottom: 'var(--s-8)' }}>
                {h.manifesto.opening}
              </p>
            </Reveal>
            <div className="prose">
              <Reveal delay={1}>
                <p>{h.manifesto.p1}</p>
              </Reveal>
              <Reveal delay={2}>
                <p>{h.manifesto.p2}</p>
              </Reveal>
              <Reveal delay={3}>
                <p>
                  <strong>{h.manifesto.p3}</strong>
                </p>
              </Reveal>
              <Reveal delay={4}>
                <Link href="/manifesto" className="btn" style={{ marginTop: 'var(--s-4)' }}>
                  {h.manifesto.cta}
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Band src="/hero-mycelium.jpg" cap={h.band1} />

      {/* ─── A REDE ────────────────────────────────────────────── */}
      <section id="rede" className="section wrap">
        <Reveal>
          <p className="marker">{h.rede.marker}</p>
        </Reveal>
        <Reveal delay={1}>
          <p
            className="label"
            style={{
              marginTop: 'var(--s-6)',
              lineHeight: 1.8,
              whiteSpace: 'pre-line',
              color: 'var(--c-signal)',
            }}
          >
            {h.rede.note}
          </p>
        </Reveal>
        <Reveal delay={2}>
          <RedeCarousel
            items={h.rede.practices.map((x, i) => ({ ...x, img: REDE_IMAGES[i % REDE_IMAGES.length] }))}
            prevLabel={h.rede.prevLabel}
            nextLabel={h.rede.nextLabel}
          />
        </Reveal>
      </section>

      {/* ─── MÉTODO — "A Descida": três mergulhos full-bleed ───── */}
      {h.metodo.steps.map((x, i) => (
        <MetodoScene
          key={x.n}
          id={i === 0 ? 'metodo' : undefined}
          marker={i === 0 ? h.metodo.marker : undefined}
          openInBlack={i === 0}
          n={x.n}
          title={x.t}
          beats={x.beats}
          videoSrc={METODO_MEDIA[i].video}
          poster={METODO_MEDIA[i].poster}
        />
      ))}

      {/* coda do Método: o número conta já fora do mergulho */}
      <section className="section wrap">
        <Reveal>
          <p className="display" style={{ fontSize: 'var(--step-3)', color: 'var(--c-signal)' }}>
            <CountUp to={400_000_000} />
          </p>
        </Reveal>
        <Reveal delay={1}>
          <p className="label" style={{ marginTop: 'var(--s-2)' }}>
            {h.metodo.statLabel}
          </p>
        </Reveal>
      </section>

      {/* ─── ARQUIVO ───────────────────────────────────────────── */}
      <section id="arquivo" className="section wrap">
        <Reveal>
          <p className="marker">{h.arquivo.marker}</p>
        </Reveal>
        <Reveal delay={1}>
          {/* ciano e quebra preservada, como a nota de "A Rede": as duas abrem
              a seção dizendo o que ela é, não o que ela contém */}
          <div className="prose" style={{ marginTop: 'var(--s-6)' }}>
            <p style={{ whiteSpace: 'pre-line', color: 'var(--c-signal)' }}>{h.arquivo.intro}</p>
          </div>
        </Reveal>
        <div style={{ marginTop: 'var(--s-8)' }}>
          {h.arquivo.projects.map((x, i) => (
            <Reveal key={x.name} delay={i} as="div">
              {/* a linha é o link. `.row` já trazia `text-decoration: none` e o
                  deslize do título no hover — a afordância existia, faltava o
                  destino. Leva ao anteprojeto, como no índice do Arquivo. */}
              <Link href={`/archive/${slugify(x.name)}`} className="row">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: 'var(--s-4)',
                    flexWrap: 'wrap',
                  }}
                >
                  <span className="row__t">{x.name}</span>
                  {/* a etiqueta é a chamada do projeto: quem chega aqui quer
                      saber para onde ir, não em que estágio a coisa está — o
                      estágio continua no índice do Arquivo */}
                  <span className="tag">
                    {x.cta} <span aria-hidden="true">→</span>
                  </span>
                </div>
                <span className="row__meta">{x.cat}</span>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <Link href="/archive" className="btn" style={{ marginTop: 'var(--s-8)' }}>
            {h.arquivo.cta}
          </Link>
        </Reveal>
      </section>

      {/* ─── NOTAS DE CAMPO ────────────────────────────────────── */}
      <section id="notas" className="section wrap">
        <Reveal>
          <p className="marker">{h.notas.marker}</p>
        </Reveal>
        <div style={{ marginTop: 'var(--s-10)' }}>
          {[...h.notas.essays]
            .sort((a, b) => b.iso.localeCompare(a.iso))
            .map((x, i) => (
              <Reveal key={x.slug} delay={i} as="div">
                <Link href={`/field-notes/${x.slug}`} className="row">
                  <span className="row__meta">
                    {x.date} · {x.cat} · {x.min} {h.notas.minLabel}
                  </span>
                  <span className="row__t">{x.title}</span>
                </Link>
              </Reveal>
            ))}
        </div>
        <Reveal>
          <Link href="/field-notes" className="btn" style={{ marginTop: 'var(--s-8)' }}>
            {h.notas.cta}
          </Link>
        </Reveal>
      </section>

      {/* ─── LINHAGEM ──────────────────────────────────────────── */}
      <section id="linhagem" className="section wrap">
        <Reveal>
          <p className="marker">{h.linhagem.marker}</p>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="lede" style={{ margin: 'var(--s-6) 0 var(--s-10)' }}>
            {h.linhagem.heading}
          </h2>
        </Reveal>
        <div className="grid-2" style={{ gap: 'var(--s-4) var(--s-8)' }}>
          {h.linhagem.books.map((x, i) => (
            <Reveal
              key={x.t}
              delay={i}
              as="div"
              style={{ borderLeft: '1px solid var(--c-line-2)', paddingLeft: 'var(--s-4)' }}
            >
              <div className="cell__t" style={{ marginBottom: '4px' }}>
                {x.t}
              </div>
              <div className="label">{x.a}</div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <Link href="/re-sources" className="btn" style={{ marginTop: 'var(--s-10)' }}>
            {h.linhagem.cta}
          </Link>
        </Reveal>
      </section>

      {/* ─── RESSONÂNCIA / FAQ ─────────────────────────────────── */}
      <section id="ressonancia" className="section wrap">
        <Reveal>
          <p className="marker">{h.ressonancia.marker}</p>
        </Reveal>
        <div className="faq" style={{ marginTop: 'var(--s-8)' }}>
          {h.ressonancia.faq.map((x, i) => (
            <Reveal key={x.q} delay={i} as="div">
              <details>
                <summary>{x.q}</summary>
                <p>{x.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── CONECTAR ──────────────────────────────────────────── */}
      <section id="conectar" className="section wrap">
        <Reveal>
          <p className="marker">{h.conectar.marker}</p>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="display" style={{ fontSize: 'var(--step-4)', margin: 'var(--s-8) 0 var(--s-10)' }}>
            {h.conectar.heading}
          </h2>
        </Reveal>
        <div className="grid-2">
          <div className="prose">
            <Reveal>
              <p>{h.conectar.body1}</p>
            </Reveal>
            <Reveal delay={1}>
              <p>{h.conectar.body2}</p>
            </Reveal>
          </div>
          <div>
            <Reveal>
              <p className="label">{h.conectar.directLabel}</p>
              <a
                href="mailto:mycoregenverse@proton.me"
                className="display"
                style={{ fontSize: 'var(--step-1)', display: 'block', margin: 'var(--s-2) 0 var(--s-8)' }}
              >
                mycoregenverse@proton.me
              </a>
            </Reveal>
            <Reveal delay={1}>
              <p className="label">{h.conectar.freqLabel}</p>
              <div style={{ display: 'flex', gap: 'var(--s-4)', margin: 'var(--s-2) 0 var(--s-8)' }}>
                <a
                  href="https://x.com/mycoregenverse"
                  target="_blank"
                  rel="noreferrer"
                  className="display"
                  style={{ fontSize: 'var(--step-0)' }}
                >
                  X ↗
                </a>
                <a
                  href="https://instagram.com/mycoregenverse"
                  target="_blank"
                  rel="noreferrer"
                  className="display"
                  style={{ fontSize: 'var(--step-0)' }}
                >
                  Instagram ↗
                </a>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <a
                href="https://koalendar.com/e/reuniao-com-catito-dev-mycoregenverse"
                target="_blank"
                rel="noreferrer"
                className="btn"
              >
                {h.conectar.cta}
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── A LIBERAÇÃO — cena full-bleed, fecha a página ──────── */}
      <CinemaScene
        id="liberacao"
        bleed
        marker={h.sceneLiberacao.marker}
        videoSrc="/hero-liberacao.mp4"
        poster="/scene-liberacao-poster.jpg"
        lineA={h.sceneLiberacao.lineA}
        lineB={h.sceneLiberacao.lineB}
        detail={{ kind: 'count', label: h.sceneLiberacao.detailLabel, to: 500_000 }}
      />

      <CinemaFooter />
    </div>
  );
}

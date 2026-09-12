import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import '@/components/cinema/cinema.css';
import { useLang } from '@/i18n';
import { CinemaScene } from '@/components/cinema/CinemaScene';
import { CinemaFooter } from '@/components/cinema/CinemaFooter';
import {
  Reveal,
  WordReveal,
  Statement,
  useInViewOnce,
  usePinnedZoom,
} from '@/components/cinema/motion';

const pageIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

function Marker({ label }: { label: string }) {
  const { ref, seen } = useInViewOnce<HTMLParagraphElement>(0.95);
  return (
    <p ref={ref} className={`mf-marker${seen ? ' is-in' : ''}`}>
      [ {label} ]
    </p>
  );
}

export default function Manifesto() {
  const { t } = useLang();
  const m = t.manifesto;
  const { sectionRef: openRef, imgRef: zoomRef } = usePinnedZoom<HTMLElement, HTMLImageElement>(
    1.05,
    1.34,
  );

  return (
    <motion.div {...pageIn} className="cinema-root">
      <div className="mf">
        {/* ── ABERTURA / IDENT ── */}
        <header className="mf-open" id="ident" ref={openRef}>
          <div className="mf-open__sticky">
            <div className="mf-open__media">
              <img ref={zoomRef} src="/manifesto-portrait.jpg" alt={m.open.portraitAlt} />
            </div>
            <div className="mf-open__scrim" />
            <div className="mf-open__inner mf-wrap">
              <div>
                <h1 className="mf-hero__title">
                  <WordReveal text={m.open.title} as="span" stagger={0} />
                </h1>
                <p className="mf-hero__sub">{m.open.sub}</p>
              </div>
              <div>
                <Marker label={m.open.marker} />
                <WordReveal className="mf-lead" text={m.open.lead} />
              </div>
            </div>
          </div>
        </header>

        {/* ── O SISTEMA QUE DEU CERTO ── */}
        <section className="mf-sec mf-wrap" id="sistema">
          <Marker label={m.sistema.marker} />
          <h2 className="mf-h">
            <WordReveal text={m.sistema.h} as="span" />
          </h2>
          <div className="mf-body">
            <Reveal delay={0} as="p">
              {m.sistema.p1}
            </Reveal>
            <Reveal delay={1} as="p">
              {m.sistema.p2}
            </Reveal>
            <Reveal delay={2} as="p">
              {m.sistema.p3a}
              <strong>{m.sistema.p3b}</strong>
            </Reveal>
          </div>
        </section>

        {/* ── E OPERA COM ATRITO ── */}
        <section className="mf-sec mf-wrap" id="atrito">
          <Marker label={m.atrito.marker} />
          <h2 className="mf-h">
            <WordReveal text={m.atrito.h} as="span" />
          </h2>
          <div className="mf-body">
            <Reveal delay={0} as="p">
              {m.atrito.p1}
            </Reveal>
          </div>
          <Statement style={{ margin: 'var(--s-10) 0' }}>{m.atrito.statement}</Statement>
          <div className="mf-body">
            <Reveal delay={0} as="p">
              {m.atrito.p2}
            </Reveal>
          </div>
          <p className="mf-note">{m.atrito.note}</p>
        </section>

        {/* ── ONDE ENTRAMOS ── */}
        <section className="mf-sec mf-wrap" id="entramos">
          <Marker label={m.entramos.marker} />
          <div className="mf-body">
            <Reveal delay={0} as="p">
              {m.entramos.p1}
            </Reveal>
            <Reveal delay={1} as="p">
              {m.entramos.p2}
            </Reveal>
            <Reveal delay={2} as="p">
              {m.entramos.p3}
            </Reveal>
          </div>
          <Statement style={{ marginTop: 'var(--s-10)' }}>{m.entramos.statement}</Statement>
        </section>

        {/* ── O QUE TRADUZIMOS ── */}
        <section className="mf-sec mf-wrap" id="traduzimos">
          <Marker label={m.traduzimos.marker} />
          <WordReveal className="mf-lead" text={m.traduzimos.lead} />
          <ul className="mf-list">
            {m.traduzimos.items.map((c, i) => (
              <Reveal key={c.t} delay={i} as="li">
                <div className="mf-list__t">{c.t}</div>
                <div className="mf-list__d">{c.d}</div>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* ── ÁREAS DE PRÁTICA ── */}
        <section className="mf-sec mf-wrap" id="areas">
          <Marker label={m.areas.marker} />
          <div className="mf-areas">
            {m.areas.items.map((a, i) => (
              <Reveal key={a.n} delay={i} as="div" className="mf-area">
                <div className="mf-area__n">{a.n}</div>
                <div className="mf-area__t">{a.t}</div>
                <div className="mf-area__d">{a.d}</div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── COMO TRABALHAMOS ── */}
        <section className="mf-sec mf-wrap" id="como">
          <Marker label={m.como.marker} />
          <ul className="mf-list">
            {m.como.items.map((x, i) => (
              <Reveal key={x.t} delay={i} as="li">
                <div className="mf-list__t">{x.t}</div>
                <div className="mf-list__d">{x.d}</div>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* ── FREQUÊNCIA ── */}
        <section className="mf-sec mf-wrap" id="frequencia">
          <Marker label={m.frequencia.marker} />
          <WordReveal className="mf-lead" text={m.frequencia.lead} />
          <Statement style={{ marginTop: 'var(--s-8)' }}>{m.frequencia.statement}</Statement>
          <Reveal>
            <Link href="/connect" className="btn" style={{ marginTop: 'var(--s-8)' }}>
              {m.frequencia.cta}
            </Link>
          </Reveal>
        </section>
      </div>

      {/* ── IMAGEM DE FECHAMENTO ── */}
      <CinemaScene
        id="sintese"
        bleed
        videoSrc="/manifesto-scene.mp4"
        poster="/manifesto-scene-poster.jpg"
        lineA={m.scene.lineA}
        lineB={m.scene.lineB}
      />
      <CinemaFooter />
    </motion.div>
  );
}

import React from 'react';
import { FadeIn, pageTransition } from '@/components/FadeIn';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import '@/components/cinema/cinema.css';
import { useLang } from '@/i18n';
import { usePinnedZoom } from '@/components/cinema/motion';
import { CinemaFooter } from '@/components/cinema/CinemaFooter';
import { slugify } from '@/content/slugify';

const clamp = (n: number, lo = 0, hi = 1) => (n < lo ? lo : n > hi ? hi : n);

export default function Archive() {
  const { t } = useLang();
  const a = t.archive;
  // zoom preso pelos primeiros ~66% do percurso; nos ~34% finais os textos aparecem
  const { sectionRef, imgRef, progress } = usePinnedZoom<HTMLElement, HTMLImageElement>(
    1.06,
    1.44,
    0.66,
  );
  const reveal = clamp((progress - 0.66) / 0.24);

  return (
    <motion.div {...pageTransition} className="w-full min-h-screen bg-background">
      {/* ── HEADER — imagem de fundo, zoom preso, texto surge depois ── */}
      <div className="cinema-root">
        <header className="mf-open mf-open--tall" ref={sectionRef}>
          <div className="mf-open__sticky">
            <div className="mf-open__media">
              <img ref={imgRef} src="/archive-header.jpg" alt={a.headerAlt} />
            </div>
            <div className="mf-open__scrim" />
            <div className="mf-open__inner mf-wrap" style={{ justifyContent: 'flex-end' }}>
              <div style={{ opacity: reveal, transform: `translateY(${(1 - reveal) * 24}px)` }}>
                <p className="mf-marker is-in" style={{ marginBottom: 'var(--s-4)' }}>
                  [ {a.marker} ]
                </p>
                <h1 className="mf-hero__title" style={{ marginBottom: 'var(--s-5)' }}>
                  {a.title}
                </h1>
                <p
                  className="mf-lead"
                  style={{ maxWidth: '46ch', fontSize: 'var(--step-1)', lineHeight: 1.5 }}
                >
                  {a.subtitle}
                </p>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* ── TABELA ── */}
      <div className="px-6 md:px-12 lg:px-24 pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="hidden md:grid grid-cols-12 gap-6 pb-6 font-mono text-xs tracking-widest text-muted-foreground uppercase">
            <div className="col-span-5">{a.headers.name}</div>
            <div className="col-span-2">{a.headers.domain}</div>
            <div className="col-span-3">{a.headers.description}</div>
            <div className="col-span-2 text-right">{a.headers.status}</div>
          </div>

          <div className="flex flex-col">
            {a.projects.map((project, i) => (
              <FadeIn key={project.name} delay={0.05 + i * 0.05}>
                <Link
                  href={`/archive/${slugify(project.name)}`}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 py-8 transition-colors items-baseline md:items-center"
                >
                  <div className="md:col-span-5 flex flex-col">
                    <h2 className="font-display text-2xl md:text-3xl uppercase tracking-tighter group-hover:translate-x-2 transition-transform duration-300">
                      {project.name}
                    </h2>
                  </div>

                  <div className="site-meta md:col-span-2 font-mono text-xs tracking-widest uppercase mt-2 md:mt-0">
                    [{project.category}]
                  </div>

                  <div className="md:col-span-3 font-sans text-sm text-muted-foreground leading-relaxed mt-2 md:mt-0">
                    {project.desc}
                  </div>

                  <div className="md:col-span-2 flex items-center justify-start md:justify-end gap-3 mt-4 md:mt-0">
                    <span className="font-mono text-[10px] px-3 py-1 border border-border group-hover:border-white/30 tracking-widest uppercase transition-colors">
                      {project.status}
                    </span>
                    <span
                      aria-hidden
                      className="font-mono text-sm text-muted-foreground group-hover:text-white group-hover:translate-x-1 transition-all"
                    >
                      →
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
      <CinemaFooter />
    </motion.div>
  );
}

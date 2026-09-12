import React from 'react';
import { Link } from 'wouter';
import { FadeIn, pageTransition } from '@/components/FadeIn';
import { motion } from 'framer-motion';
import '@/components/cinema/cinema.css';
import { useLang } from '@/i18n';
import { usePinnedZoom } from '@/components/cinema/motion';
import { CinemaFooter } from '@/components/cinema/CinemaFooter';

const clamp = (n: number, lo = 0, hi = 1) => (n < lo ? lo : n > hi ? hi : n);

export default function FieldNotes() {
  const { t } = useLang();
  const fn = t.fieldNotes;
  const essays = [...fn.essays].sort((a, b) => b.iso.localeCompare(a.iso));
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
              {/* decorativa: o título logo abaixo já carrega a informação */}
              <img ref={imgRef} src="/field-notes-header.jpg" alt="" />
            </div>
            <div className="mf-open__scrim" />
            <div className="mf-open__inner mf-wrap" style={{ justifyContent: 'flex-end' }}>
              <div style={{ opacity: reveal, transform: `translateY(${(1 - reveal) * 24}px)` }}>
                <h1 className="mf-hero__title" style={{ marginBottom: 'var(--s-5)' }}>
                  {fn.title}
                </h1>
                <p
                  className="mf-lead"
                  style={{ maxWidth: '46ch', fontSize: 'var(--step-1)', lineHeight: 1.5 }}
                >
                  {fn.subtitle}
                </p>
              </div>
            </div>
          </div>
        </header>
      </div>

      <div className="px-6 md:px-12 lg:px-24 pt-24 pb-32">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {essays.map((essay, i) => {
            const published = Boolean(essay.body);
            const inner = (
              <article
                className={`group h-full flex flex-col border border-border p-8 transition-colors duration-500 relative overflow-hidden ${
                  published ? 'hover:bg-white/[0.02]' : 'opacity-70'
                }`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="flex justify-between items-center mb-8 pb-4">
                  <span className="site-meta font-mono text-xs tracking-widest">
                    [{essay.category}]
                  </span>
                  <span className="site-meta font-mono text-xs">{essay.date}</span>
                </div>

                <h2 className="font-display text-2xl md:text-3xl uppercase tracking-tight mb-4 group-hover:text-white transition-colors leading-tight">
                  {essay.title}
                </h2>

                <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-grow mb-8">
                  {essay.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-6">
                  <span className="site-meta font-mono text-xs tracking-widest">
                    {essay.readTime} {fn.readMin}
                  </span>
                  {published ? (
                    <span className="font-mono text-xs tracking-widest text-foreground uppercase flex items-center gap-2">
                      {fn.readBtn}{' '}
                      <span className="text-white/40 group-hover:text-white transition-colors group-hover:translate-x-1 duration-300">
                        →
                      </span>
                    </span>
                  ) : (
                    <span className="site-meta font-mono text-xs tracking-widest uppercase opacity-70">
                      {fn.soon}
                    </span>
                  )}
                </div>
              </article>
            );

            return (
              <FadeIn key={essay.slug} delay={0.2 + i * 0.1}>
                {published ? (
                  <Link href={`/field-notes/${essay.slug}`} className="block h-full">
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </FadeIn>
            );
          })}
        </div>
      </div>
      </div>
      <CinemaFooter />
    </motion.div>
  );
}

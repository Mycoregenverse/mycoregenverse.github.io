import React from 'react';
import { Link } from 'wouter';
import { FadeIn, pageTransition } from '@/components/FadeIn';
import { SectionHeader } from '@/components/Typography';
import { motion } from 'framer-motion';
import '@/components/cinema/cinema.css';
import { useLang } from '@/i18n';
import { usePinnedZoom } from '@/components/cinema/motion';
import { CinemaFooter } from '@/components/cinema/CinemaFooter';

const clamp = (n: number, lo = 0, hi = 1) => (n < lo ? lo : n > hi ? hi : n);

export default function ReSources() {
  const { t } = useLang();
  const rs = t.reSources;
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
        <header className="mf-open mf-open--tall mf-open--anchor-top" ref={sectionRef}>
          <div className="mf-open__sticky">
            <div className="mf-open__media">
              {/* decorativa: o título logo abaixo já carrega a informação */}
              <img ref={imgRef} src="/re-sources-header.jpg" alt="" />
            </div>
            <div className="mf-open__scrim" />
            <div className="mf-open__inner mf-wrap" style={{ justifyContent: 'flex-end' }}>
              <div style={{ opacity: reveal, transform: `translateY(${(1 - reveal) * 24}px)` }}>
                <h1 className="mf-hero__title" style={{ marginBottom: 'var(--s-5)' }}>
                  {rs.title}
                </h1>
                <p
                  className="mf-lead"
                  style={{ maxWidth: '46ch', fontSize: 'var(--step-1)', lineHeight: 1.5 }}
                >
                  {rs.subtitle}
                </p>
              </div>
            </div>
          </div>
        </header>
      </div>

      <div className="px-6 md:px-12 lg:px-24 pt-24 pb-32">
      <div className="max-w-5xl mx-auto">
        <FadeIn delay={0.1}>
          <Link
            href="/re-sources/bibliografia"
            className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase border border-white/30 px-6 py-3 hover:bg-white hover:text-black transition-all"
          >
            {rs.accessBtn} →
          </Link>
        </FadeIn>

        <div className="mt-16 space-y-24">
          {rs.sections.map((section) => (
            <div key={section.category}>
              <FadeIn delay={0.1}>
                <SectionHeader label={section.category.toUpperCase()} className="mb-12" />
              </FadeIn>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {section.items.map((item, i) => (
                  <FadeIn key={item.title} delay={0.2 + i * 0.1}>
                    <div className="group pl-6 border-l border-border hover:border-white/50 transition-colors">
                      <h3 className="font-display text-xl uppercase tracking-tight mb-2 text-foreground group-hover:text-white transition-colors">
                        {item.title}
                      </h3>
                      <div className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-3">
                        {rs.byLabel} {item.author}
                      </div>
                      <p className="font-sans text-sm text-white/60 leading-relaxed">{item.note}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      <CinemaFooter />
    </motion.div>
  );
}

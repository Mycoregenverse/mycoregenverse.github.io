import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { pageTransition } from '@/components/FadeIn';
import { SectionHeader } from '@/components/Typography';
import { useLang } from '@/i18n';
import { CinemaFooter } from '@/components/cinema/CinemaFooter';
import { BIBLIOGRAPHY, LINK_LABEL } from '@/content/bibliography';

export default function Bibliography() {
  const { lang, t } = useLang();
  const b = t.bibliography;
  const total = BIBLIOGRAPHY.reduce((sum, s) => sum + s.items.length, 0);

  return (
    <motion.div {...pageTransition} className="w-full min-h-screen bg-background">
      <div className="px-6 md:px-12 lg:px-24 pt-32 pb-40">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/re-sources"
            className="font-mono text-xs tracking-widest text-muted-foreground hover:text-white uppercase transition-colors"
          >
            {b.backToResources}
          </Link>

          <SectionHeader label={b.marker} className="mt-10" />
          <h1 className="mt-4 font-display text-4xl md:text-6xl uppercase tracking-tighter">
            {b.title}
          </h1>
          <p className="mt-6 max-w-2xl font-sans text-base md:text-lg text-white/60 leading-relaxed">
            {b.subtitle}
          </p>
          <p className="mt-4 font-mono text-xs tracking-widest text-muted-foreground uppercase">
            {total} {b.countSuffix}
          </p>

          <div className="mt-20 space-y-24">
            {BIBLIOGRAPHY.map((section) => (
              <section key={section.roman}>
                <div className="flex items-baseline gap-4 pb-4">
                  <span className="font-mono text-xs text-muted-foreground">{section.roman}</span>
                  <h2 className="font-display text-lg md:text-xl uppercase tracking-tight">
                    {section.title[lang]}
                  </h2>
                </div>
                {section.intro && (
                  <p className="mt-4 font-sans text-sm text-white/50 leading-relaxed max-w-2xl">
                    {section.intro[lang]}
                  </p>
                )}

                <ol className="mt-8 space-y-8">
                  {section.items.map((item) => (
                    <li key={item.n} className="flex gap-4 md:gap-6">
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

                        {item.note && (
                          <p className="mt-3 pl-4 border-l border-border/60 font-sans text-sm text-white/45 italic leading-relaxed max-w-2xl">
                            {item.note[lang]}
                          </p>
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

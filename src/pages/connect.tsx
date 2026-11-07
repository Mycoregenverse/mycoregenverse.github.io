import React from 'react';
import { FadeIn, pageTransition } from '@/components/FadeIn';
import { SectionHeader } from '@/components/Typography';
import { motion } from 'framer-motion';
import { useLang } from '@/i18n';
import { CinemaFooter } from '@/components/cinema/CinemaFooter';
import { EMAILS, REDES, linkAgenda } from '@/content/contato';

export default function Connect() {
  const { t, lang } = useLang();
  const c = t.connect;

  return (
    <motion.div {...pageTransition} className="w-full min-h-screen bg-background flex flex-col">
      <div className="px-6 md:px-12 lg:px-24 pb-32 flex-grow flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-grow flex flex-col justify-center pt-32">
        <FadeIn>
          <h1
            className="font-display tracking-tighter uppercase mb-12 whitespace-pre-line"
            style={{ fontSize: 'clamp(2rem, 11vw, 7rem)', lineHeight: 1.05 }}
          >
            {c.title}
          </h1>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-8">
          <FadeIn delay={0.2} className="font-sans text-lg text-muted-foreground leading-relaxed space-y-6">
            <p>{c.body1}</p>
            <p>{c.body2}</p>
          </FadeIn>

          <FadeIn delay={0.3} className="space-y-12">
            <div className="email-col">
              <SectionHeader label={c.directComm} className="mb-4" />
              <div className="flex flex-col gap-3">
                {EMAILS.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="email-line font-display uppercase tracking-tighter hover:text-white/70 transition-colors"
                  >
                    {email}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <SectionHeader label={c.frequencies} className="mb-4" />
              <div className="flex flex-col gap-4">
                <a
                  href={REDES.x}
                  target="_blank"
                  rel="noreferrer"
                  className="font-display text-2xl uppercase tracking-tighter hover:text-white/70 transition-colors"
                >
                  X : @mycoregenverse
                </a>
                <a
                  href={REDES.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="font-display text-2xl uppercase tracking-tighter hover:text-white/70 transition-colors"
                >
                  IG : @mycoregenverse
                </a>
                <a
                  href={REDES.substack}
                  target="_blank"
                  rel="noreferrer"
                  className="font-display text-2xl uppercase tracking-tighter hover:text-white/70 transition-colors"
                >
                  Substack : mycoregenverse
                </a>
              </div>
            </div>

            <div className="pt-8">
              <a
                href={linkAgenda(lang)}
                target="_blank"
                rel="noreferrer"
                className="btn-glass font-mono text-sm tracking-[0.2em] px-8 py-4 uppercase"
              >
                {c.schedule}
              </a>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* brilho de canto: só sangra para baixo — deslocar no eixo X criava
          barra de rolagem horizontal em telas estreitas */}
      <div className="fixed bottom-0 right-0 w-[40vw] h-[40vw] bg-white/5 blur-[120px] rounded-full pointer-events-none -z-10 translate-y-1/4" />
      </div>
      <CinemaFooter />
    </motion.div>
  );
}

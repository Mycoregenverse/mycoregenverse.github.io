import React from 'react';
import { FadeIn, pageTransition } from '@/components/FadeIn';
import { SectionHeader } from '@/components/Typography';
import { motion } from 'framer-motion';
import { useLang } from '@/i18n';
import { CinemaFooter } from '@/components/cinema/CinemaFooter';

export default function Connect() {
  const { t } = useLang();
  const c = t.connect;

  return (
    <motion.div {...pageTransition} className="w-full min-h-screen bg-background flex flex-col">
      <div className="px-6 md:px-12 lg:px-24 pb-32 flex-grow flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-grow flex flex-col justify-center pt-32">
        <FadeIn>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter uppercase mb-12 whitespace-pre-line">
            {c.title}
          </h1>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-8">
          <FadeIn delay={0.2} className="font-sans text-lg text-muted-foreground leading-relaxed space-y-6">
            <p>{c.body1}</p>
            <p>{c.body2}</p>
          </FadeIn>

          <FadeIn delay={0.3} className="space-y-12">
            <div>
              <SectionHeader label={c.directComm} className="mb-4" />
              <a
                href="mailto:mycoregenverse@proton.me"
                className="font-display text-2xl md:text-3xl uppercase tracking-tighter hover:text-white/70 transition-colors"
              >
                mycoregenverse@proton.me
              </a>
            </div>

            <div>
              <SectionHeader label={c.frequencies} className="mb-4" />
              <div className="flex flex-col gap-4">
                <a
                  href="https://x.com/mycoregenverse"
                  target="_blank"
                  rel="noreferrer"
                  className="font-display text-2xl uppercase tracking-tighter hover:text-white/70 transition-colors"
                >
                  X : @mycoregenverse
                </a>
                <a
                  href="https://instagram.com/mycoregenverse"
                  target="_blank"
                  rel="noreferrer"
                  className="font-display text-2xl uppercase tracking-tighter hover:text-white/70 transition-colors"
                >
                  IG : @mycoregenverse
                </a>
              </div>
            </div>

            <div className="pt-8">
              <a
                href="https://koalendar.com/e/reuniao-com-catito-dev-mycoregenverse"
                target="_blank"
                rel="noreferrer"
                className="inline-block font-mono text-sm tracking-[0.2em] border border-white/30 px-8 py-4 hover:bg-white hover:text-black transition-all uppercase"
              >
                {c.schedule}
              </a>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 w-[40vw] h-[40vw] bg-white/5 blur-[120px] rounded-full pointer-events-none -z-10 translate-x-1/4 translate-y-1/4" />
      </div>
      <CinemaFooter />
    </motion.div>
  );
}

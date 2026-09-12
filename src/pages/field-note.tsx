import React from 'react';
import { Link, useParams } from 'wouter';
import { motion } from 'framer-motion';
import { FadeIn, pageTransition } from '@/components/FadeIn';
import { Markdown } from '@/components/Markdown';
import { CinemaFooter } from '@/components/cinema/CinemaFooter';
import { useLang } from '@/i18n';

export default function FieldNote() {
  const { t } = useLang();
  const fn = t.fieldNotes;
  const params = useParams<{ slug: string }>();
  const essay = fn.essays.find((e) => e.slug === params.slug);

  const back = (
    <Link
      href="/field-notes"
      className="font-mono text-xs tracking-widest text-muted-foreground hover:text-white uppercase transition-colors inline-flex items-center gap-2"
    >
      ← {fn.backToIndex}
    </Link>
  );

  if (!essay || !essay.body) {
    return (
      <motion.div
        {...pageTransition}
        className="w-full min-h-screen bg-background"
      >
        <div className="px-6 md:px-12 lg:px-24 pt-40 pb-32">
          <div className="max-w-2xl mx-auto">
            {back}
            <p className="mt-10 font-display text-2xl uppercase tracking-tight">
              {essay ? fn.soon : fn.notFound}
            </p>
            {essay && (
              <p className="mt-6 font-sans text-muted-foreground leading-relaxed">{essay.excerpt}</p>
            )}
          </div>
        </div>
        <CinemaFooter />
      </motion.div>
    );
  }

  return (
    <motion.div {...pageTransition} className="w-full min-h-screen bg-background">
      <div className="px-6 md:px-12 lg:px-24 pt-32 pb-40">
      <article className="max-w-[42rem] mx-auto">
        <FadeIn>{back}</FadeIn>

        <FadeIn delay={0.1}>
          <div className="site-meta mt-10 mb-6 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs tracking-widest uppercase">
            <span>[{essay.category}]</span>
            <span aria-hidden>·</span>
            <span>{essay.date}</span>
            <span aria-hidden>·</span>
            <span>
              {essay.readTime} {fn.readMin}
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <h1 className="font-display text-3xl md:text-[2.6rem] leading-[1.12] uppercase tracking-tight mb-8">
            {essay.title}
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="font-sans text-lg md:text-xl text-white/70 leading-relaxed mb-12 pb-12">
            {essay.excerpt}
          </p>
        </FadeIn>

        <FadeIn delay={0.25}>
          <Markdown source={essay.body} className="article-body" />
        </FadeIn>

        {essay.substackUrl ? (
          <FadeIn>
            <div className="mt-16 pt-10">
              <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-3">
                {fn.publishedOn} Substack
              </p>
              <a
                href={essay.substackUrl}
                target="_blank"
                rel="noreferrer"
                className="font-display text-lg uppercase tracking-tight hover:text-white/70 transition-colors"
              >
                {fn.onSubstack}
              </a>
            </div>
          </FadeIn>
        ) : null}

        <div className="mt-16 pt-10">{back}</div>
      </article>
      </div>
      <CinemaFooter />
    </motion.div>
  );
}

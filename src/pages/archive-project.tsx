import React from 'react';
import { Link, useParams } from 'wouter';
import { motion } from 'framer-motion';
import { FadeIn, pageTransition } from '@/components/FadeIn';
import { Markdown } from '@/components/Markdown';
import { CinemaFooter } from '@/components/cinema/CinemaFooter';
import { useLang } from '@/i18n';
import { slugify } from '@/content/slugify';
import { archiveDetail } from '@/content/archive';

export default function ArchiveProject() {
  const { lang, t } = useLang();
  const a = t.archive;
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? '';

  const project = a.projects.find((p) => slugify(p.name) === slug);
  const detail = archiveDetail(slug);

  const back = (
    <Link
      href="/archive"
      className="font-mono text-xs tracking-widest text-muted-foreground hover:text-white uppercase transition-colors inline-flex items-center gap-2"
    >
      ← {a.backToIndex}
    </Link>
  );

  if (!project) {
    return (
      <motion.div {...pageTransition} className="w-full min-h-screen bg-background">
        <div className="px-6 md:px-12 lg:px-24 pt-40 pb-32">
          <div className="max-w-2xl mx-auto">
            {back}
            <p className="mt-10 font-display text-2xl uppercase tracking-tight">{t.notFound.sub}</p>
          </div>
        </div>
        <CinemaFooter />
      </motion.div>
    );
  }

  const meta = (
    <div className="site-meta mt-10 mb-6 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs tracking-widest uppercase">
      <span>[{project.category}]</span>
      <span aria-hidden>·</span>
      <span>{project.status}</span>
    </div>
  );

  const title = (
    <h1 className="font-display text-3xl md:text-[2.6rem] leading-[1.12] uppercase tracking-tight mb-8">
      {project.name}
    </h1>
  );

  if (!detail) {
    return (
      <motion.div {...pageTransition} className="w-full min-h-screen bg-background">
        <div className="px-6 md:px-12 lg:px-24 pt-32 pb-40">
          <article className="max-w-[42rem] mx-auto">
            <FadeIn>{back}</FadeIn>
            <FadeIn delay={0.1}>{meta}</FadeIn>
            <FadeIn delay={0.15}>{title}</FadeIn>
            <FadeIn delay={0.2}>
              <p className="font-sans text-lg md:text-xl text-white/70 leading-relaxed mb-12 pb-12">
                {project.desc}
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-4">
                {a.soonMarker}
              </p>
              <p className="font-sans text-base text-muted-foreground leading-relaxed">{a.soonBody}</p>
            </FadeIn>
            <div className="mt-16 pt-10">{back}</div>
          </article>
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
          <FadeIn delay={0.1}>{meta}</FadeIn>
          <FadeIn delay={0.15}>{title}</FadeIn>

          <FadeIn delay={0.2}>
            <p className="font-sans text-lg md:text-xl text-white/70 leading-relaxed mb-12 pb-12">
              {detail.tagline[lang]}
            </p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <Markdown source={detail.body[lang]} className="article-body" />
          </FadeIn>

          <div className="mt-16 pt-10">{back}</div>
        </article>
      </div>
      <CinemaFooter />
    </motion.div>
  );
}

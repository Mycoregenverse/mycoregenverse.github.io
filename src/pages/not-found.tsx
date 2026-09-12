import React from 'react';
import { Link } from 'wouter';
import { useLang } from '@/i18n';
import { CinemaFooter } from '@/components/cinema/CinemaFooter';

export default function NotFound() {
  const { t } = useLang();
  return (
    <>
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center bg-background px-6 text-center py-40">
      <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase mb-6">
        {t.notFound.heading}
      </p>
      <h1 className="font-display text-3xl md:text-5xl uppercase tracking-tighter mb-8">404</h1>
      <p className="font-sans text-muted-foreground mb-10">{t.notFound.sub}</p>
      <Link
        href="/"
        className="font-mono text-xs tracking-[0.2em] uppercase border border-white/30 px-8 py-4 hover:bg-white hover:text-black transition-colors"
      >
        {t.notFound.back}
      </Link>
    </div>
    <CinemaFooter />
    </>
  );
}

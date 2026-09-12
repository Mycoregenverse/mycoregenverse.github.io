import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { useLang } from '@/i18n';
import { LangToggle } from '@/components/LangToggle';

export function CinemaNav() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { label: t.nav.manifesto, href: '#manifesto' },
    { label: t.nav.method, href: '#metodo' },
    { label: t.nav.archive, href: '#arquivo' },
    { label: t.nav.fieldNotes, href: '#notas' },
    { label: t.nav.connect, href: '#conectar' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`cine-nav${scrolled ? ' is-scrolled' : ''}`} aria-label={t.nav.menu}>
        <a className="cine-nav__mark" href="#topo">
          {t.footer.wordmark}
        </a>
        <div className="cine-nav__links">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="cine-nav__right">
          <LangToggle />
        </div>
        <button className="cine-nav__burger" onClick={() => setOpen(true)} aria-label={t.nav.menu}>
          {t.nav.menu}
        </button>
      </nav>

      {open && (
        <div className="cine-nav__panel" role="dialog" aria-modal="true">
          <button onClick={() => setOpen(false)} aria-label={t.nav.close}>
            {t.nav.close}
          </button>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <Link
            href="/manifesto"
            onClick={() => setOpen(false)}
            className="mono"
            style={{ fontSize: 'var(--step--1)', color: 'var(--c-signal)' }}
          >
            {t.nav.manifestoFull}
          </Link>
          <div style={{ marginTop: 'var(--s-4)' }}>
            <LangToggle />
          </div>
        </div>
      )}
    </>
  );
}

export function LoadingScreen({ done }: { done: boolean }) {
  const { t } = useLang();
  return (
    <div className="cine-load" data-done={done} aria-hidden={done}>
      <div className="cine-load__mark">{t.footer.wordmark}</div>
      <div className="cine-load__bar" />
      <div className="cine-load__note">{t.loading}</div>
    </div>
  );
}

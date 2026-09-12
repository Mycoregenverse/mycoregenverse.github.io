import React from 'react';
import { Link } from 'wouter';
import '@/components/cinema/cinema.css';
import { useLang } from '@/i18n';
import { LangToggle } from '@/components/LangToggle';

/**
 * Rodapé único do site. Traz seu próprio `.cinema-root` + cinema.css, então
 * funciona em qualquer página (cinema ou Tailwind). Aninhar em outro
 * `.cinema-root` é inofensivo — os tokens só se redeclaram iguais.
 */
export function CinemaFooter() {
  const { t } = useLang();
  const links = [
    { label: t.nav.manifesto, href: '/manifesto' },
    { label: t.nav.fieldNotes, href: '/field-notes' },
    { label: t.nav.reSources, href: '/re-sources' },
    { label: t.nav.archive, href: '/archive' },
    { label: t.nav.connect, href: '/connect' },
  ];
  return (
    <div className="cinema-root">
      <footer className="cine-foot">
        <div>
          <div className="cine-foot__mark">{t.footer.wordmark}</div>
          <p className="label" style={{ marginTop: 'var(--s-3)', letterSpacing: '0.2em' }}>
            {t.footer.tagline}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--s-6)', flexWrap: 'wrap' }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="label">
              {l.label}
            </Link>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 'var(--s-6)', alignItems: 'center' }}>
          <LangToggle />
        </div>

        {/* aviso de copyright em linha própria: `© ano titular` é a ordem
            convencional, e a linha inteira não caberia junto do seletor de idioma */}
        <p className="label cine-foot__copy">
          © {new Date().getFullYear()} {t.footer.wordmark}. {t.footer.rights}
        </p>
      </footer>
    </div>
  );
}

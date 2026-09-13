import React from 'react';
import { Link } from 'wouter';
import '@/components/cinema/cinema.css';
import { useLang } from '@/i18n';

/**
 * Rodapé único do site. Traz seu próprio `.cinema-root` + cinema.css, então
 * funciona em qualquer página (cinema ou Tailwind). Aninhar em outro
 * `.cinema-root` é inofensivo — os tokens só se redeclaram iguais.
 *
 * Os links levam às subpáginas, e não às âncoras da home: quem chega ao fim de
 * uma página quer a página inteira do assunto, não o resumo dela na home. É a
 * diferença deliberada em relação ao menu do cabeçalho na home.
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
        <div className="cine-foot__grid">
          <div className="cine-foot__brand">
            <div className="cine-foot__mark">{t.footer.wordmark}</div>
            <p className="label cine-foot__tagline">{t.footer.tagline}</p>
          </div>

          <nav className="cine-foot__links" aria-label={t.nav.menu}>
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="label">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* `© ano titular` é a ordem convencional */}
          <p className="label cine-foot__copy">
            © {new Date().getFullYear()} {t.footer.wordmark}. {t.footer.rights}
          </p>
        </div>

        {/* o nó fecha a página — decorativo, a marca já foi dita acima. É um
            span com máscara, não uma <img>: ver a nota em `.cine-foot__sign`. */}
        <div className="cine-foot__sign">
          <span aria-hidden="true" />
        </div>
      </footer>
    </div>
  );
}

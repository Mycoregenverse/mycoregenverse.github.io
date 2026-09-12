import React from 'react';
import { useLang } from '@/i18n';

/**
 * PT / EN switch. Shows the two codes; the inactive one is dimmed.
 * `variant` only tweaks sizing/color to fit the two navs.
 */
export function LangToggle({ variant = 'cinema' }: { variant?: 'cinema' | 'plain' }) {
  const { lang, setLang } = useLang();
  const base =
    variant === 'cinema'
      ? 'cine-lang'
      : 'font-mono text-xs tracking-widest flex items-center gap-1 pointer-events-auto';

  return (
    <div className={base} role="group" aria-label="Language">
      <button
        type="button"
        onClick={() => setLang('pt')}
        aria-pressed={lang === 'pt'}
        className={variant === 'plain' ? (lang === 'pt' ? 'text-white' : 'text-white/40') : ''}
        data-active={lang === 'pt'}
      >
        PT
      </button>
      <span aria-hidden="true" className={variant === 'plain' ? 'text-white/25' : 'cine-lang__sep'}>
        /
      </span>
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={variant === 'plain' ? (lang === 'en' ? 'text-white' : 'text-white/40') : ''}
        data-active={lang === 'en'}
      >
        EN
      </button>
    </div>
  );
}

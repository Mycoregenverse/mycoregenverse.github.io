import React, { createContext, useContext, useEffect, useState } from 'react';
import { en } from './en';
import { pt } from './pt';

export type Lang = 'en' | 'pt';
export type Translations = typeof pt;

const TRANSLATIONS: Record<Lang, Translations> = { en, pt };

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: Translations;
}

const LangContext = createContext<LangContextType>({
  lang: 'pt',
  setLang: () => {},
  toggle: () => {},
  t: pt,
});

const STORAGE_KEY = 'mcrv-lang';

function initialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'pt') return stored;
  } catch {
    /* private mode */
  }
  if (typeof navigator !== 'undefined' && navigator.language) {
    return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en';
  }
  return 'pt';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* noop */
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  return (
    <LangContext.Provider
      value={{ lang, setLang, toggle: () => setLang(lang === 'pt' ? 'en' : 'pt'), t: TRANSLATIONS[lang] }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

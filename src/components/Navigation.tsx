import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLang } from '@/i18n';
import { LangToggle } from '@/components/LangToggle';

export function Navigation() {
  const [location] = useLocation();
  const { t } = useLang();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const NAV_ITEMS = [
    { label: t.nav.manifesto, href: '/manifesto' },
    { label: t.nav.fieldNotes, href: '/field-notes' },
    { label: t.nav.reSources, href: '/re-sources' },
    { label: t.nav.archive, href: '/archive' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-6 flex items-center justify-between pointer-events-none transition-[background-color,padding,border-color] duration-300 ${
          scrolled
            ? 'py-4 header-glass border-b border-transparent'
            : 'py-6 mix-blend-difference border-b border-transparent'
        }`}
      >
        <div className="pointer-events-auto">
          <Link
            href="/"
            /* A Syncopate é larguíssima: "MYCOREGENVERSE" a 20px ocupa ~295px e,
               com o glyph ao lado, encosta no seletor de idioma a 375px. O corpo
               acompanha a largura disponível. */
            className="font-display font-bold text-sm sm:text-lg md:text-xl tracking-tighter text-white uppercase hover:opacity-70 transition-opacity flex items-center gap-2 sm:gap-2.5"
          >
            {/* o glyph precisa de realce: seus filamentos são finos demais para
                se sustentarem a 30px — mesmo motivo do favicon */}
            <img
              src="/logo-mark.png"
              alt=""
              width={128}
              height={128}
              className="w-[1.85em] h-[1.85em] shrink-0 [filter:brightness(2)_contrast(1.3)_saturate(1.4)]"
            />
            {t.nav.wordmark}
          </Link>
        </div>

        <nav className="hidden md:flex items-center bg-transparent border border-white/20 rounded-full px-6 py-3 backdrop-blur-sm pointer-events-auto">
          <ul className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = location === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`font-mono text-xs tracking-widest transition-colors ${
                      isActive ? 'text-white' : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden md:flex items-center gap-5 pointer-events-auto">
          <LangToggle variant="plain" />
        </div>

        <div className="md:hidden flex items-center gap-4 pointer-events-auto">
          <LangToggle variant="plain" />
          <button
            className="text-white z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={t.nav.menu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center p-6"
          >
            <nav className="w-full max-w-sm flex flex-col gap-8 text-center">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-display text-3xl tracking-widest uppercase block"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import React, { Suspense, useEffect } from 'react';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { AnimatePresence } from 'framer-motion';

import { Navigation } from '@/components/Navigation';
import { LanguageProvider } from '@/i18n';
import Home from '@/pages/home';
import HomeCinema from '@/pages/home-cinema';
import Manifesto from '@/pages/manifesto';
import FieldNotes from '@/pages/field-notes';
import FieldNote from '@/pages/field-note';
import ReSources from '@/pages/re-sources';
import Archive from '@/pages/archive';
import Connect from '@/pages/connect';

const ArchiveProject = React.lazy(() => import('@/pages/archive-project'));
const Bibliography = React.lazy(() => import('@/pages/bibliography'));

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/" component={HomeCinema} />
        <Route path="/classic" component={Home} />
        <Route path="/manifesto" component={Manifesto} />
        <Route path="/field-notes/:slug" component={FieldNote} />
        <Route path="/field-notes" component={FieldNotes} />
        <Route path="/re-sources/bibliografia">
          {() => (
            <Suspense fallback={<div className="min-h-screen bg-background" />}>
              <Bibliography />
            </Suspense>
          )}
        </Route>
        <Route path="/re-sources" component={ReSources} />
        <Route path="/archive/:slug">
          {(params) => (
            <Suspense fallback={<div className="min-h-screen bg-background" />}>
              <ArchiveProject key={params.slug} />
            </Suspense>
          )}
        </Route>
        <Route path="/archive" component={Archive} />
        <Route path="/connect" component={Connect} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

/**
 * Toda rota abre no topo.
 *
 * Antes só `field-note` e `archive-project` faziam isso por conta própria, então o
 * comportamento variava: entrar numa página vindo de outra já rolada mantinha a
 * posição antiga. Centralizado aqui, vale para todas.
 *
 * Duas armadilhas tratadas:
 *  - a home define `scroll-behavior: smooth` no <html>; sem neutralizar durante o
 *    reset, isto vira uma rolagem ANIMADA de milhares de pixels em vez de um corte.
 *  - `history.scrollRestoration` faz o navegador reposicionar sozinho em reload e
 *    em voltar/avançar, sobrescrevendo o reset.
 *
 * Links de âncora da home (`#manifesto`, `#metodo`…) não são afetados: eles não
 * mudam o pathname, e este efeito depende só dele.
 */
function useScrollTopOnRouteChange(location: string) {
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    html.style.scrollBehavior = prev;
  }, [location]);
}

/** The cinematic home ships its own fixed navigation; suppress the global one there. */
function Shell() {
  const [location] = useLocation();
  const isCinema = location === '/';
  useScrollTopOnRouteChange(location);
  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col relative selection:bg-white/20">
      {!isCinema && <Navigation />}
      <main className="flex-1 w-full relative z-10">
        <Router />
      </main>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Shell />
      </WouterRouter>
    </LanguageProvider>
  );
}

export default App;

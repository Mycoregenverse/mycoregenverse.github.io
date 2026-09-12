import React, { useEffect, useRef } from 'react';
import { useCinemaScroll } from '@/hooks/useCinemaScroll';

const clamp = (n: number, lo = 0, hi = 1) => (n < lo ? lo : n > hi ? hi : n);

/** p em que cada batida do parágrafo entra — casado com os pulsos de luz do clipe */
const BEAT_IN = [0.33, 0.53, 0.73];
const BEAT_RAMP = 0.12;

interface Props {
  id?: string;
  marker?: string;
  n: string;
  title: string;
  /** o parágrafo do projeto, partido na pontuação que já existe — join(' ') === original */
  beats: string[];
  videoSrc: string;
  poster: string;
  /** abre em preto. Só a primeira etapa usa — é o limiar de entrada da seção.
   *  Nas seguintes o preto de saída da cena anterior já faz a passagem. */
  openInBlack?: boolean;
}

/**
 * Uma etapa do Método: mergulho full-bleed com scrub no scroll.
 *
 * Difere da `CinemaScene` de propósito — esta seção é "um caso à parte":
 * abre e fecha em preto, o título é maior que o de qualquer outra cena, e o
 * parágrafo entra em 3 batidas acumulativas em vez do crossfade de duas linhas.
 */
export function MetodoScene({ id, marker, n, title, beats, videoSrc, poster, openInBlack }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { progress: p } = useCinemaScroll(sectionRef, videoRef);

  // carga tardia: só busca o clipe quando a cena chega perto, depois prepara o scrub
  useEffect(() => {
    const v = videoRef.current;
    const section = sectionRef.current;
    if (!v || !section) return;

    const prime = () => {
      try {
        v.pause();
        const pr = v.play();
        if (pr && typeof pr.then === 'function') pr.then(() => v.pause()).catch(() => {});
      } catch {
        /* noop */
      }
    };
    v.addEventListener('loadeddata', prime, { once: true });

    let loaded = false;
    const near = () => {
      const r = section.getBoundingClientRect();
      return r.top < window.innerHeight * 1.6 && r.bottom > -window.innerHeight * 0.6;
    };
    const maybeLoad = () => {
      if (loaded || !near()) return;
      loaded = true;
      v.preload = 'auto';
      v.load();
      window.removeEventListener('scroll', maybeLoad);
    };
    window.addEventListener('scroll', maybeLoad, { passive: true });
    maybeLoad();

    return () => {
      v.removeEventListener('loadeddata', prime);
      window.removeEventListener('scroll', maybeLoad);
    };
  }, []);

  const headOpacity = clamp((p - 0.12) / 0.14);
  // preto de saída: a respiração que separa um estrato do outro (e, na última
  // etapa, a queda para a coda). O de entrada só existe na primeira.
  const blackout = Math.max(
    openInBlack ? clamp(1 - p / 0.06) : 0,
    clamp((p - 0.93) / 0.07),
  );

  return (
    <section ref={sectionRef} className="mt-scene" id={id}>
      <div className="mt-scene__sticky">
        <video
          ref={videoRef}
          className="mt-scene__media"
          src={videoSrc}
          poster={poster}
          muted
          playsInline
          preload="none"
          tabIndex={-1}
          aria-hidden="true"
        />
        <img className="mt-scene__media" src={poster} alt="" aria-hidden="true" style={{ zIndex: -1 }} />
        <div className="mt-scene__scrim" />

        {marker && <p className="marker mt-scene__marker">{marker}</p>}

        <div className="mt-scene__ui">
          <div
            className="mt-scene__head"
            style={{ opacity: headOpacity, transform: `translateY(${((1 - headOpacity) * 18).toFixed(1)}px)` }}
          >
            <span className="mt-scene__n">{n}</span>
            <h2 className="mt-scene__t">{title}</h2>
          </div>

          <p className="mt-scene__body">
            {beats.map((b, i) => {
              const o = clamp((p - BEAT_IN[i]) / BEAT_RAMP);
              return (
                <React.Fragment key={i}>
                  {/* só opacidade: transform não se aplica a inline não-substituído,
                      e inline-block quebraria o fluxo do parágrafo */}
                  <span className="mt-scene__beat" style={{ opacity: o }}>
                    {b}
                  </span>
                  {i < beats.length - 1 ? ' ' : ''}
                </React.Fragment>
              );
            })}
          </p>
        </div>

        <div className="mt-scene__black" style={{ opacity: blackout }} aria-hidden="true" />
      </div>
    </section>
  );
}

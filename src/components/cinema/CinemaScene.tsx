import React, { useEffect, useRef } from 'react';
import { useCinemaScroll } from '@/hooks/useCinemaScroll';
import { useLang } from '@/i18n';

const clamp = (n: number, lo = 0, hi = 1) => (n < lo ? lo : n > hi ? hi : n);

type Detail =
  | { kind: 'sunrise'; label: string }
  | { kind: 'count'; label: string; to: number }
  | { kind: 'meter'; label: string };

interface Props {
  id: string;
  marker?: string;
  videoSrc: string;
  poster: string;
  lineA?: string;
  lineB?: string;
  detail?: Detail;
  /** full-bleed video instead of a contained card */
  bleed?: boolean;
  children?: React.ReactNode;
}

/**
 * Scroll-scene: scroll drives video.currentTime (frame-accurate scrub).
 *  - default: contained card (340vh, sticky 100vh, headline measured in `cqw`)
 *  - bleed: video fills the sticky viewport; `children` overlay centered
 */
export function CinemaScene({
  id,
  marker,
  videoSrc,
  poster,
  lineA,
  lineB,
  detail,
  bleed = false,
  children,
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { progress: p } = useCinemaScroll(sectionRef, videoRef);
  const { lang } = useLang();

  // lazy: only fetch the clip when the scene is near — then prime it for scrubbing
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

  // card: A cede lugar a B (crossfade). bleed: as duas surgem e ficam (frase única).
  const aOpacity = bleed ? clamp(p * 3.4) : clamp(1.15 - p * 2.3);
  const bOpacity = bleed ? clamp((p - 0.32) * 3.4) : clamp((p - 0.42) * 2.6);
  const hasHeadline = Boolean(lineA || lineB);

  const media = (
    <>
      <video
        ref={videoRef}
        className="cine-scene__media"
        src={videoSrc}
        poster={poster}
        muted
        playsInline
        preload="none"
        tabIndex={-1}
        aria-hidden="true"
      />
      <img className="cine-scene__media" src={poster} alt="" aria-hidden="true" style={{ zIndex: -1 }} />
      <div className="cine-scene__scrim" />
    </>
  );

  return (
    <>
    <section ref={sectionRef} className={`cine-scene${bleed ? ' cine-scene--bleed' : ''}`} id={id}>
      <div className="cine-scene__sticky">
        {marker && <p className="marker cine-scene__marker">{marker}</p>}

        {bleed ? (
          <>
            {media}
            {hasHeadline && (
              <div className="cine-scene__bleed-ui">
                <div className="cine-scene__headline">
                  <span style={{ opacity: aOpacity }}>{lineA}</span>
                  <span style={{ opacity: bOpacity }}>{lineB}</span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="cine-scene__box">
            {media}
            {hasHeadline && (
              <div className="cine-scene__headline">
                <span style={{ opacity: aOpacity }}>{lineA}</span>
                <span style={{ opacity: bOpacity }}>{lineB}</span>
              </div>
            )}
          </div>
        )}

        {detail && (
          <div className="cine-scene__detail">
            {detail.kind === 'sunrise' && (
              <div className="cine-scene__sun">
                <span className="k">
                  {detail.label} {Math.round(p * 100)}%
                </span>
                <span className="cine-scene__horizon">
                  <span
                    className="cine-scene__disc"
                    style={{
                      transform: `translate(-50%, ${((1 - p) * 26).toFixed(1)}px)`,
                      opacity: clamp(0.25 + p * 0.9),
                    }}
                  />
                </span>
              </div>
            )}
            {detail.kind === 'count' && (
              <div className="cine-scene__count">
                <span className="k">{detail.label}</span>
                <span className="n">
                  {Math.round(p * detail.to).toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US')}
                </span>
              </div>
            )}
            {detail.kind === 'meter' && (
              <div className="cine-scene__sun">
                <span className="k">
                  {detail.label} {Math.round(p * 100)}%
                </span>
                <span className="cine-scene__mtrack">
                  <span className="cine-scene__mfill" style={{ width: `${(p * 100).toFixed(1)}%` }} />
                </span>
              </div>
            )}
          </div>
        )}
      </div>

    </section>

    {/* FORA da <section>: dentro dela, o sticky (elemento posicionado, fixado
        durante todo o percurso) pintava por cima e o texto ficava inalcançável
        em qualquer posição de scroll. Aqui ele flui depois da cena terminar. */}
    {children && <div className="cine-scene__after wrap">{children}</div>}
    </>
  );
}

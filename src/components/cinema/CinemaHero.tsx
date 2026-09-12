import React, { useEffect, useRef } from 'react';
import { useCinemaScroll } from '@/hooks/useCinemaScroll';
import { useLang } from '@/i18n';

const clamp = (n: number, lo = 0, hi = 1) => (n < lo ? lo : n > hi ? hi : n);

/** Primeiro/último quadro em MP4 com todo frame = keyframe. Ver pipeline FFmpeg. */
const VIDEO_SRC = '/hero.mp4';
const POSTER = '/hero-poster.jpg';

export function CinemaHero({ onReady }: { onReady: () => void }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { progress: p } = useCinemaScroll(sectionRef, videoRef);
  const { t } = useLang();
  const h = t.home.hero;

  // — prontidão da mídia: canplaythrough OU erro OU 6s de fallback —
  useEffect(() => {
    let fired = false;
    const ready = () => {
      if (fired) return;
      fired = true;
      onReady();
    };
    const v = videoRef.current;
    const t = window.setTimeout(ready, 6000);

    if (v) {
      const prime = () => {
        try {
          v.pause();
          const pr = v.play();
          if (pr && typeof pr.then === 'function') pr.then(() => v.pause()).catch(() => {});
        } catch {
          /* noop */
        }
      };
      v.addEventListener('canplaythrough', ready, { once: true });
      v.addEventListener('loadeddata', prime, { once: true });
      v.addEventListener('error', ready, { once: true });
      if (v.readyState >= 3) ready();
    } else {
      ready();
    }
    return () => window.clearTimeout(t);
  }, [onReady]);

  // slight overlap between the two headlines — no beat of empty screen
  const aOpacity = clamp(1.15 - p * 2.3);
  const bOpacity = clamp((p - 0.46) * 2.9);
  const subOpacity = clamp(1 - p * 3.4);
  const codaOpacity = clamp((p - 0.74) * 3.6);
  const hintOpacity = clamp(1 - p * 12);

  return (
    <section ref={sectionRef} className="cine-hero" id="topo">
      <div className="cine-hero__sticky">
        <video
          ref={videoRef}
          className="cine-hero__media"
          src={VIDEO_SRC}
          poster={POSTER}
          muted
          playsInline
          preload="auto"
          // sem autoplay / sem loop / sem controles — o scroll é o transporte
          tabIndex={-1}
          aria-hidden="true"
        />
        {/* poster de reserva caso o vídeo falhe */}
        <img className="cine-hero__media" src={POSTER} alt="" aria-hidden="true" style={{ zIndex: -1 }} />

        <div className="cine-hero__scrim" />
        <div className="cine-hero__vignette" />

        <div className="cine-hero__ui">
          <div className="cine-hero__headline">
            <h1 style={{ opacity: aOpacity }}>{h.lineA}</h1>
            <h1 style={{ opacity: bOpacity }}>{h.lineB}</h1>
          </div>

          <p className="cine-hero__sub" style={{ opacity: subOpacity }}>
            {h.sub}
          </p>

          <p className="cine-hero__coda" style={{ opacity: codaOpacity }}>
            {h.coda}
          </p>
        </div>

        <div className="cine-hero__hint" style={{ opacity: hintOpacity }}>
          <span>{h.hint}</span>
          <span />
        </div>
      </div>
    </section>
  );
}

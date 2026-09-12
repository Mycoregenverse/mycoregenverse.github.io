import React, { useEffect, useRef, useState } from 'react';
import { useLang } from '@/i18n';

/* Kit de movimento vanilla — sem framework. IntersectionObserver + rAF.
 * Curva e duração vêm dos tokens (--ease / --dur) em cinema.css.        */

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- useInViewOnce: fires once when the element reaches the viewport.
 * IntersectionObserver + a scroll fallback (embedded panes throttle IO/rAF,
 * and fast/anchor jumps can skip it). Reduced motion → true immediately.  */
export function useInViewOnce<T extends HTMLElement>(margin = 0.9) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) {
      setSeen(true);
      return;
    }
    let done = false;
    const inView = () => el.getBoundingClientRect().top < window.innerHeight * margin;
    const fire = () => {
      if (done) return;
      done = true;
      setSeen(true);
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
    const onScroll = () => {
      if (inView()) fire();
    };
    const io = new IntersectionObserver(
      (entries) => entries.some((e) => e.isIntersecting) && fire(),
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    if (inView()) fire();
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [margin]);

  return { ref, seen };
}

/* ---------- Reveal: aparece ao entrar na viewport, com stagger ---------- */
export function Reveal({
  children,
  delay = 0,
  as = 'div',
  className = '',
  style,
}: {
  children: React.ReactNode;
  delay?: number; // índice do stagger (0,1,2…) → delay = i * 70ms
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) {
      setSeen(true);
      return;
    }

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setSeen(true);
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
    // in view — or already scrolled past (also should be shown). Guards against
    // IO throttling in embedded panes and fast/anchor jumps over an element.
    const inView = () => el.getBoundingClientRect().top < window.innerHeight * 0.92;
    const onScroll = () => {
      if (inView()) reveal();
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) reveal();
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    if (inView()) reveal();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      className={`reveal${seen ? ' is-in' : ''} ${className}`.trim()}
      style={{ ['--reveal-delay' as string]: `${delay * 0.07}s`, ...style }}
    >
      {children}
    </Tag>
  );
}

/* ---------- usePinnedZoom: a seção fica presa (sticky) enquanto o scroll dá
 * zoom na imagem; só depois a página desce. `sectionRef` na seção alta,
 * `imgRef` na imagem.
 *  - `zoomEnd` (0..1): fração do scroll em que o zoom termina; o resto do
 *    percurso preso é "espera" (ex.: pros textos aparecerem).
 *  - retorna `progress` (0..1) do percurso todo, pra gatilhar reveals.     */
export function usePinnedZoom<S extends HTMLElement, I extends HTMLElement>(
  from = 1.06,
  to = 1.3,
  zoomEnd = 1,
) {
  const sectionRef = useRef<S | null>(null);
  const imgRef = useRef<I | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const img = imgRef.current;
    if (!section || !img) return;

    const reduced = prefersReduced();
    if (reduced) {
      img.style.transform = `scale(${from})`;
      setProgress(1);
      return;
    }

    // easeInOutSine — arranque e chegada suaves, meio linear
    const ease = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
    let lastP = -1;

    const apply = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const p = scrollable > 0 ? Math.max(0, Math.min(1, -rect.top / scrollable)) : 0;
      const z = zoomEnd <= 0 ? 1 : Math.min(1, p / zoomEnd);
      img.style.transform = `scale(${(from + (to - from) * ease(z)).toFixed(4)})`;
      if (Math.abs(p - lastP) > 0.005) {
        lastP = p;
        setProgress(p);
      }
    };

    apply();
    window.addEventListener('scroll', apply, { passive: true });
    window.addEventListener('resize', apply);
    return () => {
      window.removeEventListener('scroll', apply);
      window.removeEventListener('resize', apply);
    };
  }, [from, to, zoomEnd]);

  return { sectionRef, imgRef, progress };
}

/* ---------- useParallax: translação leve amarrada ao scroll ---------- */
export function useParallax<T extends HTMLElement>(strength = 0.12) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;

    let raf = 0;
    let ticking = false;

    const apply = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 (abaixo) → 1 (acima), 0 no centro
      const rel = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
      el.style.transform = `translate3d(0, ${(-rel * strength * 100).toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (ticking || document.hidden) {
        if (document.hidden) apply();
        return;
      }
      ticking = true;
      raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', apply);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', apply);
    };
  }, [strength]);

  return ref;
}

/* ---------- CountUp: contador que corre ao entrar na viewport ---------- */
export function CountUp({
  to,
  duration = 1600,
  format,
  className,
}: {
  to: number;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
}) {
  const { lang } = useLang();
  const ref = useRef<HTMLSpanElement | null>(null);
  const [val, setVal] = useState(0);
  const fmt = format ?? ((n: number) => n.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US'));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) {
      setVal(to);
      return;
    }
    let raf = 0;
    let fallback = 0;
    let start = 0;
    let ran = false;

    const run = () => {
      if (ran) return;
      ran = true;
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min(1, (ts - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(eased * to));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      // if rAF is throttled to zero (embedded panes), land on the final value anyway
      fallback = window.setTimeout(() => setVal(to), duration + 250);
    };

    const inView = () => el.getBoundingClientRect().top < window.innerHeight * 0.85;
    const onScroll = () => {
      if (inView()) run();
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) run();
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    if (inView()) run();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
      clearTimeout(fallback);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {fmt(val)}
    </span>
  );
}

/* ---------- WordReveal: cada palavra sobe e aparece em sequência ---------- */
export function WordReveal({
  text,
  as = 'p',
  className = '',
  stagger = 0.045,
  style,
}: {
  text: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  stagger?: number;
  style?: React.CSSProperties;
}) {
  const { ref, seen } = useInViewOnce<HTMLElement>(0.92);
  const Tag = as as React.ElementType;
  const words = text.split(' ');
  return (
    <Tag ref={ref} className={`wordreveal${seen ? ' is-in' : ''} ${className}`.trim()} style={style}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="wr-w" style={{ transitionDelay: `${i * stagger}s` }}>
            {w}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      ))}
    </Tag>
  );
}

/* ---------- Statement: frase-manifesto grande, entra com fade + escala ---------- */
export function Statement({
  children,
  className = '',
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { ref, seen } = useInViewOnce<HTMLParagraphElement>(0.85);
  return (
    <p
      ref={ref}
      className={`statement${seen ? ' is-in' : ''} ${className}`.trim()}
      style={style}
    >
      {children}
    </p>
  );
}

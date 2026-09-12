import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-binding for the cinematic hero.
 *
 * Contract:
 *  - `sectionRef` wraps a tall section (see --hero-scroll in cinema.css) that
 *    contains a 100vh sticky child.
 *  - `videoRef` is the full-bleed <video> whose currentTime we scrub.
 *  - returns `progress` (0..1) — the SAME p that feeds headline, counter,
 *    the signal meter and every themed detail on the page.
 *
 * Traps handled deliberately (see project brief):
 *  - We compute progress from getBoundingClientRect and apply it SYNCHRONOUSLY
 *    on every scroll/resize. No requestAnimationFrame loop is required for
 *    correctness — embedded preview panes throttle rAF to zero, which would
 *    otherwise freeze the bind. rAF is used only to coalesce bursts, with a
 *    setTimeout fallback so a dead rAF can never strand an update.
 *  - We read `video.readyState`/`video.duration` on every apply, never trusting
 *    a single `loadedmetadata` event (it can fire before the listener attaches
 *    on a fast local server, leaving duration = 0 forever).
 *  - `prefers-reduced-motion`: we do NOT collapse the hero height (that would
 *    zero the scrollable and freeze progress at 0). The scrub still follows the
 *    user's own scroll — it is not autonomous motion.
 */

const clamp = (n: number, lo = 0, hi = 1) => (n < lo ? lo : n > hi ? hi : n);

export function useCinemaScroll(
  sectionRef: React.RefObject<HTMLElement | null>,
  videoRef: React.RefObject<HTMLVideoElement | null>,
) {
  const [progress, setProgress] = useState(0);
  const pRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let lastSeek = -1;

    // --- shared helpers, declared BEFORE any binding that uses them ---
    const computeP = (): number => {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return 0;
      return clamp(-rect.top / scrollable);
    };

    const apply = () => {
      const p = computeP();
      pRef.current = p;

      const v = videoRef.current;
      if (v) {
        const d = v.duration;
        if (Number.isFinite(d) && d > 0 && v.readyState >= 1) {
          const t = Math.min(d - 0.05, Math.max(0, p * d));
          if (Math.abs(t - lastSeek) > 0.012) {
            lastSeek = t;
            try {
              v.currentTime = t;
            } catch {
              /* seek can throw mid-buffer — the next scroll retries */
            }
          }
        }
      }

      setProgress(p);
    };

    // Apply synchronously on every scroll event. Browsers already fire scroll at
    // most once per frame, and apply() is one rect read + one state set — cheap.
    // Direct application means progress never trails the scroll position.
    const onScroll = () => apply();
    const onResize = () => apply();
    const onVisibility = () => {
      if (!document.hidden) apply();
    };

    // video metadata may already be present by the time we bind
    const v = videoRef.current;
    const onMeta = () => apply();
    if (v) {
      v.addEventListener('loadedmetadata', onMeta);
      v.addEventListener('loadeddata', onMeta);
      v.addEventListener('durationchange', onMeta);
      v.addEventListener('canplay', onMeta);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    apply(); // first paint

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      if (v) {
        v.removeEventListener('loadedmetadata', onMeta);
        v.removeEventListener('loadeddata', onMeta);
        v.removeEventListener('durationchange', onMeta);
        v.removeEventListener('canplay', onMeta);
      }
    };
  }, [sectionRef, videoRef]);

  return { progress, pRef };
}

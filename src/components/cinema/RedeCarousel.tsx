import React, { useEffect, useRef } from 'react';

export interface RedeCarouselItem {
  n: string;
  t: string;
  d: string;
  img: string;
}

interface Props {
  items: RedeCarouselItem[];
  prevLabel: string;
  nextLabel: string;
}

const AUTOPLAY_MS = 5200;
const TRANSITION_MS = 850;

/**
 * Controlador imperativo: manipula transform/filter direto no DOM a cada frame.
 * Mantido fora do ciclo de render do React (perf) — React só cuida do texto/JSX.
 */
class RedeCarouselController {
  root: HTMLDivElement;
  viewport: HTMLDivElement;
  slides: HTMLElement[];
  prevBtn: HTMLButtonElement;
  nextBtn: HTMLButtonElement;
  pagination: HTMLDivElement;
  progressBar: HTMLSpanElement;
  dots: HTMLButtonElement[] = [];
  n: number;
  reduced: boolean;

  slideW = 0;
  gap = 24;
  opts = { peek: 0.16, rotateY: 30, zDepth: 130, scaleDrop: 0.08, activeLeftBias: 0.1 };

  index = 0;
  pos = 0;
  dragging = false;
  pointerId: number | null = null;
  x0 = 0;
  t0 = 0;
  v = 0;
  animating = false;
  hovering = false;
  startTime = 0;
  pausedAt = 0;
  rafId = 0;
  destroyed = false;
  ro!: ResizeObserver;

  constructor(root: HTMLDivElement) {
    this.root = root;
    this.viewport = root.querySelector('.rce-viewport')!;
    this.slides = Array.from(root.querySelectorAll<HTMLElement>('.rce-slide'));
    this.prevBtn = root.querySelector('.rce-prev')!;
    this.nextBtn = root.querySelector('.rce-next')!;
    this.pagination = root.querySelector('.rce-pagination')!;
    this.progressBar = root.querySelector('.rce-progress__bar')!;
    this.n = this.slides.length;
    this.reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    this._applyBreakpoint();
    this._setupDots();
    this._bind();
    this._measure();
    this.goTo(0, false);
    if (!this.reduced) this._startCycle();
    this._loop();
  }

  _applyBreakpoint() {
    const w = window.innerWidth;
    if (w <= 560) Object.assign(this.opts, { peek: 0.05, rotateY: 12, zDepth: 60, scaleDrop: 0.05, activeLeftBias: 0.07 });
    else if (w <= 768) Object.assign(this.opts, { peek: 0.06, rotateY: 16, zDepth: 70, scaleDrop: 0.06, activeLeftBias: 0.08 });
    else if (w <= 1000) Object.assign(this.opts, { peek: 0.09, rotateY: 22, zDepth: 90, scaleDrop: 0.07, activeLeftBias: 0.09 });
    else if (w <= 1200) Object.assign(this.opts, { peek: 0.12, rotateY: 28, zDepth: 120, scaleDrop: 0.08, activeLeftBias: 0.1 });
    else Object.assign(this.opts, { peek: 0.16, rotateY: 30, zDepth: 130, scaleDrop: 0.08, activeLeftBias: 0.1 });
    this.gap = w <= 560 ? 14 : w <= 768 ? 18 : w <= 1000 ? 22 : 26;
  }

  _setupDots() {
    this.pagination.innerHTML = '';
    this.dots = this.slides.map((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'rce-dot';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', `${i + 1}`);
      b.addEventListener('click', () => this.goTo(i));
      this.pagination.appendChild(b);
      return b;
    });
  }

  _bind() {
    this.prevBtn.addEventListener('click', this._onPrev);
    this.nextBtn.addEventListener('click', this._onNext);
    this.root.addEventListener('keydown', this._onKeydown);

    const pe = this.viewport;
    pe.addEventListener('pointerdown', this._onDragStart);
    pe.addEventListener('pointermove', this._onDragMove);
    pe.addEventListener('pointerup', this._onDragEnd);
    pe.addEventListener('pointercancel', this._onDragEnd);
    pe.addEventListener('pointermove', this._onTilt);

    this.root.addEventListener('mouseenter', this._onEnter);
    this.root.addEventListener('mouseleave', this._onLeave);

    this.ro = new ResizeObserver(() => {
      this._applyBreakpoint();
      this._measure();
      this._render();
    });
    this.ro.observe(this.viewport);
  }

  _onPrev = () => this.prev();
  _onNext = () => this.next();
  _onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') this.prev();
    if (e.key === 'ArrowRight') this.next();
  };
  _onEnter = () => {
    this.hovering = true;
    this.pausedAt = performance.now();
  };
  _onLeave = () => {
    if (this.pausedAt) {
      this.startTime += performance.now() - this.pausedAt;
      this.pausedAt = 0;
    }
    this.hovering = false;
  };

  _measure() {
    const viewRect = this.viewport.getBoundingClientRect();
    this.slideW = Math.min(720, viewRect.width * (1 - this.opts.peek * 2));
  }

  _onTilt = (e: PointerEvent) => {
    if (this.reduced) return;
    const r = this.viewport.getBoundingClientRect();
    const mx = (e.clientX - r.left) / r.width - 0.5;
    const my = (e.clientY - r.top) / r.height - 0.5;
    this.root.style.setProperty('--rceTiltX', (my * -5).toFixed(3));
    this.root.style.setProperty('--rceTiltY', (mx * 5).toFixed(3));
  };

  _onDragStart = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    this.dragging = true;
    this.pointerId = e.pointerId;
    this.viewport.setPointerCapture(e.pointerId);
    this.x0 = e.clientX;
    this.t0 = performance.now();
    this.v = 0;
    this.pausedAt = performance.now();
  };

  _onDragMove = (e: PointerEvent) => {
    if (!this.dragging || e.pointerId !== this.pointerId) return;
    const dx = e.clientX - this.x0;
    const dt = Math.max(16, performance.now() - this.t0);
    this.v = dx / dt;
    const span = this.slideW + this.gap;
    this.pos = this._mod(this.index - dx / span, this.n);
    this._render();
  };

  _onDragEnd = (e: PointerEvent) => {
    if (!this.dragging || (e && e.pointerId !== this.pointerId)) return;
    this.dragging = false;
    try {
      if (this.pointerId != null) this.viewport.releasePointerCapture(this.pointerId);
    } catch {
      /* noop */
    }
    this.pointerId = null;
    if (this.pausedAt) {
      this.startTime += performance.now() - this.pausedAt;
      this.pausedAt = 0;
    }
    const threshold = 0.18;
    const target = Math.round(this.pos - Math.sign(this.v) * (Math.abs(this.v) > threshold ? 0.5 : 0));
    this.goTo(this._mod(target, this.n));
  };

  _startCycle() {
    this.startTime = performance.now();
    this._renderProgress(0);
  }

  _loop = () => {
    if (this.destroyed) return;
    const step = (t: number) => {
      if (this.destroyed) return;
      if (!this.reduced && !this.dragging && !this.hovering && !this.animating) {
        const elapsed = t - this.startTime;
        const p = Math.min(1, elapsed / AUTOPLAY_MS);
        this._renderProgress(p);
        if (elapsed >= AUTOPLAY_MS) this.next();
      }
      this.rafId = requestAnimationFrame(step);
    };
    this.rafId = requestAnimationFrame(step);
  };

  _renderProgress(p: number) {
    this.progressBar.style.transform = `scaleX(${p})`;
  }

  prev() {
    this.goTo(this._mod(this.index - 1, this.n));
  }
  next() {
    this.goTo(this._mod(this.index + 1, this.n));
  }

  goTo(i: number, animate = true) {
    const start = this.pos || this.index;
    const end = this._nearest(start, i);
    const dur = animate && !this.reduced ? TRANSITION_MS : 0;

    // sem duração (primeiro layout, ou reduced-motion): aplica já, sem depender
    // de um tick de rAF — a aba pode estar oculta/em background nesse instante.
    if (dur === 0) {
      this.pos = end;
      this._render();
      this._afterSnap(i);
      return;
    }

    const t0 = performance.now();
    const ease = (x: number) => 1 - Math.pow(1 - x, 4);
    this.animating = true;
    const step = (now: number) => {
      if (this.destroyed) return;
      const t = Math.min(1, (now - t0) / dur);
      const p = ease(t);
      this.pos = start + (end - start) * p;
      this._render();
      if (t < 1) requestAnimationFrame(step);
      else this._afterSnap(i);
    };
    requestAnimationFrame(step);
  }

  _afterSnap(i: number) {
    this.index = this._mod(Math.round(this.pos), this.n);
    this.pos = this.index;
    this.animating = false;
    this._render(true);
    if (!this.reduced) this._startCycle();
  }

  _nearest(from: number, target: number) {
    let d = target - Math.round(from);
    if (d > this.n / 2) d -= this.n;
    if (d < -this.n / 2) d += this.n;
    return Math.round(from) + d;
  }
  _mod(i: number, n: number) {
    return ((i % n) + n) % n;
  }

  _render(markActive = false) {
    const span = this.slideW + this.gap;
    const tiltX = parseFloat(this.root.style.getPropertyValue('--rceTiltX') || '0');
    const tiltY = parseFloat(this.root.style.getPropertyValue('--rceTiltY') || '0');

    for (let i = 0; i < this.n; i++) {
      let d = i - this.pos;
      if (d > this.n / 2) d -= this.n;
      if (d < -this.n / 2) d += this.n;
      const weight = Math.max(0, 1 - Math.abs(d) * 2);
      const biasActive = -this.slideW * this.opts.activeLeftBias * weight;
      const tx = d * span + biasActive;
      const depth = -Math.abs(d) * this.opts.zDepth;
      const rot = -d * this.opts.rotateY;
      const scale = 1 - Math.min(Math.abs(d) * this.opts.scaleDrop, 0.42);
      const blur = this.reduced ? 0 : Math.min(Math.abs(d) * 2, 2);
      const z = Math.round(1000 - Math.abs(d) * 10);

      const s = this.slides[i];
      s.style.transform = `translate3d(${tx}px,-50%,${depth}px) rotateY(${rot}deg) scale(${scale})`;
      s.style.filter = blur ? `blur(${blur}px)` : 'none';
      s.style.zIndex = String(z);
      if (markActive) s.dataset.state = Math.round(this.index) === i ? 'active' : 'rest';

      const bg = s.querySelector<HTMLElement>('.rce-card__bg');
      if (bg) {
        const parBase = Math.max(-1, Math.min(1, -d));
        const bgX = parBase * -40 + tiltY * -1.6;
        const bgY = tiltX * -1.2;
        bg.style.transform = `translate3d(${bgX.toFixed(2)}px, ${bgY.toFixed(2)}px, 0) scale(1.14)`;
      }
    }

    const active = this._mod(Math.round(this.pos), this.n);
    this.dots.forEach((dot, i) => dot.setAttribute('aria-selected', i === active ? 'true' : 'false'));
  }

  destroy() {
    this.destroyed = true;
    cancelAnimationFrame(this.rafId);
    this.ro?.disconnect();
    this.prevBtn.removeEventListener('click', this._onPrev);
    this.nextBtn.removeEventListener('click', this._onNext);
    this.root.removeEventListener('keydown', this._onKeydown);
    const pe = this.viewport;
    pe.removeEventListener('pointerdown', this._onDragStart);
    pe.removeEventListener('pointermove', this._onDragMove);
    pe.removeEventListener('pointerup', this._onDragEnd);
    pe.removeEventListener('pointercancel', this._onDragEnd);
    pe.removeEventListener('pointermove', this._onTilt);
    this.root.removeEventListener('mouseenter', this._onEnter);
    this.root.removeEventListener('mouseleave', this._onLeave);
  }
}

export function RedeCarousel({ items, prevLabel, nextLabel }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctrl = new RedeCarouselController(rootRef.current);
    return () => ctrl.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  return (
    <div className="rce" ref={rootRef}>
      <div className="rce-viewport" tabIndex={0}>
        <div className="rce-track">
          {items.map((it, i) => (
            <article
              className="rce-slide"
              key={it.n}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${items.length}`}
            >
              <div className="rce-card">
                <div className="rce-card__bg" style={{ backgroundImage: `url('${it.img}')` }} />
                <div className="rce-card__scrim" />
                <div className="rce-card__body">
                  <span className="rce-card__n">{it.n}</span>
                  <h3 className="rce-card__t">{it.t}</h3>
                  <p className="rce-card__d">{it.d}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="rce-controls">
        <button className="rce-prev" aria-label={prevLabel} type="button">
          ‹
        </button>
        <button className="rce-next" aria-label={nextLabel} type="button">
          ›
        </button>
      </div>

      <div className="rce-pagination" role="tablist" />
      <div className="rce-progress" aria-hidden="true">
        <span className="rce-progress__bar" />
      </div>
    </div>
  );
}

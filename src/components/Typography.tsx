import React from 'react';
import { useInViewOnce } from '@/components/cinema/motion';

interface SectionHeaderProps {
  label: string;
  className?: string;
}

/**
 * Marcador de seção do site — [ RÓTULO ] em ciano, com o traço que se desenha
 * ao entrar na viewport. Mesma linguagem do `.mf-marker` do /manifesto, só que
 * utilizável fora do escopo `.cinema-root` (subpáginas em Tailwind).
 */
export function SectionHeader({ label, className = '' }: SectionHeaderProps) {
  const { ref, seen } = useInViewOnce<HTMLParagraphElement>(0.95);
  // parte das strings de i18n já traz os colchetes (ex.: '[ BIBLIOTECA ]');
  // outras chamadas passam só o rótulo. Evita virar "[ [ X ] ]".
  const temColchetes = /^\s*\[.*\]\s*$/.test(label);

  return (
    <p ref={ref} className={`site-marker${seen ? ' is-in' : ''} ${className}`.trim()}>
      {temColchetes ? label : `[ ${label} ]`}
    </p>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-20 pt-32">
      <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter uppercase mb-6">
        {title}
      </h1>
      {subtitle && (
        <p className="font-mono text-sm md:text-base tracking-widest text-muted-foreground max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

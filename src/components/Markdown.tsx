import React from 'react';
import { Link } from 'wouter';

/**
 * Minimal Markdown renderer for Field Notes + Archive project bodies.
 * Supports: paragraphs (blank-line separated), `## ` / `### ` headings,
 * `> ` blockquotes, `---` rules, `- ` / `* ` unordered lists, inline
 * `**bold**` / `*italic*`, and internal links `[[slug|Label]]` /
 * `[[/path|Label]]`. A standalone bold line is a section label when short.
 */

function inline(text: string, keyPrefix: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const re = /(\[\[[^\]]+\]\]|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith('[[')) {
      const inner = tok.slice(2, -2);
      const [target, label] = inner.includes('|') ? inner.split('|') : [inner, inner];
      const href = target.startsWith('/') ? target : `/archive/${target}`;
      out.push(
        <Link key={`${keyPrefix}-${i++}`} href={href} className="md-xref">
          {label.trim()}
        </Link>,
      );
    } else if (tok.startsWith('**')) {
      out.push(<strong key={`${keyPrefix}-${i++}`}>{tok.slice(2, -2)}</strong>);
    } else {
      out.push(<em key={`${keyPrefix}-${i++}`}>{tok.slice(1, -1)}</em>);
    }
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Markdown({ source, className }: { source: string; className?: string }) {
  const blocks = source.trim().split(/\n{2,}/);

  return (
    <div className={className}>
      {blocks.map((raw, i) => {
        const block = raw.trim();
        if (!block) return null;

        if (block === '---') return <hr key={i} className="md-hr" />;

        if (block.startsWith('### '))
          return (
            <h4 key={i} className="md-h4">
              {inline(block.slice(4), `h${i}`)}
            </h4>
          );
        if (block.startsWith('## '))
          return (
            <h3 key={i} className="md-h3">
              {inline(block.slice(3), `h${i}`)}
            </h3>
          );

        if (block.startsWith('> ')) {
          const quote = block
            .split('\n')
            .map((l) => l.replace(/^>\s?/, ''))
            .join(' ');
          return (
            <blockquote key={i} className="md-quote">
              {inline(quote, `q${i}`)}
            </blockquote>
          );
        }

        if (/^[-*] /.test(block)) {
          const items = block.split('\n').filter((l) => /^[-*] /.test(l.trim()));
          return (
            <ul key={i} className="md-ul">
              {items.map((l, j) => (
                <li key={j}>{inline(l.trim().replace(/^[-*] /, ''), `l${i}-${j}`)}</li>
              ))}
            </ul>
          );
        }

        const allBold = /^\*\*([^*]+)\*\*$/.exec(block);
        if (allBold) {
          const inner = allBold[1].trim();
          const isHeading = inner.length <= 64 && !/[.!?…]/.test(inner);
          return isHeading ? (
            <h3 key={i} className="md-h3">
              {inner}
            </h3>
          ) : (
            <p key={i} className="md-lead">
              {inner}
            </p>
          );
        }

        return (
          <p key={i} className="md-p">
            {inline(block, `p${i}`)}
          </p>
        );
      })}
    </div>
  );
}

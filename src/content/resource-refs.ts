/**
 * Ponte entre os cartões de Recursos e a Bibliografia.
 *
 * Recursos apresenta doze obras com um comentário curto; a Bibliografia traz a
 * ficha completa de cada uma, com edição e links de acesso. Este mapa liga uma
 * à outra pela âncora `#item-N`.
 *
 * A chave é o título como aparece em Recursos, que é dado bibliográfico e
 * portanto idêntico nos dois idiomas — por isso o mapa vive aqui e não nos
 * dicionários, onde precisaria ser duplicado e poderia divergir. Os títulos
 * nem sempre coincidem entre as duas páginas (Recursos usa a forma corrente,
 * a Bibliografia a do frontispício), então casar por texto seria frágil: o
 * vínculo é declarado à mão.
 *
 * Este módulo não importa a Bibliografia de propósito — ela é um pedaço de
 * 58 kB carregado sob demanda, e Recursos precisa só dos números. A conferência
 * de que cada número existe roda na própria página da Bibliografia, onde o
 * acervo já está carregado.
 */

export const RESOURCE_REFS: Record<string, number> = {
  'Entangled Life': 1,
  'Mycelium Running': 2,
  /* na Bibliografia consta pelo título original alemão */
  'The Hidden Life of Trees': 5,
  'Braiding Sweetgrass': 8,
  'Thinking in Systems': 9,
  'Limits to Growth': 10,
  'Design in Nature': 14,
  'Doughnut Economics': 16,
  'Regenerative Enterprise': 17,
  'Sacred Economics': 18,
  'The Ecology of Commerce': 19,
  'Emergent Strategy': 25,
};

/** Âncora do item na Bibliografia. */
export const itemAnchor = (n: number) => `item-${n}`;

/**
 * Rota da ficha completa, ou `undefined` quando a obra não está na
 * Bibliografia — nesse caso o cartão é renderizado sem afordância de clique,
 * em vez de virar um link morto.
 */
export function bibliographyHref(title: string): string | undefined {
  const n = RESOURCE_REFS[title];
  return n === undefined ? undefined : `/re-sources/bibliografia#${itemAnchor(n)}`;
}

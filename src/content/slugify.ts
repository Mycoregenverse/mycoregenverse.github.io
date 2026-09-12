/** Turn a project name into a URL slug. Kept in its own module so the light
 *  archive index can import it without pulling in the long-form bodies. */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

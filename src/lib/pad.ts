/** Schoon pad zonder `.html`, `index` of slash aan het eind (de homepage blijft `/`). */
export function schoonPad(pathname: string): string {
  const pad = pathname.replace(/(\/index)?\.html$/, '').replace(/\/+$/, '');
  return pad === '' ? '/' : pad;
}

import type { CollectionEntry } from 'astro:content';

/** Leestijd in minuten, berekend uit de tekst (± 200 woorden per minuut, naar boven afgerond). */
export function leestijd(artikel: CollectionEntry<'inspiratie'>): number {
  if (artikel.data.leestijd) return artikel.data.leestijd;
  const woorden = (artikel.body ?? '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(woorden / 200));
}

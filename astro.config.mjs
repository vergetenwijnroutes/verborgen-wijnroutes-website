// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

const site = 'https://verborgenwijnroutes.nl';

// Laatst gewijzigd per URL, voor de sitemap: uit de frontmatter van artikelen
// (`bijgewerkt` of anders `datum`) en juridische pagina's (`datum`).
function wijzigingsdatums() {
  /** @type {Record<string, string>} */
  const datums = {};
  const lees = (map, pad) => {
    for (const bestand of readdirSync(map).filter((b) => b.endsWith('.md'))) {
      const tekst = readFileSync(`${map}/${bestand}`, 'utf8');
      const veld = (naam) => tekst.match(new RegExp(`^${naam}:\\s*["']?(\\d{4}-\\d{2}-\\d{2})`, 'm'))?.[1];
      const datum = veld('bijgewerkt') ?? veld('datum');
      if (datum) datums[`${site}${pad}${bestand.replace(/\.md$/, '')}`] = datum;
    }
  };
  lees('./content/inspiratie', '/inspiratie/');
  lees('./content/juridisch', '/');
  return datums;
}
const datums = wijzigingsdatums();

export default defineConfig({
  site,
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  integrations: [
    sitemap({
      serialize(item) {
        const datum = datums[item.url.replace(/\/$/, '')];
        return datum ? { ...item, lastmod: datum } : item;
      },
    }),
  ],
});

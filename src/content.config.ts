import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Inspiratieartikelen: één Markdown-bestand per artikel in content/inspiratie/.
// Zodra hier een bestand staat, verschijnt het automatisch op de homepage.
const inspiratie = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/inspiratie' }),
  schema: ({ image }) =>
    z.object({
      titel: z.string(),
      samenvatting: z.string(),
      datum: z.coerce.date(),
      categorie: z.string().optional(),
      route: z.enum(['tirana', 'kreta', 'split']).optional(),
      hoofdfoto: image().optional(),
      hoofdfotoAlt: z.string().optional(),
      leestijd: z.number().int().positive().optional(),
      concept: z.boolean().default(false),
    }),
});

// Wijnroutes: één Markdown-bestand per route in content/wijnroutes/.
// De bestandsnaam is de slug (/wijnroutes/<slug>/). De lopende tekst onder de
// frontmatter is het verhaal "Waarom deze route".
const wijnroutes = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/wijnroutes' }),
  schema: ({ image }) =>
    z.object({
      naam: z.string(),
      land: z.string(),
      status: z.enum(['actief', 'binnenkort', 'gearchiveerd']),
      volgorde: z.number().int(),
      regel: z.string(),
      seoTitel: z.string().optional(),
      seoOmschrijving: z.string().optional(),
      h1: z.string().optional(),
      intro: z.string().optional(),
      lead: z.string().optional(),
      hoofdfoto: image().optional(),
      hoofdfotoAlt: z.string().optional(),
      hoofdfotoBijschrift: z.string().optional(),
      feiten: z.array(z.object({ label: z.string(), waarde: z.string() })).default([]),
      gebied: z.string().optional(),
      druiven: z
        .object({
          intro: z.string(),
          inheems: z.array(z.object({ naam: z.string(), kleur: z.string() })),
          internationaal: z.array(z.string()),
          stijlen: z.string(),
          notitie: z.string().optional(),
        })
        .optional(),
      momenten: z
        .array(
          z.object({
            naam: z.string(),
            soort: z.string(),
            tekst: z.string(),
            foto: image().optional(),
            fotoAlt: z.string().optional(),
            positie: z.string().optional(),
          }),
        )
        .default([]),
      plekken: z.array(z.object({ soort: z.string(), tekst: z.string() })).default([]),
      tafel: z
        .object({
          tekst: z.string(),
          fotos: z.array(z.object({ foto: image(), alt: z.string(), bijschrift: z.string(), warm: z.boolean().optional() })),
        })
        .optional(),
      seizoenenIntro: z.string().optional(),
      seizoenen: z.array(z.object({ naam: z.string(), maanden: z.string(), tekst: z.string() })).default([]),
    }),
});

export const collections = { inspiratie, wijnroutes };

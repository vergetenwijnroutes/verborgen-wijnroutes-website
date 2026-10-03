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
      route: z.enum(['tirana', 'lefkas', 'split']).optional(),
      hoofdfoto: image().optional(),
      hoofdfotoAlt: z.string().optional(),
      leestijd: z.number().int().positive().optional(),
      concept: z.boolean().default(false),
    }),
});

export const collections = { inspiratie };

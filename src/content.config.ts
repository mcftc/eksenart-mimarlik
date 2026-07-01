import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Content Layer collections (the "database" is git).
 * Images are string paths under /public/images for now (placeholders); migrate
 * covers/gallery to astro:assets `image()` once real project photography lands.
 */

const services = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/services" }),
  schema: z.object({
    title: z.string(),
    order: z.number().default(0),
    excerpt: z.string(),
    heroImage: z.string().optional(),
    keywords: z.array(z.string()).default([]),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    related: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const CATEGORIES = [
  "konut",
  "villa",
  "ticari",
  "ofis",
  "tadilat",
  "anahtar-teslim",
  "kentsel-donusum",
] as const;

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.enum(CATEGORIES),
    services: z.array(z.string()).default([]),
    location: z.string(),
    district: z.string().optional(),
    year: z.number(),
    area_m2: z.number().optional(),
    duration: z.string().optional(),
    status: z.enum(["tamamlandi", "devam", "konsept"]).default("tamamlandi"),
    cover: z.string(),
    coverAlt: z.string(),
    gallery: z
      .array(z.object({ src: z.string(), alt: z.string(), caption: z.string().optional() }))
      .default([]),
    materials: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const bolgeler = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/bolgeler" }),
  schema: z.object({
    title: z.string(),
    ilce: z.string(),
    intro: z.string(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    services: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const rehber = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/rehber" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    datePublished: z.string(),
    dateModified: z.string().optional(),
    author: z.string().default("Eksenart Mimarlık"),
    category: z.string().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { services, projects, bolgeler, rehber };

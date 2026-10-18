import { defineCollection } from "astro/content/config";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
const blog = defineCollection({
    loader: glob({base: './src/content/blog',pattern: '**/*.{md,mdx}'}),
    schema:({image}) => z.object({
        titulo: z.string(),
        descripcion: z.string(),
        fechaPub: z.coerce.date(),
        fechaAct: z.coerce.date().optional(),
        portada: image(),
        portadaAlt: z.string(),
        etiquetas: z.array(z.string()).default([])
    })
})
const portafolio = defineCollection({
    loader: glob({base:'./src/content/portafolio',pattern:'**/*.{md,mdx}'}),
    schema: z.object({
        nombre: z.string(),
        descripcion: z.string(),
        repoUrl: z.string(),
        demoUrl: z.string().optional()
    })
})
export const collections = {blog,portafolio}
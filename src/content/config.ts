import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Type-check frontmatter using a schema
    schema: z.object({
        title: z.string(),
        description: z.string(),
        // Transform string to Date object
        createdAt: z
            .string()
            .or(z.date())
            .transform((val) => new Date(val)),
        updatedDate: z
            .string()
            .optional()
            .transform((str) => (str ? new Date(str) : undefined)),
        heroImage: z.string().optional(),
        // New: topic/category path (ordered) and tags
        categories: z.array(z.string()).default([]),
        tags: z.array(z.string()).default([]),
        status: z.enum(['in-progress']).optional(),
    }),
});

export const collections = { blog };

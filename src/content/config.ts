import { defineCollection, reference, z } from 'astro:content';
import {glob} from "astro/loaders";


const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		headerImage: z.string().optional(),
		language: z.enum(['en', 'de']).default('de')
	}),
});

const project = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		// Transform string to Date object
		foundingDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		headerImage: z.string().optional(),
		projectLink: z.string().optional(),
		projectStatus: z.enum(['active', 'deprecated', 'adoption', 'planning']).default('active'),
		language: z.enum(['en', 'de']).default('de')
	}),
});
const law = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		language: z.enum(['en', 'de']).default('de')
	}),
});

const authors = defineCollection({
	loader: glob({ pattern: '**/[^_]*.json', base: "./src/data/authors" }),
	schema: z.object({
		name: z.string(),
		portfolio: z.string().url(),
	})
});

export const collections = { blog, law, project };

import { defineCollection, z } from 'astro:content';

const servicos = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		icon: z.string().optional(),
		whatsapp: z.string().optional(),
		phone: z.string().optional(),
	}),
});

export const collections = { servicos };


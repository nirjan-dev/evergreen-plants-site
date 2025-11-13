import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'
export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: 'content/products/*.md',
      schema: z.object({
        name: z.string(),
        nepaliName: z.string().optional(),
        price: z.number(),
        description: z.string(),
        image: z.string(),
        stock: z.number(),
        instructions: z.string().optional(),
        wright: z.number().optional()
      })
    })
  }
})

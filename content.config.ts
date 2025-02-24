import { defineCollection, defineContentConfig } from '@nuxt/content'
import { asRobotsCollection } from '@nuxtjs/robots/content'

export default defineContentConfig({
  collections: {
    content: defineCollection(
      // adds the robots frontmatter key to the collection
      asRobotsCollection({
        type: 'page',
        source: '**/*.md',
      }),
    ),
  },
})

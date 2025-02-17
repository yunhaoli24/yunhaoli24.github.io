import tailwindcss from '@tailwindcss/vite'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({

  // build modules
  modules: [
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@element-plus/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@nuxtjs/device',
  ],
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  app: {
    // head
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Yunhao Li',
      meta: [
        { charset: 'utf-8' },
        { name: 'title', content: `Yunhao Li` },
        {
          name: 'description',
          content: `The blog of Yunhao Li, a passionate researcher who love to use programming skills and creativity to solve problems.`,
        },
        { name: 'og:title', content: `Yunhao Li` },
        {
          name: 'og:image',
          content: `https://yunhaoli.top/profile.JPG`,
        },
        { name: 'og:url', content: `https://yunhaoli.top` },
        // { name: 'twitter:card', content: `` },
        { name: 'twitter:title', content: `Yunhao Li` },
        // { name: 'twitter:description', content: `` },
        {
          name: 'twitter:image',
          content: `https://yunhaoli.top/og_image.jpeg`,
        },
        { name: 'twitter:creator', content: `@YunhaoLi` },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  css: ['~/assets/css/main.css'],
  // colorMode
  colorMode: {
    classSuffix: '',
  },
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },
  compatibilityDate: '2024-11-01',
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  elementPlus: {
    themes: ['dark'],
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
})

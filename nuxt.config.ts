// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({

  // build modules
  modules: [
    '@nuxtjs/seo',
    '@nuxtjs/device',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@element-plus/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@unocss/nuxt',
    '@nuxt/content',
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
  css: ['~/assets/scss/index.scss'],
  site: {
    url: 'https://yunhaoli.top',
    name: 'Yunhao Li',
  },
  colorMode: {
    classSuffix: '',
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            // Default theme (same as single string)
            default: 'github-light',
            // Theme used if `html.dark`
            dark: 'github-dark',
            // Theme used if `html.sepia`
            sepia: 'monokai',
          },
          langs: [
            'c',
            'cpp',
            'java',
            'shell',
            'python',
            'dockerfile',
            'javascript',
          ],
        },
        toc: {
          depth: 3,
          searchDepth: 3,
        },
      },
    },
    renderer: {
      anchorLinks: { h1: false, h2: false, h3: false, h4: false },
    },
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
  compatibilityDate: '2025-02-24',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `@use "@/assets/scss/element/index.scss" as element;`,
        },
      },
    },
  },
  typescript: {
    typeCheck: true,
  },
  elementPlus: {
    icon: false,
    importStyle: 'scss',
    themes: ['dark'],
  },
  eslint: {
    config: {
      stylistic: true,
      standalone: false,
    },
  },
})

// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  modules: ["shadcn-nuxt", "@nuxtjs/color-mode", "@nuxtjs/seo", "@nuxtjs/device"],
  app: {
    // head
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "Yunhao Li",
      meta: [
        { charset: "utf-8" },
        { name: "title", content: `Yunhao Li` },
        {
          name: "description",
          content: `The blog of Yunhao Li, a passionate researcher who love to use programming skills and creativity to solve problems.`,
        },
        { name: "og:title", content: `Yunhao Li` },
        {
          name: "og:image",
          content: `https://yunhaoli.top/profile.jpg`,
        },
        { name: "og:url", content: `https://yunhaoli.top` },
        // { name: 'twitter:card', content: `` },
        { name: "twitter:title", content: `Yunhao Li` },
        // { name: 'twitter:description', content: `` },
        {
          name: "twitter:image",
          content: `https://yunhaoli.top/og_image.jpeg`,
        },
        { name: "twitter:creator", content: `@YunhaoLi` },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: "@/components/ui",
  },
  colorMode: {
    classSuffix: "",
  },
  site: {
    url: "https://yunhaoli.top",
    name: "Yunhao Li",
  },
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  compatibilityDate: "2025-07-15",
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
});

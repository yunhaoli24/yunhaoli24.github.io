/*
 * @Author: li.yunhao
 * @Date: 2024-07-17 16:33:08
 * @LastEditors: li.yunhao li.yunhao@foxmail.com
 * @LastEditTime: 2024-07-17 18:19:33
 * @FilePath: /yunhaoli24.github.io/nuxt.config.ts
 * @Description:
 */
// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    app: {
        // head
        head: {
            htmlAttrs: {
                lang: 'en',
            },
            title: 'Yunhao Li',
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
                { name: 'title', content: `Yunhao Li` },
                {
                    name: 'description',
                    content: `The CV of Yunhao Li, a passionate researcher who love to use programming skills and creativity to solve problems.`,
                },
                { name: 'og:title', content: `Yunhao Li` },
                {
                    name: 'og:image',
                    content: `https://peterli.club/profile.JPG`,
                },
                { name: 'og:url', content: `https://peterli.club` },
                // { name: 'twitter:card', content: `` },
                { name: 'twitter:title', content: `Yunhao Li` },
                // { name: 'twitter:description', content: `` },
                {
                    name: 'twitter:image',
                    content: `https://peterli.club/og_image.jpeg`,
                },
                { name: 'twitter:creator', content: `@Eason_C13` },
                {
                    name: 'google-site-verification',
                    content: 'auUb0qKw6LnnH0N_zrY9XhA4BAbFBAH6CnbY-kiUM0Y',
                },
            ],
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
            script: [
                {
                    src: 'https://hm.baidu.com/hm.js?e50dee5804918429b74a301c425729fe',
                    defer: true,
                },
            ],
        },
    },

    // css
    css: [
        '~/assets/scss/index.scss',
        '@fortawesome/fontawesome-svg-core/styles.css',
    ],

    typescript: {
        strict: true,
        shim: false,
    },

    // build modules
    modules: [
        'nuxt-gtag',
        '@vueuse/nuxt',
        '@unocss/nuxt',
        '@pinia/nuxt',
        '@element-plus/nuxt',
        '@nuxtjs/color-mode',
    ],

    // vueuse
    vueuse: {
        ssrHandlers: true,
    },

    // colorMode
    colorMode: {
        classSuffix: '',
    },

    unocss: {
        uno: true,
        attributify: true,
        icons: {
            scale: 1.2,
        },
    },

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "@/assets/scss/element/index.scss" as element;`,
                },
            },
        },
    },

    elementPlus: {
        icon: 'ElIcon',
        importStyle: 'scss',
        themes: ['dark'],
    },

    gtag: {
        id: 'G-SHRXZRGLKR',
    },
    devtools: { enabled: true },
    compatibilityDate: '2024-07-17',
})

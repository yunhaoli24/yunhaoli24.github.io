<template>
    <div>
        <About class="About" />
        <el-divider />
        <Publications class="Publications" />
        <el-divider />
        <WorkExp class="WorkExp" />
        <el-divider />
        <ProgrammingSkills class="ProgrammingSkills" />
        <el-divider />
        <Education class="Education" />
        <el-divider />
        <Honors class="Honors" />
        <el-divider />
        <Footer />
    </div>
</template>

<script setup lang="ts">
const description =
    'The CV of Yunhao Li, a passionate researcher who love to use programming skills and creativity to solve problems.'
useSeoMeta({
    description: description,
    ogTitle: 'Yunhao Li',
    ogDescription: description,
    ogImage: 'https://yunhaoli.top/profile.JPG',
    ogUrl: 'https://yunhaoli.top',
    twitterTitle: 'Yunhao Li',
    twitterDescription: description,
    twitterImage: 'https://yunhaoli.top/profile.JPG',
    twitterCard: 'summary',
})

useHead({
    htmlAttrs: {
        lang: 'en',
    },
    link: [
        {
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico',
        },
    ],
})
</script>

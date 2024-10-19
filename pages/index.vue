<!--
 * @Author: li.yunhao
 * @Date: 2024-07-17 16:33:08
 * @LastEditors: li.yunhao li.yunhao@foxmail.com
 * @LastEditTime: 2024-10-19 11:05:42
 * @FilePath: /yunhaoli24.github.io/pages/index.vue
 * @Description: 
-->
<template>
    <div class="app-wrapper">
        <el-container>
            <el-header class="header">
                <Nav />
            </el-header>
            <el-main class="content">
                <el-row v-if="!isMobile">
                    <el-col :span="12" :offset="6">
                        <ContentSections />
                    </el-col>
                </el-row>
                <div v-else>
                    <ContentSections />
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<style>
.app-wrapper {
    width: 100%;
    height: 100%;
}
.content {
    position: relative;
    width: 100%;
    height: calc(100vh - 60px);
    overflow-y: scroll;
}
</style>
<script setup lang="ts">
const description =
    'The CV of Yunhao Li, a passionate researcher who love to use programming skills and creativity to solve problems.'
const image = 'https://peterli.club/profile.JPG'
useSeoMeta({
    description: description,
    ogTitle: 'Yunhao Li',
    ogDescription: description,
    ogImage: image,
    ogUrl: 'https://peterli.club',
    twitterTitle: 'Yunhao Li',
    twitterDescription: description,
    twitterImage: image,
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

const { width, height } = useWindowSize()
const isMobile = computed(() => width.value < 760)
</script>

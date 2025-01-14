<!--
 * @Author: li.yunhao
 * @Date: 2024-07-17 16:33:08
 * @LastEditors: li.yunhao li.yunhao@foxmail.com
 * @LastEditTime: 2024-10-19 11:05:42
 * @FilePath: /yunhaoli24.github.io/pages/index.vue
 * @Description: 
-->
<template>
    <div class="w-full h-full">
        <el-container>
            <el-header class="header">
                <Nav />
            </el-header>
            <el-main class="relative w-full h-[calc(100vh-60px)] overflow-y-scroll">
                <el-row v-if="!isMobile">
                    <el-col :span="18" :offset="3">
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

<script setup lang="ts">
import { useDevice } from '~/composables/useDevice'

const description =
    'The CV of Yunhao Li, a passionate researcher who love to use programming skills and creativity to solve problems.'
useSeoMeta({
    description: description,
    ogTitle: 'Yunhao Li',
    ogDescription: description,
    ogImage: 'https://peterli.club/profile.JPG',
    ogUrl: 'https://peterli.club',
    twitterTitle: 'Yunhao Li',
    twitterDescription: description,
    twitterImage: 'https://peterli.club/profile.JPG',
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

const { isMobile } = useDevice()
</script>

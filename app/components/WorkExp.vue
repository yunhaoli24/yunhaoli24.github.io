<!--
 * @Author: li.yunhao
 * @Date: 2024-07-17 21:32:27
 * @LastEditors: li.yunhao li.yunhao@foxmail.com
 * @LastEditTime: 2024-07-24 09:51:48
 * @FilePath: /yunhaoli24.github.io/components/WorkExp.vue
 * @Description: 
-->
<template>
    <div>
        <div class="text-4xl mb-8">Work Experience</div>
        <el-timeline class="space-y-4">
            <el-timeline-item v-for="(work, index) in works" :key="index" :timestamp="work.timestamp" placement="top">
                <el-card class="mb-4">
                    <template #header>
                        <div class="card-header p-4">
                            <el-row class="gap-5">
                                <el-col :span="3">
                                    <el-image :src="work.image" fit="fill" />
                                </el-col>
                                <el-col :span="21" class="flex flex-col justify-center">
                                    <span class="text-xl">
                                        {{ work.job }}
                                    </span>
                                    <br>
                                    <span class="text-lg">
                                        {{ work.title }}
                                    </span>
                                </el-col>
                            </el-row>
                        </div>
                    </template>
                    <span class="markdown_inline" v-html="marked(work.content)" />
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>
<script setup>
import { marked } from 'marked'

const works = [
    {
        title: 'China Post Bank',
        job: 'ML Researcher & Data Analyst',
        image: '/imgs/china_post.png',
        content:
            '* Developed AI-driven finance data precision recommendation model for customer marketing.\n' +
            '* Designed and implemented a model training engine for automatic rolling training and optimization.\n' +
            '* Contributed to a 15% increase in performance for China Post Bank GuangZhou.',
        timestamp: '2023/10-2024/06',
    },
]
</script>

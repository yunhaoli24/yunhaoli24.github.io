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
            <el-timeline-item
                v-for="(work, index) in works"
                :key="index"
                :timestamp="work.timestamp"
                placement="top"
            >
                <el-card>
                    <template #header>
                        <div>
                            <el-row class="flex items-center">
                                <el-col :span="3">
                                    <div
                                        class="max-h-100px max-w-100px overflow-hidden"
                                    >
                                        <img
                                            class="h-auto w-auto max-h-100px max-w-100px"
                                            :src="work.image"
                                            fit="fill"
                                        >
                                    </div>
                                </el-col>
                                <el-col :span="1" />
                                <el-col :span="20">
                                    <div class="flex flex-col">
                                        <span class="text-3xl">
                                            {{ work.job }}
                                        </span>
                                        <span class="text-2xl">
                                            {{ work.title }}
                                        </span>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </template>
                    <MDC class="text-base" :value="work.content" />
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script setup>
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

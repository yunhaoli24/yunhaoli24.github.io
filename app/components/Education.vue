<!--
 * @Author: li.yunhao
 * @Date: 2024-07-17 17:41:02
 * @LastEditors: li.yunhao li.yunhao@foxmail.com
 * @LastEditTime: 2024-07-24 09:45:39
 * @FilePath: /yunhaoli24.github.io/components/Education.vue
 * @Description: 
-->
<template>
    <div>
        <div class="text-4xl mb-8">Education</div>
        <el-timeline>
            <el-timeline-item v-for="(education, index) in educations" :key="index" :timestamp="education.timestamp"
                placement="top">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span class="text-xl">
                                {{ education.title }}
                            </span>
                            <br>
                            <span class="text-lg">
                                {{ education.school }}
                            </span>
                        </div>
                    </template>
                    <span class="markdown_inline" v-html="marked(education.content)" />
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>
<script setup>
import { marked } from 'marked'

const educations = [
    {
        title: 'Master of Artificial Intelligence',
        school: 'GuangZhou University',
        content:
            '* Major in Artificial Intelligence\n* Advisor: [Yan Pang](https://pangyan.me)\n* GPA 3.61/4',
        timestamp: '2022-2025',
    },
    {
        title: 'Bachelor in Computer Science',
        school: 'Guilin University of Electronic Technology',
        content: '* Major in Computer Science\n* GPA 4.15/5',
        timestamp: '2018-2022',
    },
]
</script>

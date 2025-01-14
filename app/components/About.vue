<!--
 * @Author: li.yunhao
 * @Date: 2024-07-17 20:44:41
 * @LastEditors: li.yunhao li.yunhao@foxmail.com
 * @LastEditTime: 2024-10-13 17:00:47
 * @FilePath: /yunhaoli24.github.io/components/About.vue
 * @Description: 
-->
<template>
    <div>
        <div class="text-4xl mb-8">About</div>
        <el-row :gutter="20">
            <el-col :span="isMobile ? 24 : 8">
                <el-image
                    class="w-full max-w-300px inline-block"
                    src="/profile.JPG"
                    fit="contain"
                />
            </el-col>
            <el-col :span="isMobile ? 24 : 16">
                <div class="text-xl">
                    <p class="indent-2em">
                        Hi, my name is Yunhao Li. I am currently pursuing a
                        Master of Science in Artificial Intelligence at
                        Guangzhou University. My research interests focus on
                        Computer Vision, Medical Image Analysis and Multimodal
                        Learning. I have strong hands-on skills, proficient in
                        tools like PyTorch, Transformers, AutoGluon, and
                        server-side technologies including Vue, FastAPI, and
                        Spring Cloud. My achievements include multiple national
                        competition awards and patents. Ultimately, I aim to
                        help others reach their full their potential through
                        education.
                    </p>
                    <SocialMediaLinks class="float-right" />
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script setup lang="ts">
import { useDevice } from '~/composables/useDevice'

const { isMobile } = useDevice()
</script>

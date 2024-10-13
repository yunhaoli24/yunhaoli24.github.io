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
        <h1>About</h1>
        <el-row :gutter="20">
            <el-col :span="isMobile ? 24 : 8">
                <el-image
                    style="width: 100%; max-width: 300px; height: 400px"
                    src="/profile.JPG"
                    fit="fill"
                />
            </el-col>
            <el-col :span="isMobile ? 24 : 16">
                <div :style="`font-size: var(--el-font-size-large)`">
                    <p style="text-indent: 2em">
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
                    <SocialMediaLinks style="float: right" />
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script setup lang="ts">
const { width, height } = useWindowSize()
const isMobile = computed(() => width.value < 760)
</script>
<style></style>

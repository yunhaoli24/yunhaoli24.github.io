<!--
 * @Author: li.yunhao
 * @Date: 2024-07-17 18:01:46
 * @LastEditors: li.yunhao li.yunhao@foxmail.com
 * @LastEditTime: 2024-07-24 09:44:29
 * @FilePath: /yunhaoli24.github.io/components/SocialMediaLinks.vue
 * @Description: 
-->
<template>
    <el-space>
        <a
            href="https://github.com/yunhaoli24"
            target="_blank"
            rel="noopener noreferrer"
        >
            <el-icon color="#409efc" class="no-inherit" :size="20">
                <Icon name="uil:github" />
            </el-icon>
        </a>
        <a
            href="https://scholar.google.com/citations?user=TDnI7j8AAAAJ"
            target="_blank"
            rel="noopener noreferrer"
        >
            <el-icon color="#409efc" class="no-inherit" :size="20">
                <Icon name="fa6-brands:google-scholar" />
            </el-icon>
        </a>
        <a
            href="mailto: li.yunhao@foxmail.com"
            target="_blank"
            rel="noopener noreferrer"
        >
            <el-icon color="#409efc" class="no-inherit" :size="20">
                <Icon name="material-symbols:mail" />
            </el-icon>
        </a>
        <a
            href="https://t.me/yunhaoli24"
            target="_blank"
            rel="noopener noreferrer"
        >
            <el-icon color="#409efc" class="no-inherit" :size="20">
                <Icon name="ic:baseline-telegram" />
            </el-icon>
        </a>
    </el-space>
</template>
<script setup></script>

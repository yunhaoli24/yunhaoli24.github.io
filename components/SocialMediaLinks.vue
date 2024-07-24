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
        <font-awesome-icon icon="fa-brands fa-github" />
      </el-icon>
    </a>
    <a
      href="https://scholar.google.com/citations?user=TDnI7j8AAAAJ"
      target="_blank"
      rel="noopener noreferrer"
    >
      <el-icon color="#409efc" class="no-inherit" :size="20">
        <font-awesome-icon icon="fa-brands fa-google-scholar" />
      </el-icon>
    </a>
    <a
      href="mailto: li.yunhao@foxmail.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      <el-icon color="#409efc" class="no-inherit" :size="20">
        <font-awesome-icon icon="envelope" />
      </el-icon>
    </a>
    <a href="https://t.me/yunhaoli24" target="_blank" rel="noopener noreferrer">
      <el-icon color="#409efc" class="no-inherit" :size="20">
        <font-awesome-icon icon="fa-brands fa-telegram" />
      </el-icon>
    </a>
  </el-space>
</template>
<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>
<style lang=""></style>

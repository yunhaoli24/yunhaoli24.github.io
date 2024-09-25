<!--
 * @Author: li.yunhao
 * @Date: 2024-07-17 16:33:08
 * @LastEditors: li.yunhao li.yunhao@foxmail.com
 * @LastEditTime: 2024-07-24 11:23:44
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
const { width, height } = useWindowSize()
const isMobile = computed(() => width.value < 760)
</script>

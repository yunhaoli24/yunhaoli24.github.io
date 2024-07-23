<!--
 * @Author: li.yunhao
 * @Date: 2024-07-17 16:33:08
 * @LastEditors: li.yunhao li.yunhao@foxmail.com
 * @LastEditTime: 2024-07-17 17:58:02
 * @FilePath: /lealaxy.github.io/pages/index.vue
 * @Description: 
-->
<template>
  <div class="app-wrapper">
    <el-container>
      <el-header class="header">
        <Nav />
      </el-header>
      <el-main class="content">
        <el-row>
          <el-col :span="12" :offset="6">
            <About class="About" />
            <el-divider />
          </el-col>
          <el-col :span="12" :offset="6">
            <WorkExp class="WorkExp" />
            <el-divider />
          </el-col>
          <el-col :span="12" :offset="6">
            <Publications class="Publications" />
            <el-divider />
          </el-col>
          <el-col :span="12" :offset="6">
            <ProgrammingSkills class="ProgrammingSkills" />
            <el-divider />
          </el-col>
          <el-col :span="12" :offset="6">
            <Education class="Education" />
            <el-divider />
          </el-col>
          <el-col :span="12" :offset="6">
            <Honors class="Honors" />
            <el-divider />
          </el-col>
          <el-col :span="12" :offset="6">
            <Footer />
          </el-col>
        </el-row>
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
<script setup lang="ts"></script>

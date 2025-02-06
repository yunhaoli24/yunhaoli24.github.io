<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/vue";
</script>

<template>
  <div>
    <SpeedInsights />
    <div class="w-full h-full">
      <el-container>
        <el-header>
          <Nav />
        </el-header>
        <el-main class="relative w-full h-[calc(100vh-60px)] overflow-y-scroll">
          <el-col :span="18" :offset="3">
            <slot />
          </el-col>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

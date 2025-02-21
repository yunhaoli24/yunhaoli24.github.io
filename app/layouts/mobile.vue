<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue'
</script>

<template>
  <div>
    <SpeedInsights />
    <div class="h-full w-full">
      <el-container>
        <el-header>
          <AcademicNav />
        </el-header>
        <el-main class="relative h-[calc(100vh-80px)] w-full overflow-y-scroll">
          <slot />
        </el-main>
      </el-container>
    </div>
  </div>
</template>

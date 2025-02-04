<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue'
</script>

<template>
    <div>
        <SpeedInsights />
        <div class="w-full h-full">
            <el-container>
                <el-header>
                    <Nav />
                </el-header>
                <el-main
                    class="relative w-full h-[calc(100vh-60px)] overflow-y-scroll"
                >
                    <slot />
                </el-main>
            </el-container>
        </div>
    </div>
</template>

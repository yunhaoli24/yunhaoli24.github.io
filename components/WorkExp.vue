<template>
  <div>
    <h1>Work Experience</h1>
    <el-timeline>
      <el-timeline-item
        v-for="(work, index) in works"
        :key="index"
        :timestamp="work.timestamp"
        placement="top"
      >
        <el-card>
          <template #header>
            <div class="card-header">
              <el-row :gutter="20">
                <el-col :span="3">
                  <el-image :src="work.image" fit="fill" />
                </el-col>
                <el-col
                  :span="21"
                  style="
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                  "
                >
                  <span :style="`font-size: var(--el-font-size-extra-large)`">
                    {{ work.job }}
                  </span>
                  <br />
                  <span :style="`font-size: var(--el-font-size-large)`">
                    {{ work.title }}
                  </span>
                </el-col>
              </el-row>
            </div>
          </template>
          <span v-html="marked(work.content)" class="markdown_inline" />
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script setup>
import { marked } from "marked";

const works = [
  {
    title: "China Post Bank",
    job: "ML Researcher & Data Analyst",
    image:
      "https://logos-download.com/wp-content/uploads/2016/10/China_Post_logo.png",
    content:
      "* Developed AI-driven finance data precision recommendation model for customer marketing.\n" +
      "* Designed and implemented a model training engine for automatic rolling training and optimization.\n" +
      "* Contributed to a 15% increase in performance for China Post Bank GuangZhou.",
    timestamp: "2023/10-2024/06",
  },
];
</script>
<style lang=""></style>

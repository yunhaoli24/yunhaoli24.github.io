<script setup lang="ts">
const works = [
  {
    title: 'China Post Bank',
    job: 'ML Researcher & Data Analyst',
    image: '/imgs/china_post.png',
    content: '* Developed AI-driven finance data precision recommendation model for customer marketing.\n* Designed and implemented a model training engine for automatic rolling training and optimization\n* Contributed to a 15% increase in performance for China Post Bank GuangZhou.',
    timestamp: '2023/10-2024/06',
  },
]
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      💼 Work Experience
    </h1>
    <el-timeline class="space-y-4">
      <el-timeline-item
        v-for="(work, index) in works"
        :key="index"
        :timestamp="work.timestamp"
        placement="top"
      >
        <el-card>
          <template #header>
            <el-space>
              <el-avatar
                :src="work.image"
                shape="square"
                size="large"
                fit="fill"
              />
              <div class="flex flex-col">
                <span class="text-xl">
                  {{ work.job }}
                </span>
                <span class="text-l">
                  {{ work.title }}
                </span>
              </div>
            </el-space>
          </template>
          <MDC
            class="text-base"
            :value="work.content"
          />
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

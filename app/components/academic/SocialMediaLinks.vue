<script setup lang="ts">
defineProps({
  size: {
    type: Number,
    default: 20,
  },
})
</script>

<template>
  <el-space>
    <a
      href="https://github.com/yunhaoli24"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon class="c-[--el-color-primary]" name="garden:github-fill-16" :size="size" />
    </a>
    <a
      href="https://scholar.google.com/citations?user=TDnI7j8AAAAJ"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon class="c-[--el-color-primary]" name="fa6-brands:google-scholar" :size="size" />
    </a>
    <a
      href="mailto: li.yunhao@foxmail.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon class="c-[--el-color-primary]" name="material-symbols:mail" :size="size" />
    </a>
    <a
      href="https://orcid.org/0000-0003-1704-3050"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon class="c-[--el-color-primary]" name="fa6-brands:orcid" :size="size" />
    </a>
    <a
      href="/blog"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon class="c-[--el-color-primary]" name="fa6-solid:blog" :size="size" />
    </a>
  </el-space>
</template>

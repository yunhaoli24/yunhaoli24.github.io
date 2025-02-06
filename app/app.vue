<template>
  <div>
    <Analytics />
    <NuxtLayout :name="$device.isMobile ? 'mobile' : 'default'">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { Analytics } from "@vercel/analytics/nuxt";
</script>

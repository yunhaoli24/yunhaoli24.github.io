<script setup lang="ts">
const appConfig = useAppConfig()
useSeoMeta({
  description: appConfig.description,
  ogTitle: appConfig.title,
  ogDescription: appConfig.description,
  ogImage: `${appConfig.url}/profile.JPG`,
  ogUrl: appConfig.url,
  twitterTitle: appConfig.title,
  twitterDescription: appConfig.description,
  twitterImage: `${appConfig.url}/profile.JPG`,
  twitterCard: 'summary',
})
</script>

<template>
  <div>
    <Academic />
  </div>
</template>

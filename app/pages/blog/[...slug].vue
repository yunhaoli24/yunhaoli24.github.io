<script lang="ts" setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})
const title = route.path.slice(1)
useHead({
  titleTemplate: `%s - ${title}`,
})
// Ensure the SEO meta tags are rendered
useSeoMeta(page.value?.seo || {})
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
  />
</template>

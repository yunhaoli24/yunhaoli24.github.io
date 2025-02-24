<script lang="ts" setup>
const route = useRoute()
const { data: page, execute } = useLazyAsyncData(route.path, () => {
  return queryCollection('blog').path(route.path).first()
})
execute()
onMounted(() => {
  execute()
})

const title = route.path.slice(1)
useHead({
  titleTemplate: `%s - ${title}`,
})
// Ensure the SEO meta tags are rendered
useSeoMeta(page.value?.seo || {})
</script>

<template>
  <div v-if="page">
    <ContentRenderer :value="page" />
  </div>
  <div v-else>
    <div class="empty-page">
      <h1>Page Not Found</h1>
      <p>Oops! The content you're looking for doesn't exist.</p>
      <NuxtLink to="/blog">
        Go back blog home.
      </NuxtLink>
    </div>
  </div>
</template>

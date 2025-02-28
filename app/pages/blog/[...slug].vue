<script lang="ts" setup>
const route = useRoute()
const { data: page, status } = useAsyncData(route.path, () => {
  return queryCollection('blog').path(route.path).first()
})
// execute()
// onMounted(() => {
//   if (page === undefined) {
//     execute()
//   }
// })

const title = route.path.slice(1).replace('/', '-')
useHead({
  titleTemplate: `%s - ${title}`,
})
// Ensure the SEO meta tags are rendered
useSeoMeta(page.value?.seo || {})
</script>

<template>
  <el-skeleton :rows="5" animated :loading=" status === 'pending'">
    <template #default>
      <div v-if="page && page.body.toc">
        <BlogTableOfContent :toc="page.body.toc" />
        <ContentRenderer :value="page" />
      </div>
    </template>
  </el-skeleton>
</template>

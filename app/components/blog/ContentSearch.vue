<script setup lang="ts">
import type { SearchResult } from 'minisearch'
import { Icon } from '#components'
import MiniSearch from 'minisearch'

const searchIcon = h(Icon, { name: 'hugeicons:search-01' })
const query = ref('')
const dialogVisible = ref(false)
const { data } = await useAsyncData('search', () => queryCollectionSearchSections('blog'))

const miniSearch = new MiniSearch({
  fields: ['title', 'content'],
  storeFields: ['title', 'content'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.2,
  },
})

// Add data to the MiniSearch instance
// Watch for changes in data and add to MiniSearch when available
watch(data, (newData) => {
  if (newData) {
    miniSearch.addAll(newData)
  }
}, { immediate: true })

const result = computed(() => miniSearch.search(toValue(query)))

function handleSearchCardClick(link: SearchResult) {
  useRouter().push(link.id)
  dialogVisible.value = false
}
</script>

<template>
  <el-button :icon="searchIcon" round @click="dialogVisible = true">
    Search
  </el-button>
  <el-dialog v-model="dialogVisible">
    <template #header>
      <el-input
        v-model="query"
        placeholder="Enter search query..."
        autofocus
        :prefix-icon="searchIcon"
      />
    </template>
    <div class="h-50vh pr-[calc(var(--el-dialog-padding-primary)+var(--el-message-close-size,_16px))]">
      <div v-if="result.length === 0" class="text-center text-gray-500">
        No results found
      </div>
      <el-scrollbar>
        <el-card v-for="link of result" :key="link.id" class="mt-2 flex-col hover:bg-[--el-color-primary-light-9]" shadow="hover" @click="handleSearchCardClick(link)">
          <el-row :gutter="10">
            <el-col :span="4" class="text-center">
              <el-text class="h-60% w-100% text-sm" type="primary" truncated>
                {{ link.title }}
              </el-text>
            </el-col>
            <el-col :span="20">
              <el-text class="h-60% w-100% text-xs" type="info" truncated>
                {{ link.content }}
              </el-text>
            </el-col>
          </el-row>
        </el-card>
      </el-scrollbar>
    </div>
  </el-dialog>
</template>

<style lang="css">
.el-card__body {
  padding-left: 5px;
}
</style>

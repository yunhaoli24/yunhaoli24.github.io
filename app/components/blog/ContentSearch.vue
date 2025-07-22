<script setup lang="ts">
import { Icon } from '#components'
import MiniSearch from 'minisearch'

const searchIcon = h(Icon, { name: 'hugeicons:search-01' })
const query = ref('')
const dialogVisible = ref(false)
const isSearching = ref(false)
const { data } = await useAsyncData('search', () => queryCollectionSearchSections('blog'))

const miniSearch = new MiniSearch({
  fields: ['title', 'content'],
  storeFields: ['title', 'content'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.2,
    boost: { title: 2 },
    combineWith: 'AND',
  },
})

// Add data to the MiniSearch instance
// Watch for changes in data and add to MiniSearch when available
watch(data, (newData) => {
  if (newData) {
    miniSearch.addAll(newData)
  }
}, { immediate: true })

// Debounced search to improve performance
const debouncedQuery = refDebounced(query, 300)

// Handle search state separately from computed
function performSearch() {
  isSearching.value = true
  const results = debouncedQuery.value.trim()
    ? miniSearch.search(toValue(debouncedQuery))
    : []
  isSearching.value = false
  return results
}

// Search results
const result = computed(() => performSearch())

// Highlight matching text in content
function highlightMatch(text: string, searchQuery: string): string {
  if (!searchQuery.trim()) {
    return text
  }

  // Simple highlighting for demo purposes
  // In production, consider using a more robust solution
  const words = searchQuery.trim().split(/\s+/)
  let highlighted = text

  words.forEach((word) => {
    if (word.length < 3) {
      return // Skip short words
    }

    const regex = new RegExp(`(${word})`, 'gi')
    highlighted = highlighted.replace(regex, '<mark class="bg-yellow-100 dark:bg-yellow-800/30 px-0.5 rounded">$1</mark>')
  })

  return highlighted
}

// Format content for display
function formatContent(content: string, query: string): string {
  // Truncate content and add ellipsis if needed
  const maxLength = 200
  const truncated = content.length > maxLength
    ? `${content.substring(0, maxLength)}...`
    : content

  // Only highlight if we have a query
  return query.trim() ? highlightMatch(truncated, query) : truncated
}

// Reset search when dialog closes
watch(dialogVisible, (isVisible) => {
  if (!isVisible) {
    setTimeout(() => {
      query.value = ''
    }, 300)
  }
})
</script>

<template>
  <div class="flex items-center">
    <!-- 搜索按钮 -->
    <el-button
      :icon="searchIcon"
      round
      class="tracking-wider font-medium shadow-black/8 shadow-sm transition-all duration-300 hover:shadow-black/12 hover:shadow-md hover:scale-105"
      @click="dialogVisible = true"
    >
      Search
    </el-button>
    <!-- 搜索对话框 -->
    <el-dialog v-model="dialogVisible" width="65%">
      <template #header>
        <el-input
          v-model="query"
          placeholder="Enter search query..."
          autofocus
          :prefix-icon="searchIcon"
          class="search-input-custom rounded-lg"
          size="large"
        />
      </template>
      <div class="pr-[calc(var(--el-dialog-padding-primary)+var(--el-message-close-size,_16px))] h-60vh overflow-hidden">
        <div v-if="result.length === 0" class="flex flex-col h-full items-center justify-center">
          <Icon name="carbon:search" class="text-4xl text-gray-400 mb-2" />
          <div class="text-lg text-gray-500 font-light">
            No results found
          </div>
          <div class="text-sm text-gray-400 mt-2">
            Try different keywords or browse all articles
          </div>
        </div>
        <div v-else-if="isSearching" class="py-4 flex items-center justify-center">
          <el-icon class="is-loading mr-2">
            <Icon name="svg-spinners:270-ring" />
          </el-icon>
          <span class="text-gray-500">Searching...</span>
        </div>
        <div v-else-if="debouncedQuery.trim() && result.length > 0" class="text-sm text-gray-500 mb-3 flex items-center">
          <Icon name="carbon:search-located" class="text-primary mr-1" />
          Found {{ result.length }} result{{ result.length > 1 ? 's' : '' }} for "{{ debouncedQuery }}"
        </div>
        <el-scrollbar class="scrollbar-custom">
          <a
            v-for="link of result"
            :key="link.id"
            :href="link.id"
            class="text-inherit no-underline block"
            @click="dialogVisible = false"
          >
            <el-card
              class="mt-3 border-l-3 border-l-transparent rounded-lg flex-col cursor-pointer transition-all duration-300 relative z-1 overflow-hidden hover:border-l-[var(--el-color-primary)] dark:bg-[var(--el-bg-color-overlay)] hover:shadow-black/10 hover:shadow-lg hover:translate-y-[-2px] dark:hover:shadow-black/20"
              shadow="hover"
            >
              <div class="p-4">
                <el-row :gutter="16" class="items-center">
                  <el-col :span="6" class="text-left">
                    <div class="text-primary text-base font-medium" v-html="highlightMatch(link.title, debouncedQuery)" />
                    <div class="text-xs text-gray-400 mt-1 flex items-center">
                      <Icon name="carbon:document" class="mr-1" />
                      <span>Article</span>
                      <div class="mx-2 bg-gray-300 h-3 w-px dark:bg-gray-600" />
                      <Icon name="carbon:star" class="text-yellow-500 mr-1" />
                      <span>Score: {{ Math.round(link.score * 100) / 100 }}</span>
                    </div>
                  </el-col>
                  <el-col :span="18">
                    <div class="text-sm text-gray-700 leading-relaxed dark:text-gray-300" v-html="formatContent(link.content, debouncedQuery)" />
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </a>
        </el-scrollbar>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
// 搜索输入框自定义样式
.search-input-custom {
  :deep(.el-input__wrapper) {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &:hover, &:focus-within {
      box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
    }
  }
}

// 滚动条自定义样式
.scrollbar-custom {
  :deep(.el-scrollbar__bar) {
    opacity: 0.2;

    &:hover {
      opacity: 0.4;
    }
  }
}
</style>

<script setup lang="ts">
import type { Toc, TocLink } from '@nuxt/content'

interface Props {
  toc: Toc
}
interface TreeNode {
  id: string
  label: string
  children?: TreeNode[]
}
const props = defineProps<Props>()

const formattedToc = computed(() => {
  const transform = (items: TocLink[]): TreeNode[] => {
    return items.map((item: TocLink) => {
      const node: TreeNode = {
        id: item.id,
        label: item.text,
      }
      if ('children' in item && Array.isArray(item.children) && item.children.length > 0) {
        node.children = transform(item.children)
      }
      return node
    })
  }

  return transform(props.toc.links)
})

function onNodeClick(data: TreeNode) {
  if (data.id) {
    document.querySelector(`#${data.id}`)?.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div v-if="!$device.isMobile && formattedToc.length !== 0" class="m-r-1 p-4 h-[80vh] w-[9vw] translate-y-30 right-0 top-50 fixed overflow-y-auto">
    <el-scrollbar>
      <el-tree
        :data="formattedToc"
        node-key="id"
        highlight-current
        default-expand-all
        :expand-on-click-node="false"
        :default-expanded-keys="[1]"
        :default-checked-keys="[1]"
        @node-click="onNodeClick"
      />
    </el-scrollbar>
  </div>
</template>

<style lang="scss">
.el-tree-node__expand-icon.expanded {
  display: none;
}
.el-tree-node__label {
 overflow: hidden;
}
</style>

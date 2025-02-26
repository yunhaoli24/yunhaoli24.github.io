<script setup lang="ts">
const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
})

const copyButtonIconName = ref<string>('tabler:copy')
const isCopyButtonActive = ref<boolean>(false)

async function copyButtonHandleClick(): Promise<void> {
  await navigator.clipboard.writeText(props.code)

  copyButtonIconName.value = 'tabler:copy-check'
  isCopyButtonActive.value = true

  setTimeout(() => {
    copyButtonIconName.value = 'tabler:copy'
    isCopyButtonActive.value = false
  }, 2000)
}
const langMap: { [key: string]: string } = {
  python: 'catppuccin:python',
  javascript: 'catppuccin:javascript',
  typescript: 'catppuccin:typescript',
  shell: 'catppuccin:bash',
  java: 'catppuccin:java-alt-2',
  json: 'catppuccin:json',
  c: 'catppuccin:c',
  cpp: 'catppuccin:cpp',
  vue: 'catppuccin:vue',
  dockerfile: 'catppuccin:docker',
  react: 'catppuccin:javascript-react',
  golang: 'catppuccin:go',
}
function getIconName(language: string | null): string {
  if (!language)
    return ''
  return langMap[language.toLowerCase()] || ''
}
</script>

<template>
  <div class="flex flex-col dark:bg-gray-800 light:bg-gray-100">
    <div
      v-if="language || filename"
      class="h-10 flex items-center rounded-t"
    >
      <Icon
        v-if="language"
        :name="getIconName(language)"
        class="ml-3"
      />
      <span
        v-if="filename"
        class="ml-3"
      >
        {{ filename }}
      </span>
      <el-button
        class="ml-auto mr-3 flex gap-1 rounded transition-all"
        @click="copyButtonHandleClick"
      >
        <span v-show="isCopyButtonActive">Copied </span>
        <Icon :name="copyButtonIconName" />
      </el-button>
    </div>
    <pre
      class="overflow-x-auto overflow-x-auto whitespace-pre-wrap break-words rounded-md px-4" :class="[
        $props.class,
        filename || language ? 'rounded-b' : 'rounded',
      ]"
    ><slot />
  </pre>
  </div>
</template>

<template>
  <el-menu
    mode="horizontal"
    :ellipsis="false"
    router
  >
    <el-menu-item index="/">
      Yunhao Li
    </el-menu-item>
    <el-menu-item index="/blog">
      <NuxtLink to="/blog">
        Blog
      </NuxtLink>
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item>
      <el-switch
        v-model="colorMode"
        inline-prompt
        :active-action-icon="DarkModeIcon"
        :inactive-action-icon="LightModeIcon"
        class="dark:[--el-switch-on-color:#272727] light:[--el-switch-off-color:#f0f0f0]"
      />
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { Icon } from '#components'

const DarkModeIcon = h(Icon, { name: 'material-symbols:dark-mode' })
const LightModeIcon = h(Icon, { name: 'material-symbols:light-mode' })

const color = useColorMode()
const colorMode = ref(false)
watch(colorMode, (val) => {
  color.preference = val ? 'dark' : 'light'
})
onMounted(() => {
  const isDark = useDark()
  colorMode.value = isDark.value
})
</script>

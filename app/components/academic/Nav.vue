<script lang="ts" setup>
import { Icon } from '#components'

const DarkModeIcon = h(Icon, { name: 'material-symbols:dark-mode' })
const LightModeIcon = h(Icon, { name: 'material-symbols:light-mode' })

const color = useColorMode()
const colorMode = ref(false)
watch(colorMode, (val) => {
  color.preference = val ? 'dark' : 'light'
})

const route = useRoute()
const searchVisable = computed(() => {
  return route.path.startsWith('/blog')
})
onMounted(() => {
  const isDark = useDark()
  colorMode.value = isDark.value
})
</script>

<template>
  <el-menu
    mode="horizontal"
    :ellipsis="false"
    router
  >
    <el-menu-item index="/">
      Home
    </el-menu-item>
    <el-menu-item index="/blog">
      Blog
    </el-menu-item>
    <div class="flex-grow" />
    <transition
      name="fade"
    >
      <el-menu-item v-show="searchVisable">
        <BlogContentSearch />
      </el-menu-item>
    </transition>
    <el-menu-item>
      <el-switch
        v-model="colorMode"
        inline-prompt
        :active-action-icon="DarkModeIcon"
        :inactive-action-icon="LightModeIcon"
        class="dark:[--el-switch-on-color] light:[--el-switch-off-color]"
      />
    </el-menu-item>
  </el-menu>
</template>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
opacity: 0;
}
</style>

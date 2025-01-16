<!--
 * @Author: li.yunhao
 * @Date: 2024-07-17 17:06:05
 * @LastEditors: li.yunhao li.yunhao@foxmail.com
 * @LastEditTime: 2024-10-13 16:58:38
 * @FilePath: /yunhaoli24.github.io/components/Nav.vue
 * @Description: 
-->
<template>
    <el-menu mode="horizontal" :ellipsis="false">
        <el-menu-item index="0">
            <nuxt-link to="/">
                <el-text size="large">Yunhao Li</el-text>
            </nuxt-link>
        </el-menu-item>
        <template v-if="!isMobile">
            <el-menu-item
                v-for="item in menuItems"
                :key="item.index"
                :index="item.index"
                @click="scrollTo"
                >{{ item.label }}</el-menu-item
            >
        </template>
        <el-sub-menu v-if="isMobile" index="2">
            <template #title>Workspace</template>
            <el-menu-item
                v-for="item in menuItems"
                :key="item.index"
                :index="item.index"
                @click="scrollTo"
                >{{ item.label }}</el-menu-item
            >
        </el-sub-menu>
        <div class="flex-grow" />
        <el-menu-item index="2">
            <el-switch
                v-model="colorMode"
                inline-prompt
                :active-action-icon="DarkModeIcon"
                :inactive-action-icon="LightModeIcon"
                class="dark:[--el-switch-on-color:#272727] light:[--el-switch-off-color:#f0f0f0]"
                size="large"
        /></el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>
import { useDevice } from '~/composables/useDevice'
import { Icon } from '#components'

const DarkModeIcon = h(Icon, { name: 'material-symbols:dark-mode' })
const LightModeIcon = h(Icon, { name: 'material-symbols:light-mode' })

const { isMobile } = useDevice()
const color = useColorMode()
const colorMode = computed({
    get: () => color.value === 'dark',
    set: () => (color.value = color.value === 'dark' ? 'light' : 'dark'),
})
const scrollTo = (index: { index: string }) => {
    const element = document.querySelector(`.${index.index}`)
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
    }
}
const menuItems = ref([
    { index: 'About', label: 'About' },
    { index: 'Education', label: 'Education' },
    { index: 'WorkExp', label: 'Work Experience' },
    { index: 'Publications', label: 'Publications' },
    { index: 'ProgrammingSkills', label: 'Programming Skills' },
    { index: 'Honors', label: 'Honors' },
])
</script>

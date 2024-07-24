<!--
 * @Author: li.yunhao
 * @Date: 2024-07-17 17:06:05
 * @LastEditors: li.yunhao li.yunhao@foxmail.com
 * @LastEditTime: 2024-07-24 11:06:03
 * @FilePath: /yunhaoli24.github.io/components/Nav.vue
 * @Description: 
-->
<template>
  <ClientOnly>
    <el-menu mode="horizontal" :ellipsis="false">
      <el-menu-item index="0">
        <nuxt-link to="/">
          <el-text size="large">Yunhao Li</el-text>
        </nuxt-link>
      </el-menu-item>
      <el-menu-item
        v-for="item in menuItems"
        v-if="!isMobile"
        :key="item.index"
        :index="item.index"
        @click="scrollTo"
        >{{ item.label }}</el-menu-item
      >
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
          :active-action-icon="Moon"
          :inactive-action-icon="Sunny"
          style="--el-switch-on-color: #272727; --el-switch-off-color: #f0f0f0"
          size="large"
        ></el-switch
      ></el-menu-item>
    </el-menu>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { Moon, Sunny } from "@element-plus/icons-vue";
const { width, height } = useWindowSize();
const isMobile = computed(() => width.value < 760);
const color = useColorMode();
const colorMode = computed({
  get: () => color.value === "dark",
  set: () => (color.preference = color.value === "dark" ? "light" : "dark"),
});
const scrollTo = (index: any) => {
  console.log(index.index);
  const element = document.querySelector(`.${index.index}`);
  console.log(element);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
const menuItems = ref([
  { index: "About", label: "About" },
  { index: "Education", label: "Education" },
  { index: "WorkExp", label: "Work Experience" },
  { index: "Publications", label: "Publications" },
  { index: "ProgrammingSkills", label: "Programming Skills" },
  { index: "Honors", label: "Honors" },
]);
</script>

<style></style>

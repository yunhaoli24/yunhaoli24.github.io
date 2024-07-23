<!--
 * @Author: li.yunhao
 * @Date: 2024-07-17 17:06:05
 * @LastEditors: li.yunhao li.yunhao@foxmail.com
 * @LastEditTime: 2024-07-17 17:55:57
 * @FilePath: /lealaxy.github.io/components/Nav.vue
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
      <el-menu-item index="About" @click="scrollTo"> About </el-menu-item>
      <el-menu-item index="Education" @click="scrollTo">
        Education
      </el-menu-item>
      <el-menu-item index="WorkExp" @click="scrollTo">
        Work Experience
      </el-menu-item>
      <el-menu-item index="Publications" @click="scrollTo">
        Publications
      </el-menu-item>
      <el-menu-item index="ProgrammingSkills" @click="scrollTo">
        Programming Skills
      </el-menu-item>
      <el-menu-item index="Honors" @click="scrollTo"> Honors </el-menu-item>
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
</script>

<style></style>

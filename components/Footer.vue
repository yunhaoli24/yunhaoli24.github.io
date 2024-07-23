<!--
 * @Author: li.yunhao
 * @Date: 2024-07-17 17:57:38
 * @LastEditors: li.yunhao li.yunhao@foxmail.com
 * @LastEditTime: 2024-07-17 18:42:14
 * @FilePath: /lealaxy.github.io/components/Footer.vue
 * @Description: 
-->
<template>
  <div>
    <div class="title text-center" style="font-size: xx-large">Yunhao Li</div>
    <br />
    <div class="title text-center"><SocialMediaLinks /></div>
    <div class="text-center text-muted">
      <p>
        &copy; 2021 - {{ currentYear }} Yunhao Li All Rights Reserved.<br />
      </p>
    </div>
  </div>
</template>
<script setup>
const currentYear = computed(() => {
  let now = new Date();
  return now.getFullYear();
});
</script>
<style lang=""></style>

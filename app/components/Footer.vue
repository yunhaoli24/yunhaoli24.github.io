<!--
 * @Author: li.yunhao
 * @Date: 2024-07-17 17:57:38
 * @LastEditors: li.yunhao li.yunhao@foxmail.com
 * @LastEditTime: 2024-07-17 18:42:14
 * @FilePath: /yunhaoli24.github.io/components/Footer.vue
 * @Description: 
-->
<template>
    <div>
        <div class="text-center text-4xl">
            Yunhao Li
        </div>
        <br>
        <div class="text-center">
            <SocialMediaLinks />
        </div>
        <div class="text-center mt-2">
            <p>
                &copy; 2018 - {{ currentYear }} Yunhao Li All Rights
                Reserved.<br>
            </p>
        </div>
    </div>
</template>
<script setup>
const currentYear = computed(() => {
    const now = new Date()
    return now.getFullYear()
})
</script>

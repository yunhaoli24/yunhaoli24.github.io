<script setup lang="ts">
import SocialMediaLinks from './SocialMediaLinks.vue'

const currentYear = computed(() => {
  const now = new Date()
  return now.getFullYear()
})
</script>

<template>
  <div>
    <div class="text-4xl text-center">
      Yunhao Li
    </div>
    <br>
    <div class="text-center">
      <SocialMediaLinks />
    </div>
    <div class="mt-2 text-center">
      <p>
        &copy; 2018 - {{ currentYear }} Yunhao Li All Rights Reserved.<br>
      </p>
    </div>
  </div>
</template>

<template>
  <section id="academic-service" class="space-y-4 rounded-2xl border bg-card/70 p-6 shadow-sm">
    <div class="flex items-center gap-3">
      <span class="text-2xl">🤝</span>
      <h2 class="text-2xl font-bold leading-tight">Academic Service</h2>
    </div>
    <div class="space-y-2">
      <h3 class="text-lg font-semibold leading-tight">Reviewer</h3>
      <ul class="list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground">
        <li v-for="venue in reviewerVenues" :key="venue">{{ venue }}</li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
const reviewerVenues = [
  "Chinese Conference on Pattern Recognition and Computer Vision (PRCV)",
  "International Joint Conference on Neural Networks (IJCNN)",
];
</script>

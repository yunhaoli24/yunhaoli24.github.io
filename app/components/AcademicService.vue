<template>
  <section id="academic-service" class="space-y-4 rounded-2xl border bg-card/70 p-6 shadow-sm">
    <div class="flex items-center gap-3">
      <span class="text-2xl">🤝</span>
      <h2 class="text-2xl font-bold leading-tight">Academic Service</h2>
    </div>
    <div class="space-y-3">
      <Card v-for="service in services" :key="service.venue" class="shadow-none">
        <CardHeader>
          <div class="space-y-1">
            <CardTitle class="text-lg">{{ service.role }}</CardTitle>
            <CardDescription class="text-base text-foreground">
              {{ service.venue }}
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  </section>
</template>

<script setup lang="ts">
type AcademicService = {
  role: string;
  venue: string;
};

const services: AcademicService[] = [
  {
    role: "Reviewer",
    venue: "Chinese Conference on Pattern Recognition and Computer Vision (PRCV)",
  },
  {
    role: "Reviewer",
    venue: "International Joint Conference on Neural Networks (IJCNN)",
  },
];
</script>

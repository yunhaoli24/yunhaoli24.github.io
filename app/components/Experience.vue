<template>
  <section id="experience" class="space-y-4 rounded-2xl border bg-card/70 p-6 shadow-sm">
    <div class="flex items-center gap-3">
      <span class="text-2xl">💼</span>
      <h2 class="text-2xl font-bold leading-tight">Work Experience</h2>
    </div>
    <div class="space-y-4">
      <Card
        v-for="experience in experiences"
        :key="experience.role"
        class="overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md md:grid md:grid-cols-[1fr_220px] md:items-stretch md:gap-6"
      >
        <div class="space-y-4">
          <CardHeader class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle class="text-lg">{{ experience.role }}</CardTitle>
              <CardDescription class="text-base text-foreground">
                {{ experience.organization }}
              </CardDescription>
            </div>
            <Badge variant="secondary">{{ experience.period }}</Badge>
          </CardHeader>
          <CardContent>
            <ul class="list-disc space-y-2 pl-5 text-base leading-relaxed">
              <li v-for="detail in experience.details" :key="detail">{{ detail }}</li>
            </ul>
          </CardContent>
        </div>
        <div class="px-6 pb-6 md:flex md:items-center md:justify-center md:pb-6">
          <AspectRatio :ratio="4 / 3" class="w-full overflow-hidden rounded-lg border bg-muted/60">
            <img :src="experience.image" :alt="experience.organization" class="h-full w-full object-cover" loading="lazy" />
          </AspectRatio>
        </div>
      </Card>
    </div>
  </section>
</template>

<script setup lang="ts">
type Experience = {
  period: string;
  role: string;
  organization: string;
  image: string;
  details: string[];
};

const experiences: Experience[] = [
  {
    period: "2023/10-2024/06",
    role: "ML Researcher & Data Analyst",
    organization: "China Post Bank",
    image: "/imgs/china_post.png",
    details: [
      "Developed AI-driven finance data precision recommendation model for customer marketing.",
      "Designed and implemented a model training engine for automatic rolling training and optimization",
      "Contributed to a 15% increase in performance for China Post Bank GuangZhou.",
    ],
  },
];
</script>

<template>
  <section id="education" class="space-y-4 rounded-2xl border bg-card/70 p-6 shadow-sm">
    <div class="flex items-center gap-3">
      <span class="text-2xl">🎓</span>
      <h2 class="text-2xl font-bold leading-tight">Education</h2>
    </div>
    <div class="space-y-4">
      <Card v-for="education in educationList" :key="education.degree" class="overflow-hidden">
        <CardHeader class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle class="text-lg">{{ education.degree }}</CardTitle>
            <CardDescription class="text-base text-foreground">
              {{ education.school }}
            </CardDescription>
          </div>
          <Badge variant="secondary">{{ education.period }}</Badge>
        </CardHeader>
        <CardContent class="space-y-2 text-base leading-relaxed">
          <p v-if="education.detail">{{ education.detail }}</p>
          <p
            v-if="education.advisor?.name && education.advisor?.url"
            class="text-muted-foreground flex flex-wrap items-center gap-2"
          >
            <span>Advisor:</span>
            <a
              class="text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
              :href="education.advisor.url"
              target="_blank"
              rel="noreferrer"
            >
              {{ education.advisor.name }}
            </a>
            <template v-if="education.honors?.length">
              <span class="text-muted-foreground">·</span>
              <span class="text-sm text-muted-foreground">Honors:</span>
              <span class="flex flex-wrap items-center gap-1">
                <Badge
                  v-for="honor in education.honors"
                  :key="honor"
                  variant="outline"
                  >{{ honor }}</Badge
                >
              </span>
            </template>
          </p>
        </CardContent>
      </Card>
    </div>
  </section>
</template>

<script setup lang="ts">
type Education = {
  period: string;
  degree: string;
  school: string;
  detail?: string;
  honors?: string[];
  advisor?: {
    name: string;
    url: string;
  };
};

const educationList: Education[] = [
  {
    period: "2025-Present",
    degree: "Doctor of Philosophy",
    school: "The Hong Kong Polytechnic University",
    advisor: {
      name: "Harry Qin",
      url: "https://www.polyu.edu.hk/sn/people/academic-staff/prof-harry-qin",
    },
  },
  {
    period: "2022-2025",
    degree: "Master of Artificial Intelligence",
    school: "GuangZhou University",
    honors: ["National Scholarship", "Outstanding School Graduates"],
    advisor: {
      name: "Yan Pang",
      url: "https://pangyan.me/",
    },
  },
  {
    period: "2018-2022",
    degree: "Bachelor in Computer Science",
    school: "Guilin University of Electronic Technology",
  },
];
</script>

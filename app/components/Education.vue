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
          <p v-if="education.focus">{{ education.focus }}</p>
          <p v-if="education.advisor" class="text-muted-foreground">
            Advisor:
            <a class="text-primary underline-offset-2 hover:underline" :href="education.advisor.url" target="_blank"
              rel="noreferrer">
              {{ education.advisor.title ? education.advisor.title + " " : "" }}{{ education.advisor.name }}
            </a>
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
  focus?: string;
  advisor?: {
    name: string;
    url: string;
    title?: string;
  };
};

const educationList = [
  {
    period: "2025-Present",
    degree: "Doctor of Philosophy",
    school: "The Hong Kong Polytechnic University",
    focus: "Medical Image Analysis, Computer Vision, and trustworthy AI systems for clinical imaging.",
    advisor: {
      name: "Harry Qin",
      title: "Prof.",
      url: "https://www.polyu.edu.hk/sn/people/academic-staff/prof-harry-qin",
    },
  },
  {
    period: "2022-2025",
    degree: "Master of Artificial Intelligence",
    school: "GuangZhou University",
    detail: "GPA 3.94/4 (National Scholarship, Outstanding School Graduates), co-authored peer-reviewed work on robust medical imaging models.",
    advisor: {
      name: "Yan Pang",
      title: "Assoc. Prof.",
      url: "https://pangyan.me/",
    },
  },
  {
    period: "2018-2022",
    degree: "Bachelor in Computer Science",
    school: "Guilin University of Electronic Technology",
    detail: "GPA 84/100",
  },
] satisfies Education[];
</script>

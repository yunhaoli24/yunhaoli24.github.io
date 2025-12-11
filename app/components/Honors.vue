<template>
  <section id="honors" class="space-y-4 rounded-2xl border bg-card/70 p-6 shadow-sm">
    <div class="flex items-center gap-3">
      <span class="text-2xl">🏆</span>
      <h2 class="text-2xl font-bold leading-tight">Honors & Awards</h2>
    </div>
    <div class="space-y-4">
      <Card
        v-for="honor in honors"
        :key="honor.title"
        class="overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md md:grid md:grid-cols-[1fr_240px] md:items-stretch md:gap-6"
      >
        <div class="space-y-4">
          <CardHeader class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <CardTitle class="text-lg">{{ honor.title }}</CardTitle>
            <Badge variant="secondary">{{ honor.year }}</Badge>
          </CardHeader>
          <CardContent>
            <ul class="list-disc space-y-2 pl-5 text-base leading-relaxed">
              <li v-for="detail in honor.details" :key="detail">{{ detail }}</li>
            </ul>
          </CardContent>
        </div>
        <div class="px-6 pb-6 md:flex md:items-center md:justify-center md:pb-6">
          <AspectRatio :ratio="4 / 3" class="w-full overflow-hidden rounded-lg border bg-muted/60">
            <img
              :src="honor.image"
              :alt="honor.title"
              class="h-full w-full object-cover"
              loading="lazy"
            />
          </AspectRatio>
        </div>
      </Card>
    </div>
  </section>
</template>

<script setup lang="ts">
type Honor = {
  year: string;
  title: string;
  image: string;
  details: string[];
};

const honors: Honor[] = [
  {
    year: "2023",
    title: "First Prize in the National Guangzhou Pazhou Algorithm Competition",
    image: "/imgs/pazhou.png",
    details: [
      "Lead AI and backend teams develop an Artificial Intelligence Security Assessment platform.",
      "Implemented 20 + adversarial attack, 10 + defense algorithms, integrated image & text classification, object detection models.",
    ],
  },
  {
    year: "2020",
    title: 'Third Prize in the National China Collegiate Computing Contest-AI Track',
    image: "/imgs/cccc.png",
    details: [
      "Developed an Intelligent Construction Site Monitoring System for Helmet Detection and Tracking.",
      "Implemented Helmet Detection and Tracking Pipeline by Vue, FastAPI, and YOLO.",
    ],
  },
  {
    year: "2020",
    title: 'Second Prize in the National 9th "China Software Cup"',
    image: "/imgs/csc.png",
    details: [
      "Developed a Real-Time Vehicle Recognition and Tracking System for Traffic Light Scenarios.",
      "Implemented Traffic Light Visual Processing Pipeline by YOLO, DeepTrack, and Vue, tracking cars and pedestrians.",
    ],
  },
  {
    year: "2020",
    title: "Second Prize in the National Competition at the RoboMaster",
    image: "/imgs/RoboMaster.png",
    details: [
      "Led computer vision algorithm team to build real-time target recognition and tracking system for edge devices.",
      "Co-work with the Mechanical Design and Circuit Design Department to build robots.",
    ],
  },
  {
    year: "2019",
    title: 'Second Prize in the National 9th "China Education Robot Competition"',
    image: "/imgs/ercc.jpg",
    details: [
      "Developed computer vision systems enable robots to recognize and navigate around obstacles and identify specific markers accurately.",
      "Train object detection models that run on edge devices.",
    ],
  },
];
</script>

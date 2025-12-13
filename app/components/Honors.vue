<template>
  <section id="honors" class="space-y-4 rounded-2xl border bg-card/70 p-6 shadow-sm">
    <div class="flex items-center gap-3">
      <span class="text-2xl">🏆</span>
      <h2 class="text-2xl font-bold leading-tight">Honors, Awards & Patents</h2>
    </div>
    <Accordion type="single" collapsible class="w-full rounded-lg border">
      <AccordionItem value="achievements">
        <AccordionTrigger class="px-4 py-2 text-left text-base font-semibold">
          Toggle to expand
        </AccordionTrigger>
        <AccordionContent class="space-y-8 px-4 pb-6">
          <div class="space-y-4">
            <div class="flex items-center gap-2 text-lg font-semibold">
              <span>🏅</span>
              <span>Honors & Awards</span>
            </div>
            <div class="space-y-4">
              <Card
                v-for="honor in honors"
                :key="honor.title"
                class="overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md md:grid md:grid-cols-[1fr_240px] md:items-stretch md:gap-6"
              >
                <div class="space-y-4">
                  <CardHeader
                    class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
                  >
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
                  <AspectRatio
                    :ratio="4 / 3"
                    class="w-full overflow-hidden rounded-lg border bg-muted/60"
                  >
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
          </div>

          <div class="space-y-3">
            <div class="flex items-center gap-2 text-lg font-semibold">
              <span>📜</span>
              <span>Patents</span>
            </div>
            <div class="space-y-3">
              <Card v-for="patent in patents" :key="patent.title" class="shadow-none">
                <CardHeader
                  class="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:justify-between"
                >
                  <div class="space-y-1 flex-1 min-w-0">
                    <CardTitle
                      class="text-base font-semibold leading-snug"
                      >{{ patent.title }}</CardTitle
                    >
                    <CardDescription class="text-base text-foreground leading-relaxed">
                      {{ patent.authors }}
                    </CardDescription>
                  </div>
                  <div class="flex items-center gap-2 whitespace-nowrap">
                    <Badge variant="secondary">{{ patent.year }}</Badge>
                    <Button
                      v-for="link in patent.links"
                      :key="link.href"
                      variant="outline"
                      size="sm"
                      as-child
                    >
                      <a :href="link.href" target="_blank" rel="noreferrer">View</a>
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </section>
</template>

<script setup lang="ts">
type Honor = {
  year: string;
  title: string;
  image: string;
  details: string[];
};

type Patent = {
  year: string;
  title: string;
  authors: string;
  links: { label: string; href: string }[];
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

const patents: Patent[] = [
  {
    year: "2024",
    title: "A medical image segmentation method, device, and medium",
    authors: "Yunhao Li , Jiaming Liang, Junming Yan, Yan Pang, Changyu Dong, Teng Huang, Zheng Zhang.",
    links: [{ label: "Patent", href: "https://patents.google.com/patent/CN118552553A" }],
  },
  {
    year: "2024",
    title: "Method, device, apparatus, and medium for rapid segmentation of breast lesion features in medical video",
    authors: "JiamingLiang, Yan Pang, Teng Hunag, Ziyu Ding, Zhenyu Lu, Yunhao Li , Weiqing Kong, Wang Yang.",
    links: [{ label: "Patent", href: "https://patents.google.com/patent/CN118537769A" }],
  },
  {
    year: "2024",
    title: "Self-distilling and self-learning medical image segmentation method, device, and storage medium",
    authors: "Yan Pang, Changyu Dong, Teng Huang, Yunhao Li , Jiahui Huang, Hui Li, Caiyan Tang.",
    links: [{ label: "Patent", href: "https://patents.google.com/patent/CN118587232A" }],
  },
  {
    year: "2022",
    title: "A Deep Learning-Based Method and System for Satellite Anomaly Traffic Detection",
    authors: "HongYang Yan, Cong Wang, Yunhao Li , Weichuan Mo, Cong Li, Haiyang Wang, Yu Wang, Teng Huang",
    links: [{ label: "Patent", href: "https://patents.google.com/patent/CN115834145A" }],
  },
  {
    year: "2022",
    title: "A Network Security-Based Low Earth OrbitSatellite Simulation System",
    authors: "HongYang Yan, Bo Li, Cong Li, Haiyang Wang, Yunhao Li , Weichuan Mo, Yu Wang, Teng Huang",
    links: [{ label: "Patent", href: "https://patents.google.com/patent/CN115765842A" }],
  },
  {
    year: "2021",
    title: "A Panoptic Segmentation Method Based on Multi-Scale Edge Attention",
    authors: "Xiaochun Lei, Zhiying Liang, Zetao Jiang, Dingjie Zhang, Yunhao Li , Xiaolong Wang, Huiying Chen",
    links: [{ label: "Patent", href: "https://patents.google.com/patent/CN112802038A" }],
  },
  {
    year: "2020",
    title: "Intelligent Traffic Signal System",
    authors: "Yunhao Li , Xiaochun Lei, Dingjie Zhang, Ziyuan Jing, Zhiying Liang, Yunyan Chen, Xiaolong Wang",
    links: [{ label: "Patent", href: "https://patents.google.com/patent/CN213276964U" }],
  },
  {
    year: "2020",
    title: "A Panoramic Segmentation Method Based on Edge Scaling Correction",
    authors: "Xiaochun Lei, Dingjie Zhang, Zetao Jiang, Yunhao Li , Yunyan Chen, Zhiying Liang, Huiying Chen",
    links: [{ label: "Patent", href: "https://patents.google.com/patent/CN112489064B" }],
  },
];
</script>

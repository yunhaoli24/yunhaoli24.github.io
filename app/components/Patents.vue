<template>
  <section id="patents" class="space-y-4 rounded-2xl border bg-card/70 p-6 shadow-sm">
    <div class="flex items-center gap-3">
      <span class="text-2xl">📜</span>
      <h2 class="text-2xl font-bold leading-tight">Patent</h2>
    </div>
    <Accordion type="single" collapsible class="w-full rounded-lg border">
      <AccordionItem value="patents">
        <AccordionTrigger class="px-4 py-2 text-left text-base font-semibold">
          Toggle to expand
        </AccordionTrigger>
        <AccordionContent class="space-y-3 px-4 pb-4">
          <Card v-for="patent in patents" :key="patent.title" class="shadow-none">
            <CardHeader class="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
              <div class="space-y-1">
                <CardTitle class="text-base font-semibold">{{ patent.title }}</CardTitle>
                <CardDescription class="text-base text-foreground"
                  >{{ patent.authors }}
                </CardDescription>
              </div>
              <Badge variant="secondary">{{ patent.year }}</Badge>
            </CardHeader>
            <CardContent class="flex flex-wrap gap-2">
              <Button
                v-for="link in patent.links"
                :key="link.href"
                variant="outline"
                size="sm"
                as-child
              >
                <a :href="link.href" target="_blank" rel="noreferrer">View</a>
              </Button>
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </section>
</template>

<script setup lang="ts">
const patents = [
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

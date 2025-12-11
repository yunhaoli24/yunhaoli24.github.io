<template>
  <section id="publications" class="space-y-4 rounded-2xl border bg-card/70 p-6 shadow-sm">
    <div class="flex items-center gap-3">
      <span class="text-2xl">📚</span>
      <h2 class="text-2xl font-bold leading-tight">Publications</h2>
    </div>
    <div class="space-y-4">
      <Card
        v-for="publication in publications"
        :key="publication.title"
        class="overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md md:grid md:grid-cols-8 md:items-stretch md:gap-6"
      >
        <div class="space-y-6 md:col-span-5">
          <CardHeader class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <Badge variant="secondary">{{ publication.year }}</Badge>
                <Badge variant="outline">{{ publication.venueShort }}</Badge>
              </div>
              <CardTitle class="text-xl leading-tight">
                {{ publication.title }}
              </CardTitle>
              <CardDescription class="text-base text-foreground">
                {{ publication.authors }}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent class="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" class="text-sm font-medium">{{ publication.venue }}</Badge>
            <Button
              v-for="resource in publication.links"
              :key="resource.href"
              variant="outline"
              size="sm"
              as-child
            >
              <a :href="resource.href" target="_blank" rel="noreferrer">{{ resource.label }}</a>
            </Button>
          </CardContent>
        </div>
        <div class="px-6 pb-6 md:col-span-3 md:flex md:items-center md:justify-center md:pb-6">
          <AspectRatio
            :ratio="16 / 9"
            class="w-full max-w-[360px] overflow-hidden rounded-lg border bg-muted/60 md:max-w-none"
          >
            <img
              :src="publication.image"
              :alt="publication.title"
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
type PublicationLink = {
  label: string;
  href: string;
};

type Publication = {
  year: string;
  title: string;
  authors: string;
  venue: string;
  venueShort: string;
  links: PublicationLink[];
  image: string;
};

const publications: Publication[] = [
  {
    year: "2025",
    title: "SegTom: A 3D Volumetric Medical Image Segmentation Framework for Thoracoabdominal Multi-Organ Anatomical Structures",
    authors: "Yan Pang, Yunhao Li , Jiaming Liang, Hao Chen, Ying Hu, Qiong Wang.",
    venue: "Journal of Biomedical and Health Informatics",
    venueShort: "JBHI",
    image: "/imgs/segtom.png",
    links: [
      { label: "Paper", href: "https://ieeexplore.ieee.org/document/11151753" },
      { label: "Code", href: "https://github.com/deepang-ai/SegTom" },
    ],
  },
  {
    year: "2025",
    title: "Efficient Breast Lesion Segmentation from Ultrasound Videos Across Multiple Source-limited Platforms",
    authors: "Yan Pang, Yunhao Li , Teng Huang, Jiaming Liang, Ziyu Ding, Hao Chen, Baoliang Zhao, Ying Hu, Zheng Zhang, Qiong Wang.",
    venue: "Journal of Biomedical and Health Informatics",
    venueShort: "JBHI",
    image: "/imgs/bas.png",
    links: [
      { label: "Paper", href: "https://ieeexplore.ieee.org/document/10892059" },
      { label: "Code", href: "https://github.com/deepang-ai/BaS" },
    ],
  },
  {
    year: "2025",
    title: "Online Self-distillation and Self-modeling for 3D Brain Tumor Segmentation",
    authors: "Yan Pang, Yunhao Li , Teng Huang, Jiaming Liang, Zhen Wang, Changyu Dong, Dongyang Kuang, Ying Hu, Hao Chen, Tim Lei, Qiong Wang.",
    venue: "Journal of Biomedical and Health Informatics",
    venueShort: "JBHI",
    image: "/imgs/MOD.png",
    links: [
      { label: "Paper", href: "https://ieeexplore.ieee.org/document/10843341" },
      { label: "Code", href: "https://github.com/deepang-ai/MOD" },
    ],
  },
  {
    year: "2024",
    title: "Optimized Breast Lesion Segmentation in Ultrasound Videos Across Varied Resource-Scant Environments",
    authors: "Yunhao Li , Chen Zibin, Yan Junming, Ding Ziyu, Li Jie ,Pei Xiaoqing, Zhang Zheng, Qiong Wang, Yan Pang.",
    venue: "Asian Conference on Computer Vision",
    venueShort: "ACCV",
    image: "/imgs/RbS.png",
    links: [{ label: "Paper", href: "https://openaccess.thecvf.com/content/ACCV2024/papers/Li_Optimized_Breast_Lesion_Segmentation_in_Ultrasound_Videos_Across_Varied_Resource-Scant_ACCV_2024_paper.pdf" }],
  },
  {
    year: "2024",
    title: "IPM: An Intelligent Component for 3D Brain Tumor Segmentation Integrating Semantic Extractor and Pixel Refiner",
    authors: "Yunhao Li , Caiyan Tan, Mingdu Zhang, Xi Zhang, Teng Huang ,Xiao-Qing Pei, Yan Pang.",
    venue: "Chinese Conference on Pattern Recognition and Computer Vision",
    venueShort: "PRCV",
    image: "/imgs/IPM.png",
    links: [{ label: "Paper", href: "https://link.springer.com/chapter/10.1007/978-981-97-8499-8_16" }],
  },
  {
    year: "2023",
    title: "Slim UNETR: Scale hybrid transformers to efficient 3D medical image segmentation under limited computational resources",
    authors: "Yan Pang, Jiaming Liang, Teng Huang, Hao Chen, Yunhao Li , Dan Li, Lin Huang, Qiong Wang.",
    venue: "IEEE Transactions on Medical Imaging",
    venueShort: "TMI",
    image: "/imgs/SlimUNETR.png",
    links: [
      { label: "Paper", href: "https://ieeexplore.ieee.org/abstract/document/10288609/" },
      { label: "Code", href: "https://github.com/deepang-ai/Slim-UNETR" },
    ],
  },
  {
    year: "2023",
    title: "CAM-PC: A novel method for camouflaging point clouds to counter adversarial deception in remote sensing",
    authors: "Bo Wei, Teng Huang, Xi Zhang, Jiaming Liang, Yunhao Li , Cong Cao, Dan Li, Yongfeng Chen, Huagang Xiong, Feng Jiang, Xiqiu Zhang.",
    venue: "IEEE Journal of Selected Topics in Applied Earth Observations and Remote Sensing",
    venueShort: "IEEE J-STARS",
    image: "/imgs/Cam-PC.png",
    links: [{ label: "Paper", href: "https://ieeexplore.ieee.org/abstract/document/10285331/" }],
  },
  {
    year: "2023",
    title: "AgileNet: A Rapid and Efficient Breast Lesion Segmentation Method for Medical Image Analysis",
    authors: "Jiaming Liang, Teng Huang, Dan Li, Ziyu Ding, Yunhao Li , Lin Huang, Qiong Wang, Xi Zhang.",
    venue: "Chinese Conference on Pattern Recognition and Computer Vision",
    venueShort: "PRCV",
    image: "/imgs/AgileNet.png",
    links: [{ label: "Paper", href: "https://link.springer.com/chapter/10.1007/978-981-99-8469-5_33" }],
  },
];
</script>

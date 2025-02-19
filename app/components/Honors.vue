<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      🏆 Honors & Awards
    </h1>
    <el-timeline class="space-y-4">
      <el-timeline-item
        v-for="(honor, index) in honors"
        :key="index"
        :timestamp="honor.timestamp"
        placement="top"
      >
        <el-card>
          <template #header>
            <el-space>
              <el-avatar
                :src="honor.image"
                shape="square"
                size="large"
                fit="fill"
              />
              <div class="text-xl">
                {{ honor.title }}
              </div>
            </el-space>
          </template>
          <MDC
            class="text-base"
            :value="honor.content"
          />
        </el-card>
      </el-timeline-item>
    </el-timeline>

    <h1 class="text-2xl font-bold mb-4">
      📜 Patent
    </h1>

    <el-collapse accordion>
      <el-collapse-item
        :title="patentCollapseTitle"
        name="1"
        @click="patentHide = !patentHide"
      >
        <ul class="list-disc text-base">
          <li
            v-for="(patent, index) in patents"
            :key="index"
          >
            {{ patent.timestamp }}, {{ patent.title }}
            <NuxtLink
              :to="'https://patents.google.com/patent/' + patent.id"
              target="_blank"
              class="link-primary"
              title="PDF"
            >
              <el-icon
                color="#409efc"
                class="no-inherit"
                :size="20"
              >
                <Icon name="lsicon:file-pdf-outline" />
              </el-icon>
            </NuxtLink>
            <MDC :value="patent.author" />
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
const honors = [
  {
    image: '/imgs/pazhou.png',
    title: 'First Prize in the National Guangzhou Pazhou Algorithm Competition',
    content:
      '* Lead AI and backend teams develop an Artificial Intelligence Security Assessment platform.\n* Implemented 20 + adversarial attack, 10 + defense algorithms, integrated image & text classification, object detection models.',
    timestamp: '2023',
  },
  {
    image: 'imgs/cccc.png',
    title:
      'Third Prize in the National China Collegiate Computing Contest-AI Track',
    content: '* Developed an Intelligent Construction Site Monitoring System for Helmet Detection and Tracking.\n* Implemented Helmet Detection and Tracking Pipeline by Vue, FastAPI, and YOLO.',
    timestamp: '2020',
  },
  {
    image: 'imgs/csc.png',
    title: 'Second Prize in the National 9th "China Software Cup"',
    content: '* Developed a Real-Time Vehicle Recognition and Tracking System for Traffic Light Scenarios.\n* Implemented Traffic Light Visual Processing Pipeline by YOLO, DeepTrack, and Vue, tracking cars and pedestrians.',
    timestamp: '2020',
  },
  {
    image: '/imgs/RoboMaster.png',
    title: 'Second Prize in the National Competition at the RoboMaster',
    content: '* Led computer vision algorithm team to build real-time target recognition and tracking system for edge devices.\n* Co-work with the Mechanical Design and Circuit Design Department to build robots.',
    timestamp: '2020',
  },
  {
    image: '/imgs/ercc.jpg',
    title:
      'Second Prize in the National 9th "China Education Robot Competition"',
    content: '* Developed computer vision systems enable robots to recognize and navigate around obstacles and identify specific markers accurately.\n* Train object detection models that run on edge devices.',
    timestamp: '2019',
  },
]
const patents = [
  {
    title: 'A medical image segmentation method, device, and medium',
    author:
      '**Yunhao Li**, Jiaming Liang, Junming Yan, Yan Pang, Changyu Dong, Teng Huang, Zheng Zhang.',
    id: 'CN118552553A',
    timestamp: '2024',
  },
  {
    title:
      'Method, device, apparatus, and medium for rapid segmentation of breast lesion features in medical video',
    author:
      'JiamingLiang, Yan Pang, Teng Hunag, Ziyu Ding, Zhenyu Lu, **Yunhao Li**, Weiqing Kong, Wang Yang.',
    id: 'CN118537769A',
    timestamp: '2024',
  },
  {
    title:
      'Self-distilling and self-learning medical image segmentation method, device, and storage medium',
    author:
      'Yan Pang, Changyu Dong, Teng Huang, **Yunhao Li**, Jiahui Huang, Hui Li, Caiyan Tang.',
    id: 'CN118587232A',
    timestamp: '2024',
  },
  {
    title:
      'A Deep Learning-Based Method and System for Satellite Anomaly Traffic Detection',
    author:
      'HongYang Yan, Cong Wang, **Yunhao Li**, Weichuan Mo, Cong Li, Haiyang Wang, Yu Wang, Teng Huang',
    id: 'CN115834145A',
    timestamp: '2022',
  },
  {
    title:
      'A Network Security-Based Low Earth OrbitSatellite Simulation System',
    author:
      'HongYang Yan, Bo Li, Cong Li, Haiyang Wang, **Yunhao Li**, Weichuan Mo, Yu Wang, Teng Huang',
    id: 'CN115765842A',
    timestamp: '2022',
  },
  {
    title: 'A Panoptic Segmentation Method Based on Multi-Scale Edge Attention',
    author:
      'Xiaochun Lei, Zhiying Liang, Zetao Jiang, Dingjie Zhang,**Yunhao Li**, Xiaolong Wang, Huiying Chen',
    id: 'CN112802038A',
    timestamp: '2021',
  },
  {
    title: 'Intelligent Traffic Signal System',
    author:
      '**Yunhao Li**, Xiaochun Lei, Dingjie Zhang, Ziyuan Jing, Zhiying Liang, Yunyan Chen, Xiaolong Wang',
    id: 'CN213276964U',
    timestamp: '2020',
  },
  {
    title: 'A Panoramic Segmentation Method Based on Edge Scaling Correction',
    author:
      'Xiaochun Lei, Dingjie Zhang, Zetao Jiang, **Yunhao Li**, Yunyan Chen, Zhiying Liang, Huiying Chen',
    id: 'CN112489064B',
    timestamp: '2020',
  },
]

const patentHide = ref(false)
const patentCollapseTitle = computed(() => {
  return patentHide.value === false ? 'Toggle to expand' : 'Toggle to hied'
})
</script>

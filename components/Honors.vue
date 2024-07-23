<template>
  <div>
    <h1>Honors & Awards</h1>
    <el-timeline>
      <el-timeline-item
        v-for="(honor, index) in honors"
        :key="index"
        :timestamp="honor.timestamp"
        placement="top"
      >
        <el-card>
          <template #header>
            <div class="card-header">
              <el-row :gutter="20">
                <el-col :span="3">
                  <el-image :src="honor.image" fit="fill" />
                </el-col>
                <el-col
                  :span="21"
                  :style="`font-size: var(--el-font-size-extra-large)`"
                  style="display: flex; align-items: center"
                >
                  {{ honor.title }}
                </el-col>
              </el-row>
            </div>
          </template>
          <span v-html="marked(honor.content)" class="markdown_inline" />
        </el-card>
      </el-timeline-item>
    </el-timeline>

    <h1>Patent</h1>
    <el-collapse accordion>
      <el-collapse-item
        :title="patentCollapseTitle"
        name="1"
        @click="patentHide = !patentHide"
      >
        <el-timeline>
          <el-timeline-item
            v-for="(patent, index) in patents"
            :key="index"
            :timestamp="patent.timestamp"
            placement="top"
          >
            <el-card>
              <span
                v-html="marked(patent.title)"
                class="markdown_inline"
                :style="`font-size: var(--el-font-size-large)`"
              /><br />
              <span
                v-html="marked(patent.author)"
                class="markdown_inline"
              /><br />
              <el-space>
                <el-tag type="info">{{ patent.id }}</el-tag>
                <a
                  :href="patent.link"
                  target="_blank"
                  class="link-primary"
                  title="PDF"
                >
                  <font-awesome-icon icon="file-pdf" />
                </a>
              </el-space>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script setup>
import { marked } from "marked";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const honors = [
  {
    image:
      "https://www.aicompetition-pz.com/public/assets/front/images/logo.png",
    title: "First Prize in the National Guangzhou Pazhou Algorithm Competition",
    content:
      "* Lead AI and backend teams develop an Artificial Intelligence Security Assessment platform.\n" +
      "* Implemented 20+ adversarial attack, 10+ defense algorithms, integrated image & text classification, object detection models",
    timestamp: "2023",
  },
  {
    image:
      "http://www.sei.ynu.edu.cn/__local/5/CC/29/6781F17FF0F4DE1B7AA2957F8DB_90C2160E_48633.png",
    title:
      "Third Prize in the National China Collegiate Computing Contest-AI Track",
    content:
      "* Developed an Intelligent Construction Site Monitoring System for Helmet Detection and Tracking.\n" +
      "* Implemented Helmet Detection and Tracking Pipeline by Vue, FastAPI, and YOLO.",
    timestamp: "2020",
  },
  {
    image: "https://www.cnsoftbei.com/statics/images/images/logo.png",
    title: 'Second Prize in the National 9th "China Software Cup"',
    content:
      "* Developed a Real-Time Vehicle Recognition and Tracking System for Traffic Light Scenarios.\n" +
      "* Implemented Traffic Light Visual Processing Pipeline by YOLO, DeepTrack, and Vue, tracking cars and pedestrians.",
    timestamp: "2020",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/en/7/70/RoboMaster-official-logo.png",
    title: "Second Prize in the National Competition at the RoboMaster",
    content:
      "* Led computer vision algorithm team to build real-time target recognition and tracking system for edge devices.\n" +
      "* Co-work with the Mechanical Design and Circuit Design Department to build robots.",
    timestamp: "2020",
  },
  {
    image: "http://www.ercc.org.cn/skin/default/picture/aboutus-wap.jpg",
    title:
      'Second Prize in the National 9th "China Education Robot Competition"',
    content:
      "* Developed computer vision systems enable robots to recognize and navigate around obstacles and identify specific markers accurately.\n" +
      "* Train object detection models that run on edge devices.",
    timestamp: "2019",
  },
];
const patents = [
  {
    title:
      "A Deep Learning-Based Method and System for Satellite Anomaly Traffic Detection",
    author:
      "HongYang Yan, Cong Wang, **Yunhao Li**, Weichuan Mo, Cong Li, Haiyang Wang, Yu Wang, Teng Huang.",
    id: "CN115834145A",
    link: "https://patentimages.storage.googleapis.com/98/c3/1f/910356c3eff57a/CN115834145A.pdf",
    timestamp: "2022",
  },
  {
    title:
      "A Network Security-Based Low Earth OrbitSatellite Simulation System",
    author:
      "HongYang Yan, Bo Li, Cong Li, Haiyang Wang, **Yunhao Li**, Weichuan Mo, Yu Wang, Teng Huang.",
    id: "CN115765842A",
    link: "https://patentimages.storage.googleapis.com/36/18/a4/23b903a0b4a89b/CN115765842A.pdf",
    timestamp: "2022",
  },
  {
    title: "A Panoptic Segmentation Method Based on Multi-Scale Edge Attention",
    author:
      "Xiaochun Lei, Zhiying Liang, Zetao Jiang, Dingjie Zhang,**Yunhao Li**, Xiaolong Wang, Huiying Chen.",
    id: "CN112802038A",
    link: "https://patentimages.storage.googleapis.com/43/6c/31/1f4077da273fee/CN112802038A.pdf",
    timestamp: "2021",
  },
  {
    title: "Intelligent Traffic Signal System",
    author:
      "**Yunhao Li**, Xiaochun Lei, Dingjie Zhang, Ziyuan Jing, Zhiying Liang, Yunyan Chen, Xiaolong Wang.",
    id: "CN213276964U",
    link: "https://patentimages.storage.googleapis.com/0a/8b/e8/c881715f1c2ad5/CN213276964U.pdf",
    timestamp: "2020",
  },
  {
    title: "A Panoramic Segmentation Method Based on Edge Scaling Correction",
    author:
      "Xiaochun Lei, Dingjie Zhang, Zetao Jiang, **Yunhao Li**, Yunyan Chen, Zhiying Liang, Huiying Chen.",
    id: "CN112489064B",
    link: "https://patentimages.storage.googleapis.com/ac/a9/56/73c4985571c517/CN112489064B.pdf",
    timestamp: "2020",
  },
];

const patentHide = ref(false);
const patentCollapseTitle = computed(() => {
  return patentHide.value === false ? "Toggle to expand" : "Toggle to hied";
});
</script>
<style lang=""></style>

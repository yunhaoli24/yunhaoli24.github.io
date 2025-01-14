<template>
    <div>
        <div class="text-4xl mb-8">Honors & Awards</div>
        <el-timeline>
            <el-timeline-item v-for="(honor, index) in honors" :key="index" :timestamp="honor.timestamp"
                placement="top">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <el-row :gutter="20">
                                <el-col :span="3">
                                    <el-image :src="honor.image" fit="fill" />
                                </el-col>
                                <el-col :span="21" class="text-xl flex items-center">
                                    {{ honor.title }}
                                </el-col>
                            </el-row>
                        </div>
                    </template>
                    <span class="markdown_inline" v-html="marked(honor.content)" />
                </el-card>
            </el-timeline-item>
        </el-timeline>

        <h1>Patent</h1>
        <el-collapse accordion>
            <el-collapse-item :title="patentCollapseTitle" name="1" @click="patentHide = !patentHide">
                <el-timeline>
                    <el-timeline-item v-for="(patent, index) in patents" :key="index" :timestamp="patent.timestamp"
                        placement="top">
                        <el-card>
                            <span class="markdown_inline text-lg" v-html="marked(patent.title)" />
                            <span class="markdown_inline" v-html="marked(patent.author)" />
                            <el-space>
                                <el-tag type="info">{{ patent.id }}</el-tag>
                                <a :href="patent.link" target="_blank" class="link-primary" title="PDF">
                                    <Icon name="lsicon:file-pdf-outline" />
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
import { marked } from 'marked'

const honors = [
    {
        image: '/imgs/pazhou.png',
        title: 'First Prize in the National Guangzhou Pazhou Algorithm Competition',
        content:
            '* Lead AI and backend teams develop an Artificial Intelligence Security Assessment platform.\n' +
            '* Implemented 20+ adversarial attack, 10+ defense algorithms, integrated image & text classification, object detection models',
        timestamp: '2023',
    },
    {
        image: 'imgs/cccc.png',
        title: 'Third Prize in the National China Collegiate Computing Contest-AI Track',
        content:
            '* Developed an Intelligent Construction Site Monitoring System for Helmet Detection and Tracking.\n' +
            '* Implemented Helmet Detection and Tracking Pipeline by Vue, FastAPI, and YOLO.',
        timestamp: '2020',
    },
    {
        image: 'imgs/csc.png',
        title: 'Second Prize in the National 9th "China Software Cup"',
        content:
            '* Developed a Real-Time Vehicle Recognition and Tracking System for Traffic Light Scenarios.\n' +
            '* Implemented Traffic Light Visual Processing Pipeline by YOLO, DeepTrack, and Vue, tracking cars and pedestrians.',
        timestamp: '2020',
    },
    {
        image: '/imgs/RoboMaster.png',
        title: 'Second Prize in the National Competition at the RoboMaster',
        content:
            '* Led computer vision algorithm team to build real-time target recognition and tracking system for edge devices.\n' +
            '* Co-work with the Mechanical Design and Circuit Design Department to build robots.',
        timestamp: '2020',
    },
    {
        image: '/imgs/ercc.jpg',
        title: 'Second Prize in the National 9th "China Education Robot Competition"',
        content:
            '* Developed computer vision systems enable robots to recognize and navigate around obstacles and identify specific markers accurately.\n' +
            '* Train object detection models that run on edge devices.',
        timestamp: '2019',
    },
]
const patents = [
    {
        title: 'A medical image segmentation method, device, and medium.',
        author: '**Yunhao Li**, Jiaming Liang, Junming Yan, Yan Pang, Changyu Dong, Teng Huang, Zheng Zhang.',
        id: 'CN118552553A',
        link: 'https://patentimages.storage.googleapis.com/ec/61/c8/623098bbaf4de0/CN118552553A.pdf',
        timestamp: '2024',
    },
    {
        title: 'Method, device, apparatus, and medium for rapid segmentation of breast lesion features in medical video.',
        author: 'JiamingLiang, Yan Pang, Teng Hunag, Ziyu Ding, Zhenyu Lu, **Yunhao Li**, Weiqing Kong, Wang Yang.',
        id: 'CN118537769A',
        link: 'https://patentimages.storage.googleapis.com/bc/72/15/a9fd6a41855a72/CN118537769A.pdf',
        timestamp: '2024',
    },
    {
        title: 'Self-distilling and self-learning medical image segmentation method, device, and storage medium',
        author: 'Yan Pang, Changyu Dong, Teng Huang, **Yunhao Li**, Jiahui Huang, Hui Li, Caiyan Tang.',
        id: 'CN118587232A',
        link: 'https://patentimages.storage.googleapis.com/5b/b4/7d/3cfcf7dc071b3c/CN118587232A.pdf',
        timestamp: '2024',
    },
    {
        title: 'A Deep Learning-Based Method and System for Satellite Anomaly Traffic Detection',
        author: 'HongYang Yan, Cong Wang, **Yunhao Li**, Weichuan Mo, Cong Li, Haiyang Wang, Yu Wang, Teng Huang.',
        id: 'CN115834145A',
        link: 'https://patentimages.storage.googleapis.com/98/c3/1f/910356c3eff57a/CN115834145A.pdf',
        timestamp: '2022',
    },
    {
        title: 'A Network Security-Based Low Earth OrbitSatellite Simulation System',
        author: 'HongYang Yan, Bo Li, Cong Li, Haiyang Wang, **Yunhao Li**, Weichuan Mo, Yu Wang, Teng Huang.',
        id: 'CN115765842A',
        link: 'https://patentimages.storage.googleapis.com/36/18/a4/23b903a0b4a89b/CN115765842A.pdf',
        timestamp: '2022',
    },
    {
        title: 'A Panoptic Segmentation Method Based on Multi-Scale Edge Attention',
        author: 'Xiaochun Lei, Zhiying Liang, Zetao Jiang, Dingjie Zhang,**Yunhao Li**, Xiaolong Wang, Huiying Chen.',
        id: 'CN112802038A',
        link: 'https://patentimages.storage.googleapis.com/43/6c/31/1f4077da273fee/CN112802038A.pdf',
        timestamp: '2021',
    },
    {
        title: 'Intelligent Traffic Signal System',
        author: '**Yunhao Li**, Xiaochun Lei, Dingjie Zhang, Ziyuan Jing, Zhiying Liang, Yunyan Chen, Xiaolong Wang.',
        id: 'CN213276964U',
        link: 'https://patentimages.storage.googleapis.com/0a/8b/e8/c881715f1c2ad5/CN213276964U.pdf',
        timestamp: '2020',
    },
    {
        title: 'A Panoramic Segmentation Method Based on Edge Scaling Correction',
        author: 'Xiaochun Lei, Dingjie Zhang, Zetao Jiang, **Yunhao Li**, Yunyan Chen, Zhiying Liang, Huiying Chen.',
        id: 'CN112489064B',
        link: 'https://patentimages.storage.googleapis.com/ac/a9/56/73c4985571c517/CN112489064B.pdf',
        timestamp: '2020',
    },
]

const patentHide = ref(false)
const patentCollapseTitle = computed(() => {
    return patentHide.value === false ? 'Toggle to expand' : 'Toggle to hied'
})
</script>

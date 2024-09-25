<template>
    <div id="Publications">
        <h2>Publications</h2>
        <el-timeline>
            <el-timeline-item
                v-for="(publication, index) in publications"
                :key="index"
                :timestamp="publication.timestamp"
                placement="top"
            >
                <el-card>
                    <span
                        v-html="marked(publication.title)"
                        :style="`font-size: var(--el-font-size-large)`"
                    />
                    <span v-html="marked(publication.author)" />
                    <span v-html="marked(publication.journal_name)" />
                    <el-space>
                        <a
                            :href="publication.pdf_link"
                            target="_blank"
                            v-if="publication.pdf_link"
                        >
                            <font-awesome-icon icon="file-pdf" />
                        </a>
                        <a
                            :href="publication.code_link"
                            target="_blank"
                            v-if="publication.code_link"
                        >
                        <font-awesome-icon icon="fa-brands fa-github" />
                        </a>
                        <el-tag v-if="publication.journal">
                            {{ publication.journal }}
                        </el-tag>
                        <el-tag v-if="publication.ccf" type="success">
                            {{ publication.ccf }}
                        </el-tag>
                        <el-tag v-if="publication.IF" type="info">
                            IF:{{ publication.IF }}
                        </el-tag>
                    </el-space>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>
<script setup lang="ts">
import { marked } from 'marked'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const publications = [
    {
        title: 'Optimized Breast Lesion Segmentation in Ultrasound Videos Across Varied Resource-Scant Environments',
        author: '**Yunhao Li**, Chen Zibin, Yan Junming, Ding Ziyu, Li Jie ,Pei Xiaoqing, Zhang Zheng, Qiong Wang, Yan Pang.',
        journal_name: 'Asian Conference on Computer Vision',
        // pdf_link: "https://ieeexplore.ieee.org/abstract/document/10288609/",
        // code_link: "https://github.com/aigzhusmart/Slim-UNETR",
        // IF: "10.4",
        // journal: 'ACCV',
        // ccf: 'CCF-C',
        timestamp: '2024',
    },
    {
        title: 'IPM: An Intelligent Component for 3D Brain Tumor Segmentation Integrating Semantic Extractor and Pixel Refiner',
        author: '**Yunhao Li**, Caiyan Tan, Mingdu Zhang, Xi Zhang, Teng Huang ,Xiao-Qing Pei, Yan Pang.',
        journal_name: 'Chinese Conference on Pattern Recognition and Computer Vision',
        // pdf_link: "https://ieeexplore.ieee.org/abstract/document/10288609/",
        // code_link: "https://github.com/aigzhusmart/Slim-UNETR",
        // IF: "10.4",
        // journal: 'PRCV',
        // ccf: 'CCF-C',
        timestamp: '2024',
    },
    {
        title: 'Slim UNETR: Scale hybrid transformers to efficient 3D medical image segmentation under limited computational resources',
        author: 'Yan Pang, Jiaming Liang, Teng Huang, Hao Chen, **Yunhao Li**, Dan Li, Lin Huang, Qiong Wang.',
        journal_name: 'IEEE Transactions on Medical Imaging',
        pdf_link: 'https://ieeexplore.ieee.org/abstract/document/10288609/',
        code_link: 'https://github.com/aigzhusmart/Slim-UNETR',
        // IF: '10.4',
        // journal: 'TMI',
        // ccf: 'CCF-A',
        timestamp: '2023',
    },
    {
        title: 'CAM-PC: A novel method for camouflaging point clouds to counter adversarial deception in remote sensing',
        author: 'Bo Wei, Teng Huang, Xi Zhang, Jiaming Liang, **Yunhao Li**, Cong Cao, Dan Li, Yongfeng Chen, Huagang Xiong, Feng Jiang, Xiqiu Zhang.',
        journal_name: 'IEEE Journal of Selected Topics in Applied Earth Observations and Remote Sensing',
        pdf_link:
            'https://ieeexplore.ieee.org/iel7/4609443/4609444/10285331.pdf',
        // code_link: "https://github.com/aigzhusmart/Slim-UNETR",
        // IF: '4.7',
        // journal: 'IEEE J-STARS',
        // ccf: 'JCR Q1',
        timestamp: '2023',
    },
    {
        title: 'AgileNet: A Rapid and Efficient Breast Lesion Segmentation Method for Medical Image Analysis',
        author: 'Jiaming Liang, Teng Huang, Dan Li, Ziyu Ding, **Yunhao Li**, Lin Huang, Qiong Wang, Xi Zhang.',
        journal_name: 'Chinese Conference on Pattern Recognition and Computer Vision',
        pdf_link:
            'https://link.springer.com/chapter/10.1007/978-981-99-8469-5_33',
        // code_link: "https://github.com/aigzhusmart/Slim-UNETR",
        // IF: "10.4",
        // journal: 'PRCV',
        // ccf: 'CCF-C',
        timestamp: '2023',
    },
]
</script>
<style></style>

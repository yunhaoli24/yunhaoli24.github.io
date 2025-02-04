<template>
    <div>
        <h1 class="text-2xl font-bold m-b-4">📚 Publications</h1>
        <el-timeline>
            <el-timeline-item
                v-for="(publication, index) in publications"
                :key="index"
                :timestamp="publication.timestamp"
                placement="top"
            >
                <el-card>
                    <el-space class="md:flex-row flex-col-reverse">
                        <el-image
                            class="h-200px w-300px"
                            :src="publication.image"
                            fit="fill"
                        />
                        <div>
                            <div class="text-xl font-semibold">
                                {{ publication.title }}
                            </div>
                            <div class="text-base">
                                <template
                                    v-for="(part, idx) in getAuthorParts(
                                        publication.author
                                    )"
                                    :key="idx"
                                >
                                    <span :class="{ 'font-bold': part.bold }">{{
                                        part.text
                                    }}</span>
                                </template>
                            </div>
                            <div class="text-base m-b-2 font-bold">
                                {{ publication.journal_name }}
                            </div>
                            <el-space class="m-b-1 m-t-1">
                                <a
                                    v-if="publication.pdf_link"
                                    :href="publication.pdf_link"
                                    target="_blank"
                                >
                                    <el-icon
                                        color="#409efc"
                                        class="no-inherit"
                                        :size="20"
                                    >
                                        <Icon name="lsicon:file-pdf-outline" />
                                    </el-icon>
                                </a>
                                <a
                                    v-if="publication.code_link"
                                    :href="publication.code_link"
                                    target="_blank"
                                >
                                    <el-icon
                                        color="#409efc"
                                        class="no-inherit"
                                        :size="20"
                                    >
                                        <Icon name="uil:github" />
                                    </el-icon>
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
                        </div>
                    </el-space>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>
<script setup lang="ts">
import { getAuthorParts } from '../utils/text'
interface Publication {
    title: string
    author: string
    journal_name: string
    timestamp: string
    image: string
    pdf_link?: string
    code_link?: string
    journal?: string
    ccf?: string
    IF?: string
}

const publications: Publication[] = [
    {
        title: 'Online Self-distillation and Self-modeling for 3D Brain Tumor Segmentation',
        author: 'Yan Pang, **Yunhao Li**, Teng Huang, Jiaming Liang, Zhen Wang, Changyu Dong, Dongyang Kuang, Ying Hu, Hao Chen, Tim Lei, Qiong Wang.',
        journal_name: 'Journal of Biomedical and Health Informatics',
        pdf_link: 'https://ieeexplore.ieee.org/document/10843341',
        code_link: 'https://github.com/deepang-ai/MOD',
        image: '/imgs/MOD.png',
        // IF: "10.4",
        journal: 'JBHI',
        // ccf: 'CCF-C',
        timestamp: '2025',
    },
    {
        title: 'Optimized Breast Lesion Segmentation in Ultrasound Videos Across Varied Resource-Scant Environments',
        author: '**Yunhao Li**, Chen Zibin, Yan Junming, Ding Ziyu, Li Jie ,Pei Xiaoqing, Zhang Zheng, Qiong Wang, Yan Pang.',
        journal_name: 'Asian Conference on Computer Vision',
        pdf_link:
            'https://openaccess.thecvf.com/content/ACCV2024/papers/Li_Optimized_Breast_Lesion_Segmentation_in_Ultrasound_Videos_Across_Varied_Resource-Scant_ACCV_2024_paper.pdf',
        // code_link: 'https://github.com/aigzhusmart/Slim-UNETR',
        // IF: "10.4",
        image: '/imgs/RbS.png',
        journal: 'ACCV',
        // ccf: 'CCF-C',
        timestamp: '2024',
    },
    {
        title: 'IPM: An Intelligent Component for 3D Brain Tumor Segmentation Integrating Semantic Extractor and Pixel Refiner',
        author: '**Yunhao Li**, Caiyan Tan, Mingdu Zhang, Xi Zhang, Teng Huang ,Xiao-Qing Pei, Yan Pang.',
        journal_name:
            'Chinese Conference on Pattern Recognition and Computer Vision',
        pdf_link:
            'https://link.springer.com/chapter/10.1007/978-981-97-8499-8_16',
        image: '/imgs/IPM.png',
        // code_link: "https://github.com/aigzhusmart/Slim-UNETR",
        // IF: "10.4",
        journal: 'PRCV',
        // ccf: 'CCF-C',
        timestamp: '2024',
    },
    {
        title: 'Slim UNETR: Scale hybrid transformers to efficient 3D medical image segmentation under limited computational resources',
        author: 'Yan Pang, Jiaming Liang, Teng Huang, Hao Chen, **Yunhao Li**, Dan Li, Lin Huang, Qiong Wang.',
        journal_name: 'IEEE Transactions on Medical Imaging',
        pdf_link: 'https://ieeexplore.ieee.org/abstract/document/10288609/',
        code_link: 'https://github.com/aigzhusmart/Slim-UNETR',
        image: '/imgs/SlimUNETR.png',
        // IF: '10.4',
        journal: 'TMI',
        // ccf: 'CCF-A',
        timestamp: '2023',
    },
    {
        title: 'CAM-PC: A novel method for camouflaging point clouds to counter adversarial deception in remote sensing',
        author: 'Bo Wei, Teng Huang, Xi Zhang, Jiaming Liang, **Yunhao Li**, Cong Cao, Dan Li, Yongfeng Chen, Huagang Xiong, Feng Jiang, Xiqiu Zhang.',
        journal_name:
            'IEEE Journal of Selected Topics in Applied Earth Observations and Remote Sensing',
        pdf_link:
            'https://ieeexplore.ieee.org/iel7/4609443/4609444/10285331.pdf',
        image: '/imgs/Cam-PC.png',
        // code_link: "https://github.com/aigzhusmart/Slim-UNETR",
        // IF: '4.7',
        journal: 'IEEE J-STARS',
        // ccf: 'JCR Q1',
        timestamp: '2023',
    },
    {
        title: 'AgileNet: A Rapid and Efficient Breast Lesion Segmentation Method for Medical Image Analysis',
        author: 'Jiaming Liang, Teng Huang, Dan Li, Ziyu Ding, **Yunhao Li**, Lin Huang, Qiong Wang, Xi Zhang.',
        journal_name:
            'Chinese Conference on Pattern Recognition and Computer Vision',
        pdf_link:
            'https://link.springer.com/chapter/10.1007/978-981-99-8469-5_33',
        image: '/imgs/AgileNet.png',
        // code_link: "https://github.com/aigzhusmart/Slim-UNETR",
        // IF: "10.4",
        journal: 'PRCV',
        // ccf: 'CCF-C',
        timestamp: '2023',
    },
]
</script>

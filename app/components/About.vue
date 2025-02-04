<template>
    <div>
        <h1 class="text-2xl font-bold m-b-4">🌟 About</h1>
        <el-row :gutter="20">
            <el-col :span="$device.isMobile ? 24 : 8">
                <div class="flex justify-center">
                    <el-image
                        class="w-full max-w-200px"
                        src="/profile.JPG"
                        fit="contain"
                    />
                </div>
            </el-col>
            <el-col :span="$device.isMobile ? 24 : 16">
                <div>
                    <div class="text-base indent-2em m-b-2">
                        <p>
                            Hello, my name is Yunhao Li, and I am currently
                            serving as a research assistant at Chinese Academy
                            of Sciences, where I am fortunate to work under the
                            esteemed guidance of
                            <NuxtLink to="https://people.ucas.ac.cn/~0058478"
                                >Prof. Qiong Wang</NuxtLink
                            >. My academic journey commenced at Guangzhou
                            University, where I pursued and obtained my Master’s
                            degree in Artificial Intelligence. During this
                            enriching period, I was mentored by
                            <NuxtLink to="https://pangyan.me/"
                                >Assoc. Prof. Yan Pang </NuxtLink
                            >, whose invaluable insights and expertise have
                            profoundly shaped my perspective and skills in the
                            field. Prior to my Master’s degree, I also completed
                            my Bachelor’s degree in Computer Science at Guilin
                            University of Electronic Technology, further
                            solidifying my foundation in the realm of
                            technology.
                        </p>
                        <p>
                            My research interests focused on Computer Vision,
                            Medical Image Analysis, and Multimodal Learning. I
                            am deeply committed to harnessing the power of these
                            technologies to make meaningful impact on the world.
                            My ultimate aspiration is to contribute to the
                            medical science, thereby enhancing human health and
                            well-being.
                        </p>
                    </div>
                    <SocialMediaLinks class="float-right" :size="28" />
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script setup lang="ts"></script>

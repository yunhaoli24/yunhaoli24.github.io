<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      🌟 About
    </h1>
    <el-row :gutter="20">
      <el-col :span="$device.isMobile ? 24 : 8">
        <div class="flex justify-center">
          <el-image
            class="max-w-[200px] w-full"
            src="/profile.JPG"
            fit="contain"
            lazy
          />
        </div>
      </el-col>
      <el-col :span="$device.isMobile ? 24 : 16">
        <div>
          <div class="text-base indent-8">
            <p>
              Hello, my name is Yunhao Li, and I am currently serving as a
              research assistant at Hong Kong University of Science and Technology, where I am
              fortunate to work under the esteemed guidance of
              <a
                class="text-[--el-color-primary]"
                href="https://people.ucas.ac.cn/~0058478"
              >Prof. Qiong Wang</a>. My academic
              journey commenced at Guangzhou University, where I
              pursued and obtained my Master’s degree in Artificial
              Intelligence. During this enriching period, I was mentored by
              <a
                class="text-[--el-color-primary]"
                href="https://pangyan.me/"
              >Assoc. Prof. Yan Pang </a>, whose invaluable insights
              and expertise have profoundly shaped
              my perspective and skills in the field. Prior to my Master’s
              degree, I also completed my Bachelor’s degree in Computer Science
              at Guilin University of Electronic Technology, further solidifying
              my foundation in the realm of technology.
            </p>
            <p>
              My research interests focused on Computer Vision, Medical Image
              Analysis, and Multimodal Learning. I am deeply committed to
              harnessing the power of these technologies to make meaningful
              impact on the world. My ultimate aspiration is to contribute to
              the medical science, thereby enhancing human health.
            </p>
          </div>
          <AcademicSocialMediaLinks
            class="float-right"
            :size="28"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

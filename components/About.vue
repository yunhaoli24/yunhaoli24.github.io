<template>
  <div>
    <h1>About</h1>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-image
          style="width: 300px; height: 400px"
          src="/profile.JPG"
          fit="fill"
        />
      </el-col>
      <el-col :span="16">
        <div>
          <div :style="`font-size: var(--el-font-size-large)`">
            <p style="text-indent: 2em">
              Hi, my name is Yunhao Li. I am currently pursuing a Master of
              Science in Artificial Intelligence at Guangzhou University, guided
              by Professor Yan Pang. My research interests focus on medical
              image segmentation, deep learning. My work has been published in
              notable journals, with contributions to projects such as 3D brain
              tumor segmentation and efficient 3D medical image segmentation
              using hybrid transformers.During my time as an ML Researcher at
              China Post Bank, I developed an AI model for customer marketing
              and designed a automatic rolling training and optimization engine.
              I have strong hands-on skills, proficient in tools like PyTorch,
              Transformers, AutoGluon, and server-side technologies including
              Vue, FastAPI, and Spring Cloud. My achievements include multiple
              national competition awards and patents. In summary, my academic
              background, research experience, and technical expertise equip me
              to contribute significantly to advancements in artificial
              intelligence.
            </p>
          </div>
          <SocialMediaLinks style="float: right" />
        </div>
      </el-col>
    </el-row>
    <!--    <div class="row mb-3">-->
    <!--      <div class="col">-->
    <!--        <h1>Yunhao Li</h1>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div class="row">-->
    <!--      <div class="col-md-4 order-md-1">-->
    <!--        <img-->
    <!--          class="img-fluid rounded mb-2 d-md-block d-none"-->
    <!--          src="/profile.JPG"-->
    <!--          alt="profile"-->
    <!--        />-->
    <!--      </div>-->
    <!--      <div class="col-md-8 order-md-2">-->
    <!--        <div class="row container">-->
    <!--          <div class="order-md-1">-->
    <!--            <p>-->
    <!--              Hi, my name is Yunhao Li. I am currently pursuing a Master of-->
    <!--              Science in Artificial Intelligence at Guangzhou University, guided-->
    <!--              by Professor Yan Pang. My research interests focus on medical-->
    <!--              image segmentation, deep learning. My work has been published in-->
    <!--              notable journals, with contributions to projects such as 3D brain-->
    <!--              tumor segmentation and efficient 3D medical image segmentation-->
    <!--              using hybrid transformers.During my time as an ML Researcher at-->
    <!--              China Post Bank, I developed an AI model for customer marketing-->
    <!--              and designed a automatic rolling training and optimization engine.-->
    <!--              I have strong hands-on skills, proficient in tools like PyTorch,-->
    <!--              Transformers, AutoGluon, and server-side technologies including-->
    <!--              Vue, FastAPI, and Spring Cloud. My achievements include multiple-->
    <!--              national competition awards and patents. In summary, my academic-->
    <!--              background, research experience, and technical expertise equip me-->
    <!--              to contribute significantly to advancements in artificial-->
    <!--              intelligence.-->
    <!--            </p>-->
    <!--          </div>-->
    <!--          <div class="order-md-2 text-center">-->
    <!--            <SocialMediaLinks />-->
    <!--            <a-->
    <!--              class="btn btn-primary btn-icon"-->
    <!--              href="/YunhaoLi_CV.pdf"-->
    <!--              target="_blank"-->
    <!--              rel="tooltip"-->
    <!--              title=""-->
    <!--              >CV (PDF)</a-->
    <!--            >-->
    <!--            <a-->
    <!--              class="btn btn-primary btn-icon ml-2"-->
    <!--              href="https://scholar.google.com/citations?user=TDnI7j8AAAAJ"-->
    <!--              target="_blank"-->
    <!--              rel="tooltip"-->
    <!--              title=""-->
    <!--              >Google Scholar</a-->
    <!--            >-->
    <!--            <hr class="d-md-none" />-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>
<script setup></script>
<style></style>

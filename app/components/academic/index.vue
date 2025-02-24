<script setup lang="ts">
import About from './About.vue'
import Education from './Education.vue'
import Footer from './Footer.vue'
import Honors from './Honors.vue'
import ProgrammingSkills from './ProgrammingSkills.vue'
import Publications from './Publications.vue'
import WorkExp from './WorkExp.vue'

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
  ],
})
</script>

<template>
  <div>
    <About />
    <el-divider />
    <Publications />
    <el-divider />
    <WorkExp />
    <el-divider />
    <ProgrammingSkills />
    <el-divider />
    <Education />
    <el-divider />
    <Honors />
    <el-divider />
    <Footer />
  </div>
</template>

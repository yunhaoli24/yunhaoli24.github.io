<template>
  <div>
    <NuxtRouteAnnouncer />
    <header class="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
      <div class="page-container flex h-16 w-full items-center gap-6">
        <div class="text-lg font-semibold tracking-tight">Yunhao Li</div>
        <div class="ml-auto flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>

    <main class="page-container relative w-full space-y-14 py-10">
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-x-0 top-[-140px] h-56 bg-linear-to-b from-primary/15 via-transparent to-transparent blur-3xl"
      ></div>
      <div
        aria-hidden="true"
        class="pointer-events-none absolute right-10 top-28 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
      ></div>

      <About />
      <Publications />
      <Experience />
      <Education />
      <Skills />
      <Honors />
      <Patents />

      <Separator />
      <footer class="pb-8 text-center text-sm text-muted-foreground">
        © 2018 - {{ currentYear }} Yunhao Li All Rights Reserved.
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
import About from '~/components/About.vue';
import Publications from '~/components/Publications.vue';
import Experience from '~/components/Experience.vue';
import Skills from '~/components/Skills.vue';
import Education from '~/components/Education.vue';
import Honors from '~/components/Honors.vue';
import Patents from '~/components/Patents.vue';
const currentYear = computed(() => {
  const now = new Date()
  return now.getFullYear()
})
defineOgImageComponent('BlogPost', {
  headline: 'Greetings',
  title: 'Yunhao Li 👋',
  description: 'Look at my blog',
})
</script>

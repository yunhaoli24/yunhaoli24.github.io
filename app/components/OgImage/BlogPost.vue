<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  headline?: string
  description?: string
}>(), {
  title: 'Yunhao Li',
  headline: 'Research & Blog',
  description: 'PhD @ PolyU · Computer Vision · Medical Imaging · Trustworthy AI',
})
</script>

<template>
  <div
    class="relative flex h-full w-full items-center overflow-hidden rounded-4xl bg-linear-to-br from-[#0b1220] via-[#0f172a] to-[#0e172d] px-16 py-16 text-white">
    <div class="absolute inset-0 flex opacity-60">
      <div class="absolute -left-20 top-[-140px] h-[420px] w-[420px] rounded-full bg-[#0ea5e9]/30 blur-[120px]" />
      <div class="absolute right-[-120px] -bottom-40 h-[420px] w-[420px] rounded-full bg-[#22d3ee]/25 blur-[120px]" />
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.05),transparent_32%),radial-gradient(circle_at_50%_60%,rgba(255,255,255,0.04),transparent_46%)]" />
    </div>

    <div class="relative z-10 flex w-full flex-col gap-8">
      <div class="flex max-w-[82%] flex-col gap-6">
        <div
          class="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-semibold tracking-[0.12em] uppercase">
          <span class="block h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_0_6px_rgba(16,185,129,0.18)]" />
          <span>{{ props.headline }}</span>
        </div>

        <h1 class="text-[80px] leading-[1.05] font-black drop-shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
          {{ props.title }}
        </h1>

        <p class="max-w-3xl text-2xl text-white/80">
          {{ props.description }}
        </p>

        <div class="h-px w-28 rounded-full bg-white/20" />
      </div>
    </div>

    <div class="absolute bottom-10 right-14 text-right text-sm font-semibold uppercase tracking-[0.14em] text-white/70">
      yunhaoli.top
    </div>
  </div>
</template>

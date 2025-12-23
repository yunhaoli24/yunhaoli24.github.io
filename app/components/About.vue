<template>
  <section
    id="about"
    class="relative overflow-hidden rounded-3xl border bg-card/70 p-6 shadow-xl ring-1 ring-primary/5"
  >
    <div class="mb-6 flex items-center gap-3">
      <span class="text-2xl" aria-hidden="true">🌟</span>
      <h2 class="text-2xl font-bold leading-tight">About</h2>
    </div>
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -left-16 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl"
    ></div>
    <div
      aria-hidden="true"
      class="pointer-events-none absolute bottom-0 right-0 h-24 w-24 rounded-full bg-secondary/50 blur-2xl"
    ></div>
    <div class="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
      <Card
        class="relative w-full max-w-65 overflow-hidden border-none bg-transparent shadow-none md:shrink-0"
      >
        <CardContent class="p-0">
          <AspectRatio :ratio="1">
            <img
              src="/imgs/profile.jpg"
              alt="Portrait of Yunhao Li"
              class="h-full w-full object-cover"
            />
          </AspectRatio>
        </CardContent>
        <div
          class="absolute inset-0 bg-linear-to-t from-background/70 via-transparent to-transparent"
        ></div>
      </Card>
      <div class="space-y-6">
        <Card class="border border-border/60 bg-background/80 shadow-sm backdrop-blur">
          <CardHeader class="space-y-3">
            <div class="space-y-1">
              <CardTitle class="text-3xl font-bold tracking-tight">Yunhao Li</CardTitle>
              <CardDescription class="text-base leading-relaxed text-foreground">
                PhD student at The Hong Kong Polytechnic University, specializing in Medical Image
                Analysis, Computer Vision, and trustworthy AI with peer-reviewed work on reliable
                clinical imaging.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent class="space-y-5 text-base leading-relaxed">
            <p>
              My research centers on Computer Vision, Medical Image Analysis, and Multimodal
              Learning, with an emphasis on dependable methods for clinical decision support. I aim
              to translate algorithmic advances into measurable contributions for medical science
              and human health.
            </p>
            <div class="flex flex-wrap gap-2">
              <HoverCard v-for="link in socialLinks" :key="link.href" :open-delay="80">
                <HoverCardTrigger as-child>
                  <Button variant="outline" size="sm" class="gap-2 shadow-none" as-child>
                    <a
                      :href="link.href"
                      :target="link.target"
                      :rel="link.target === '_blank' ? 'noreferrer' : undefined"
                    >
                      <component :is="link.icon" class="h-4 w-4 text-primary" aria-hidden="true" />
                      {{ link.label }}
                    </a>
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent class="w-64 text-sm">
                  <div class="font-semibold">{{ link.label }}</div>
                  <p class="text-muted-foreground">{{ link.note }}</p>
                </HoverCardContent>
              </HoverCard>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Component } from "vue";
import { Github, GraduationCap, IdCard, Mail } from "lucide-vue-next";

type SocialLink = {
  label: string;
  href: string;
  note: string;
  icon: Component;
  target?: "_blank";
};

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/yunhaoli24",
    note: "Code for research ideas, experiments, and open-source contributions.",
    icon: Github,
    target: "_blank",
  },
  {
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?user=TDnI7j8AAAAJ",
    note: "Peer-reviewed publications and citation metrics.",
    icon: GraduationCap,
    target: "_blank",
  },
  {
    label: "Email",
    href: "mailto:li.yunhao@foxmail.com",
    note: "Let's collaborate or chat about research.",
    icon: Mail,
  },
  {
    label: "ORCID",
    href: "https://orcid.org/0000-0003-1704-3050",
    note: "Verified academic profile and identifiers.",
    icon: IdCard,
    target: "_blank",
  }

] satisfies SocialLink[];
</script>

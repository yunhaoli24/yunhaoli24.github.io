<template>
  <section id="skills" class="relative space-y-6 overflow-hidden rounded-2xl border bg-card/70 p-6 shadow-sm">
    <div aria-hidden="true"
      class="pointer-events-none absolute -left-6 -top-8 h-28 w-28 rounded-full bg-primary/15 blur-3xl" />
    <div aria-hidden="true"
      class="pointer-events-none absolute bottom-0 right-0 h-32 w-32 rounded-full bg-secondary/30 blur-3xl" />

    <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div class="flex items-start gap-3">
        <span class="text-2xl">💻</span>
        <div class="space-y-1">
          <h2 class="text-2xl font-bold leading-tight">Programming Skills</h2>
          <p class="max-w-2xl text-sm text-muted-foreground md:text-base">
            Full-stack delivery across research prototypes and production systems, with a focus on reliable ML,
            developer experience, and thoughtful tooling choices.
          </p>
        </div>
      </div>
      <div class="flex flex-wrap gap-2">
        <Badge variant="secondary">End-to-end delivery</Badge>
        <Badge variant="outline">MLOps & Observability</Badge>
        <Badge variant="outline">DX focused</Badge>
      </div>
    </div>

    <div class="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
      <div class="grid gap-4 sm:grid-cols-2">
        <Card v-for="skill in skills" :key="skill.title"
          class="relative overflow-hidden border bg-background/70 transition hover:-translate-y-0.5 hover:shadow-md">
          <div :class="['absolute inset-x-0 top-0 h-20 bg-linear-to-r opacity-60', skill.accent]" aria-hidden="true" />
          <CardHeader class="relative space-y-2">
            <div class="flex items-center gap-2">
              <span class="text-lg">{{ skill.icon }}</span>
              <CardTitle class="text-lg">{{ skill.title }}</CardTitle>
            </div>
            <CardDescription class="text-sm leading-relaxed text-foreground/80">
              {{ skill.description }}
            </CardDescription>
          </CardHeader>
          <CardContent class="relative flex flex-wrap gap-2">
            <Badge v-for="item in skill.items" :key="item" variant="outline">{{ item }}</Badge>
          </CardContent>
        </Card>
      </div>

      <Card class="relative h-full overflow-hidden border bg-background/70">
        <div class="absolute inset-x-0 top-0 h-16 bg-linear-to-br from-primary/20 via-transparent to-transparent"
          aria-hidden="true" />
        <CardHeader class="space-y-2">
          <CardTitle class="text-lg">How I build</CardTitle>
          <CardDescription class="text-sm leading-relaxed text-foreground/80">
            Practical workflows that keep experiments measurable and services shippable.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-3">
          <ul class="space-y-3 text-base leading-relaxed">
            <li v-for="highlight in highlights" :key="highlight" class="flex gap-2">
              <span class="mt-1 text-primary">•</span>
              <span class="text-foreground/90">{{ highlight }}</span>
            </li>
          </ul>
          <div class="rounded-lg border bg-muted/40 p-4">
            <div class="text-sm font-medium text-foreground">Tooling stack</div>
            <p class="text-sm text-muted-foreground">CI/CD pipelines with containerized services, feature flags for safe
              rollout, and dashboards to watch model drift.</p>
          </div>
        </CardContent>
      </Card>
    </div>

    <div class="rounded-xl border bg-background/80 p-4">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-2">
          <span aria-hidden="true">🌐</span>
          <div>
            <div class="text-sm font-semibold">Open-source contributions</div>
            <p class="text-sm text-muted-foreground">Collaborating with the community to strengthen LLM and CV tooling.
            </p>
          </div>
        </div>
        <div class="flex flex-wrap gap-2">
          <Button v-for="project in contributions" :key="project.href" variant="outline" size="sm" as-child>
            <a :href="project.href" target="_blank" rel="noreferrer">{{ project.label }}</a>
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type SkillArea = {
  title: string;
  icon: string;
  description: string;
  items: string[];
  accent: string;
};

const skills: SkillArea[] = [
  {
    title: "AI & Data",
    icon: "🧠",
    description: "Train and fine-tune CV/LLM models, ship evaluation loops, and keep datasets reproducible.",
    items: ["PyTorch", "Transformers", "AutoGluon", "Pandas", "Matplotlib", "OpenCV"],
    accent: "from-primary/15 via-primary/5 to-transparent",
  },
  {
    title: "Backend & Services",
    icon: "⚙️",
    description: "Design APIs and async pipelines with observability, caching, and resource-aware deployment.",
    items: ["Vue", "Nuxt", "FastAPI", "Spring Cloud", "MySQL", "RabbitMQ", "K8S", "KubeSphere", "CI/CD"],
    accent: "from-secondary/20 via-secondary/5 to-transparent",
  },
  {
    title: "System Glue",
    icon: "🧩",
    description: "Bridge research and product: prompt tooling, feature flags, and rollouts tied to metrics.",
    items: ["LLM evaluation", "Retrieval", "Prompt flows", "Feature flags", "A/B testing", "Monitoring"],
    accent: "from-emerald-400/20 via-emerald-400/10 to-transparent",
  },
  {
    title: "Collaboration",
    icon: "🤝",
    description: "Mentor teams, write docs, and keep coding standards consistent for safer shipping.",
    items: ["Code review", "Design docs", "Pairing", "Knowledge sharing"],
    accent: "from-blue-400/20 via-blue-400/10 to-transparent",
  },
];

const highlights = [
  "Start with measurable prototypes, then instrument tracing/metrics before scaling models or infra.",
  "Prefer lightweight adapters, retrieval, and dataset curation over brute-force training.",
  "Ship services with automated testing, containerization, and staged rollout paths for resilience.",
];

const contributions = [
  { label: "LlamaIndex", href: "https://github.com/run-llama/llama_index" },
  { label: "LLaMA-Factory", href: "https://github.com/hiyouga/LLaMA-Factory" },
  { label: "Chinese-LLaMA-Alpaca", href: "https://github.com/ymcui/Chinese-LLaMA-Alpaca" },
];
</script>

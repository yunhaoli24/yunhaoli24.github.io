<template>
  <section id="academic-service" class="space-y-4 rounded-2xl border bg-card/70 p-6 shadow-sm">
    <div class="flex items-center gap-3">
      <span class="text-2xl">🤝</span>
      <h2 class="text-2xl font-bold leading-tight">Professional Services</h2>
    </div>

    <div class="space-y-5">
      <!--
      <ServiceGroup title="Area Chair" :items="areaChairServices" />
      <ServiceGroup title="Guest Editor" :items="guestEditorServices" />
      -->
      <div v-for="group in visibleServiceGroups" :key="group.title" class="space-y-2">
        <h3 class="text-lg font-semibold leading-tight">{{ group.title }}</h3>
        <ul class="list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground">
          <li v-for="item in group.items" :key="item">{{ item }}</li>
        </ul>
      </div>
      <!--
      <ServiceGroup title="Invited Talks" :items="invitedTalks" />
      <ServiceGroup title="Tutorials" :items="tutorials" />
      -->
    </div>
  </section>
</template>

<script setup lang="ts">
type ServiceGroup = {
  title: string;
  items: string[];
};

// Future sections:
// const areaChairServices: string[] = [];
// const guestEditorServices: string[] = [];
// const invitedTalks: string[] = [];
// const tutorials: string[] = [];

const visibleServiceGroups: ServiceGroup[] = [
  {
    title: "Journal Reviewer",
    items: ["IEEE Transactions on Circuits and Systems for Video Technology (TCSVT)"],
  },
  {
    title: "Conference Reviewer",
    items: [
      "Chinese Conference on Pattern Recognition and Computer Vision (PRCV)",
      "International Joint Conference on Neural Networks (IJCNN)",
    ],
  },
];
</script>

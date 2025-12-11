<template>
  <div
    class="desktop-layout min-h-screen bg-linear-to-b from-background via-background to-muted/50 text-foreground"
  >
    <slot />
  </div>
</template>

<style scoped>
.desktop-layout :deep(.page-container) {
  margin-left: auto;
  margin-right: auto;
  max-width: 72rem;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
}
</style>

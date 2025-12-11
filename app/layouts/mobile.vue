<template>
  <div
    class="mobile-layout min-h-screen bg-linear-to-b from-background via-background to-muted/50 text-foreground"
  >
    <slot />
  </div>
</template>

<style scoped>
.mobile-layout :deep(.page-container) {
  margin: 0;
  max-width: none;
  padding-left: 0;
  padding-right: 0;
  width: 100%;
}
</style>

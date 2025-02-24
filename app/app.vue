<template>
  <div>
    <NuxtLayout :name="$device.isMobile ? 'mobile' : 'default'">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

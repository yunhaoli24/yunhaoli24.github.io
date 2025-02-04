<template>
    <div>
        <div class="text-center text-4xl">Yunhao Li</div>
        <br >
        <div class="text-center">
            <SocialMediaLinks />
        </div>
        <div class="text-center mt-2">
            <p>
                &copy; 2018 - {{ currentYear }} Yunhao Li All Rights
                Reserved.<br >
            </p>
        </div>
    </div>
</template>
<script setup>
const currentYear = computed(() => {
    const now = new Date()
    return now.getFullYear()
})
</script>

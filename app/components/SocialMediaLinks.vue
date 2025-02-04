<template>
    <el-space>
        <a
            href="https://github.com/yunhaoli24"
            target="_blank"
            rel="noopener noreferrer"
        >
            <el-icon color="#409efc" class="no-inherit" :size="size">
                <Icon name="uil:github" />
            </el-icon>
        </a>
        <a
            href="https://scholar.google.com/citations?user=TDnI7j8AAAAJ"
            target="_blank"
            rel="noopener noreferrer"
        >
            <el-icon color="#409efc" class="no-inherit" :size="size">
                <Icon name="fa6-brands:google-scholar" />
            </el-icon>
        </a>
        <a
            href="mailto: li.yunhao@foxmail.com"
            target="_blank"
            rel="noopener noreferrer"
        >
            <el-icon color="#409efc" class="no-inherit" :size="size">
                <Icon name="material-symbols:mail" />
            </el-icon>
        </a>
        <a
            href="https://t.me/yunhaoli24"
            target="_blank"
            rel="noopener noreferrer"
        >
            <el-icon color="#409efc" class="no-inherit" :size="size">
                <Icon name="ic:baseline-telegram" />
            </el-icon>
        </a>
    </el-space>
</template>
<script setup>
defineProps({
    size: {
        type: Number,
        default: 20,
    },
})
</script>

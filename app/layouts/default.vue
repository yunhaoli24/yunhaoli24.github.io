<template>
  <div>
    <div>
      <el-container>
        <el-header h-60px>
          <AcademicNav />
        </el-header>
        <el-main class="h-[calc(100vh-60px)]">
          <el-scrollbar>
            <el-col
              :span="18"
              :offset="3"
            >
              <slot />
            </el-col>
          </el-scrollbar>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.el-main {
    padding: 2px;
}
</style>

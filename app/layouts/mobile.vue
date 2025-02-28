<template>
  <div>
    <div>
      <el-container>
        <el-header class="h-60px">
          <AcademicNav />
        </el-header>
        <el-main class="h-[calc(100vh-60px)]">
          <el-scrollbar>
            <el-col
              :span="20"
              :offset="2"
            >
              <slot />
            </el-col>
          </el-scrollbar>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<style lang="css" scoped>
.el-main {
    padding: 2px;
}
</style>

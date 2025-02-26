<template>
  <div>
    <div>
      <el-container>
        <el-header>
          <AcademicNav />
        </el-header>
        <el-main class="h-[--el-main-height]">
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

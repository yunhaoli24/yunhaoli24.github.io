<template>
  <div>
    <div class="h-full w-full">
      <el-container>
        <el-header>
          <AcademicNav />
        </el-header>
        <el-main class="relative h-[calc(100vh-80px)] w-full overflow-y-scroll">
          <el-col
            :span="18"
            :offset="3"
          >
            <slot />
          </el-col>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

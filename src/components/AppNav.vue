<template>
  <nav class="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2 group">
          <el-icon 
            class="text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-110"
            :size="24"
          >
            <Monitor />
          </el-icon>
          <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            技术博客
          </span>
        </router-link>

        <!-- Navigation Links -->
        <div class="hidden sm:flex items-center space-x-1">
          <router-link 
            v-for="nav in navItems" 
            :key="nav.path"
            :to="nav.path" 
            class="flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
            :class="{ 'bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400': route.path === nav.path }"
          >
            <el-icon :size="16">
              <component :is="nav.icon" />
            </el-icon>
            <span>{{ nav.name }}</span>
          </router-link>
        </div>

        <!-- Right Section -->
        <div class="flex items-center space-x-4">
          <el-tooltip
            content="搜索文章"
            placement="bottom"
            :show-after="300"
          >
            <el-button 
              type="primary"
              class="flex items-center !px-3 !h-8"
            >
              <el-icon :size="16">
                <Search />
              </el-icon>
            </el-button>
          </el-tooltip>
          <ThemeToggle />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { markRaw } from 'vue'
import {
  HomeFilled,
  Document,
  Collection,
  Folder,
  Monitor,
  Search
} from '@element-plus/icons-vue'
import ThemeToggle from './ThemeToggle.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { name: '首页', path: '/', icon: markRaw(HomeFilled) },
  { name: '文章列表', path: '/articles', icon: markRaw(Document) },
  { name: '分类专栏', path: '/categories', icon: markRaw(Collection) },
  { name: '归档', path: '/archives', icon: markRaw(Folder) }
]
</script>

<style scoped>
:deep(.el-button) {
  @apply !bg-transparent !border-none hover:!bg-gray-100 dark:hover:!bg-gray-800;
}

:deep(.el-button:focus),
:deep(.el-button:hover) {
  @apply !text-blue-600 dark:!text-blue-400 !bg-gray-100 dark:!bg-gray-800;
}

:deep(.el-icon) {
  @apply transition-transform;
}

.router-link-active {
  @apply bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400;
}

.router-link-active :deep(.el-icon) {
  @apply text-blue-600 dark:text-blue-400;
}
</style> 
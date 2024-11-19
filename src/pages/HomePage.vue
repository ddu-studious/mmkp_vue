<template>
  <div class="space-y-12">
    <!-- 欢迎区域 -->
    <section class="relative bg-gradient-to-br from-blue-600 to-blue-400 dark:from-blue-700 dark:to-blue-500 rounded-2xl p-8 sm:p-12 overflow-hidden">
      <div class="relative z-10">
        <h1 class="text-3xl sm:text-4xl font-bold text-white mb-4">
          欢迎来到技术博客
        </h1>
        <p class="text-base sm:text-lg text-blue-50 mb-8 max-w-2xl leading-relaxed">
          分享技术经验，记录学习心得，共同成长进步。专注于前端开发、后端技术、云原生等领域。
        </p>
        <div class="flex flex-wrap gap-4">
          <el-button 
            type="primary" 
            size="large"
            class="!bg-white !text-blue-600 hover:!bg-blue-50 !border-transparent"
            @click="$router.push('/articles')"
          >
            <template #icon>
              <el-icon><Document /></el-icon>
            </template>
            浏览文章
          </el-button>
          <el-button 
            size="large"
            class="!border-white !text-white hover:!bg-white/10"
            @click="$router.push('/about')"
          >
            <template #icon>
              <el-icon><InfoFilled /></el-icon>
            </template>
            了解更多
          </el-button>
        </div>
      </div>
      <!-- 背景装饰 -->
      <div class="absolute right-0 top-0 w-1/3 h-full opacity-10">
        <div class="absolute inset-0 bg-white transform rotate-45 translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </section>

    <!-- 特色文章 -->
    <section class="space-y-8">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
          <el-icon :size="20" class="text-blue-600 dark:text-blue-400">
            <Star />
          </el-icon>
          <span>特色文章</span>
        </h2>
        <router-link 
          to="/articles" 
          class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center space-x-1 group"
        >
          <span>查看全部</span>
          <el-icon :size="16" class="group-hover:translate-x-1 transition-transform">
            <ArrowRight />
          </el-icon>
        </router-link>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article 
          v-for="article in featuredArticles" 
          :key="article.id"
          class="group bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden"
        >
          <!-- 文章封面图 -->
          <div class="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
            <img 
              :src="article.cover" 
              :alt="article.title"
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            >
          </div>

          <div class="p-6">
            <!-- 文章标题 -->
            <router-link 
              :to="`/article/${article.id}`"
              class="block"
            >
              <h3 class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {{ article.title }}
              </h3>
            </router-link>

            <!-- 文章元信息 -->
            <div class="flex items-center space-x-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
              <span class="flex items-center space-x-1">
                <el-icon :size="14"><Calendar /></el-icon>
                <span>{{ formatDate(article.publishDate) }}</span>
              </span>
              <span class="flex items-center space-x-1">
                <el-icon :size="14"><View /></el-icon>
                <span>{{ article.views }} 阅读</span>
              </span>
            </div>

            <!-- 文章摘要 -->
            <p class="mt-4 text-gray-600 dark:text-gray-300 text-sm line-clamp-2 leading-relaxed">
              {{ article.summary }}
            </p>
          </div>
        </article>
      </div>
    </section>

    <!-- 分类专栏 -->
    <section class="space-y-8">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
          <el-icon :size="20" class="text-blue-600 dark:text-blue-400">
            <Collection />
          </el-icon>
          <span>分类专栏</span>
        </h2>
        <router-link 
          to="/categories" 
          class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center space-x-1 group"
        >
          <span>查看全部</span>
          <el-icon :size="16" class="group-hover:translate-x-1 transition-transform">
            <ArrowRight />
          </el-icon>
        </router-link>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <router-link
          v-for="category in categories"
          :key="category.id"
          :to="`/categories/${category.id}`"
          class="group bg-white dark:bg-gray-800 rounded-lg p-6 text-center hover:shadow-md transition-all hover:-translate-y-1"
        >
          <el-icon 
            :size="32" 
            class="text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform"
          >
            <component :is="category.icon" />
          </el-icon>
          <h3 class="font-medium text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {{ category.name }}
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ category.count }} 篇文章
          </p>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { markRaw } from 'vue'
import {
  Calendar,
  View,
  Star,
  Collection,
  ArrowRight,
  Monitor,
  Connection,
  DataLine,
  Cpu
} from '@element-plus/icons-vue'

// 格式化日期
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 特色文章数据
const featuredArticles = ref([
  {
    id: 1,
    title: 'Vue3 和 TypeScript 实战指南',
    publishDate: '2024-01-15',
    views: 1234,
    summary: 'Vue3 带来了 Composition API、更好的 TypeScript 支持等重要特性。本文将深入探讨如何在实际项目中充分利用这些新特性。',
    cover: 'https://picsum.photos/800/400?random=1'
  },
  {
    id: 2,
    title: '深入理解 Vite 构建原理',
    publishDate: '2024-01-14',
    views: 856,
    summary: 'Vite 作为新一代前端构建工具，在开发体验和构建性能上都有显著优势。本文将详细解析 Vite 的核心原理。',
    cover: 'https://picsum.photos/800/400?random=2'
  },
  {
    id: 3,
    title: 'Node.js 性能优化实践',
    publishDate: '2024-01-13',
    views: 678,
    summary: '本文将分享一些 Node.js 应用性能优化的实用技巧，包括内存管理、异步操作优化等方面的最佳实践。',
    cover: 'https://picsum.photos/800/400?random=3'
  }
])

// 分类数据
const categories = ref([
  {
    id: 'frontend',
    name: '前端开发',
    count: 42,
    icon: markRaw(Monitor)
  },
  {
    id: 'backend',
    name: '后端技术',
    count: 38,
    icon: markRaw(Connection)
  },
  {
    id: 'database',
    name: '数据库',
    count: 25,
    icon: markRaw(DataLine)
  },
  {
    id: 'devops',
    name: 'DevOps',
    count: 18,
    icon: markRaw(Cpu)
  }
])
</script>

<style scoped>
:deep(.el-button) {
  @apply !font-medium;
}

:deep(.el-button--primary) {
  @apply !border-transparent;
}

:deep(.el-icon) {
  @apply transition-transform;
}

/* 图片加载过渡效果 */
img {
  @apply transition-opacity duration-300;
}

img[loading] {
  @apply opacity-0;
}

img.loaded {
  @apply opacity-100;
}
</style> 
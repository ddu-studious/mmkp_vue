<template>
  <div class="articles-page">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-center mb-8 text-gray-900">
        文章列表
      </h1>

      <!-- Git 指南快速入口 -->
      <div class="mb-8">
        <router-link 
          to="/git-guide" 
          class="block max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
        >
          <h2 class="text-xl font-semibold text-blue-600 mb-2">
            Git 常用命令指南
            <span class="ml-2 text-sm text-white bg-blue-500 px-2 py-1 rounded">推荐</span>
          </h2>
          <p class="text-gray-600 mb-3">
            详细介绍 Git 的常用命令和最佳实践，包括分支管理、代码提交、远程仓库操作等内容。适合新手入门和工作参考。
          </p>
          <div class="text-sm text-gray-500">
            <span class="mr-4">
              <i class="fas fa-book-reader mr-1"></i>
              技术教程
            </span>
            <span>
              <i class="fas fa-arrow-right mr-1"></i>
              点击查看详情
            </span>
          </div>
        </router-link>
      </div>

      <!-- 原有的文章列表 -->
      <ArticleList 
        :articles="articles" 
        :loading="loading" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ArticleList from '@/components/articles/ArticleList.vue'
import type { Article } from '@/types/global'

const articles = ref<Article[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    loading.value = true
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    articles.value = [
      {
        id: 1,
        title: '示例文章',
        description: '这是一篇示例文章的描述...',
        date: new Date().toISOString(),
        category: '技术',
        views: 0
      }
      // ... 其他文章
    ]
  } catch (error) {
    console.error('Failed to fetch articles:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.articles-page {
  @apply min-h-screen bg-gray-50;
}
</style> 
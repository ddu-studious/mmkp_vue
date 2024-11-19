<template>
  <div class="article-list">
    <template v-if="loading">
      <div v-for="i in 3" :key="i" class="article-skeleton">
        <div class="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-3"></div>
        <div class="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
        <div class="h-4 w-2/3 bg-gray-200 rounded animate-pulse mb-3"></div>
        <div class="flex space-x-4">
          <div class="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </template>
    
    <template v-else-if="articles.length === 0">
      <div class="empty-state">
        <div class="empty-state-icon">
          <i class="fas fa-inbox text-5xl text-gray-400 mb-4"></i>
        </div>
        <h3 class="text-xl font-medium text-gray-600 mb-2">暂无文章</h3>
        <p class="text-gray-500">敬请期待更多精彩内容</p>
      </div>
    </template>
    
    <template v-else>
      <div v-for="article in articles" 
           :key="article.id" 
           class="article-item">
        <router-link :to="`/article/${article.id}`" class="block group">
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <h2 class="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                {{ article.title }}
              </h2>
              <p class="text-gray-600 mb-3 line-clamp-2 group-hover:text-gray-900 transition-colors">
                {{ article.description }}
              </p>
              <div class="flex items-center text-sm text-gray-500 flex-wrap">
                <span class="meta-item">
                  <i class="fas fa-calendar-alt"></i>
                  {{ formatDate(article.date) }}
                </span>
                <span class="meta-item">
                  <i class="fas fa-tag"></i>
                  {{ article.category }}
                </span>
                <span class="meta-item">
                  <i class="fas fa-eye"></i>
                  {{ article.views || 0 }} 阅读
                </span>
              </div>
            </div>
            <div v-if="article.cover" class="ml-4 w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
              <img :src="article.cover" 
                   :alt="article.title"
                   class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" />
            </div>
          </div>
        </router-link>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Article } from '@/types/global'

interface Props {
  articles: Article[]
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.article-list {
  @apply space-y-6 max-w-3xl mx-auto;
}

.article-item {
  @apply border border-gray-100 shadow-sm rounded-xl p-6 
         bg-white hover:shadow-md transition-all duration-300
         hover:border-gray-200;
}

.empty-state {
  @apply text-center py-16 bg-white rounded-xl border border-gray-100;
}

.meta-item {
  @apply mr-6 last:mr-0 flex items-center space-x-2;
}

.meta-item i {
  @apply text-gray-400 mr-1;
}

.article-skeleton {
  @apply border border-gray-100 shadow-sm rounded-xl p-6 bg-white;
}
</style> 
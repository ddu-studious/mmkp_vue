<template>
  <div class="article-list">
    <template v-if="loading">
      <div class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    </template>
    
    <template v-else-if="articles.length === 0">
      <div class="text-center py-12">
        <i class="fas fa-inbox text-4xl text-gray-400 mb-4"></i>
        <p class="text-gray-500">暂无文章</p>
      </div>
    </template>
    
    <template v-else>
      <div v-for="article in articles" 
           :key="article.id" 
           class="article-item">
        <router-link :to="article.id === 'git-guide' ? '/git-guide' : `/article/${article.id}`" class="block">
          <h2 class="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
            {{ article.title }}
          </h2>
          <p class="text-gray-600 mb-3 line-clamp-2">{{ article.description }}</p>
          <div class="flex items-center text-sm text-gray-500">
            <span class="mr-4">
              <i class="fas fa-calendar-alt mr-1"></i>
              {{ formatDate(article.date) }}
            </span>
            <span>
              <i class="fas fa-tag mr-1"></i>
              {{ article.category }}
            </span>
          </div>
        </router-link>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Article } from '@/types/global'

defineProps<{
  articles: Article[]
  loading?: boolean
}>()

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script> 
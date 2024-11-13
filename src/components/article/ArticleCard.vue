<template>
  <div class="masonry-item">
    <RouterLink :to="`/article/${article.link}`" class="article-link">
      <div class="article-image">
        <img :src="article.image" :alt="article.title" loading="lazy">
      </div>
      <div class="article-content">
        <div class="article-meta">
          <span class="article-date">
            <i class="far fa-calendar"></i>
            {{ formatDate(article.date) }}
          </span>
          <span class="article-category">
            <i class="fas fa-folder"></i>
            {{ article.category }}
          </span>
        </div>
        <h2 class="article-title">{{ article.title }}</h2>
        <p class="article-excerpt">{{ article.excerpt }}</p>
        <div class="article-tags">
          <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
        <div class="article-footer">
          <div class="article-stats">
            <span><i class="far fa-eye"></i>{{ article.views }}</span>
            <span><i class="far fa-heart"></i>{{ article.likes }}</span>
            <span><i class="far fa-comment"></i>{{ article.comments }}</span>
          </div>
          <div class="article-author">
            <img :src="article.authorAvatar" :alt="article.author">
            <span>{{ article.author }}</span>
          </div>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Article } from '@/types'

defineProps<{
  article: Article
}>()

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\//g, '-')
}
</script>

<style scoped lang="scss">
// 样式将从原有的 card.css 迁移过来
</style> 
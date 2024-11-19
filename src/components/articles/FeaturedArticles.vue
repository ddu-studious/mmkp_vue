<template>
  <div class="featured-articles">
    <el-carousel :interval="5000" type="card" height="400px">
      <el-carousel-item v-for="article in featuredArticles" :key="article.id">
        <div class="featured-card" :style="{ backgroundImage: `url(${article.cover})` }">
          <div class="featured-content">
            <div class="category-tag">{{ article.category }}</div>
            <h3 class="title">{{ article.title }}</h3>
            <p class="summary">{{ article.summary }}</p>
            <div class="meta">
              <span class="date">
                <el-icon><Calendar /></el-icon>
                {{ formatDate(article.date) }}
              </span>
              <span class="views">
                <el-icon><View /></el-icon>
                {{ formatNumber(article.views) }}阅读
              </span>
            </div>
            <router-link :to="`/article/${article.id}`" class="read-more">
              阅读全文
              <el-icon><ArrowRight /></el-icon>
            </router-link>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Calendar, View, ArrowRight } from '@element-plus/icons-vue'
import type { Article } from '@/types'
import { useArticleStore } from '@/stores/article'

const articleStore = useArticleStore()

const featuredArticles = computed(() => 
  articleStore.articles.filter(article => article.views > 1000).slice(0, 5)
)

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatNumber = (num: number) => {
  return num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num
}
</script>

<style scoped lang="scss">
.featured-articles {
  margin-bottom: 3rem;

  :deep(.el-carousel__item) {
    border-radius: 8px;
    overflow: hidden;
  }
}

.featured-card {
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7));
  }
}

.featured-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  color: white;

  .category-tag {
    display: inline-block;
    padding: 0.25rem 1rem;
    background: var(--el-color-primary);
    border-radius: 4px;
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }

  .title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    line-height: 1.4;
  }

  .summary {
    font-size: 1rem;
    margin-bottom: 1rem;
    opacity: 0.9;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .meta {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    opacity: 0.8;

    span {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }

  .read-more {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateX(4px);
    }
  }
}

// 响应式优化
@media (max-width: 768px) {
  .featured-articles {
    :deep(.el-carousel__item) {
      transform: scale(0.95);
    }
  }

  .featured-content {
    padding: 1.5rem;

    .title {
      font-size: 1.25rem;
    }

    .summary {
      font-size: 0.875rem;
    }
  }
}
</style> 
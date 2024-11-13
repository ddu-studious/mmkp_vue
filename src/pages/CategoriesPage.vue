<template>
  <div class="categories-page">
    <header class="page-header">
      <h1>文章分类</h1>
      <p class="page-desc">探索不同领域的技术文章</p>
    </header>

    <div class="categories-grid">
      <div 
        v-for="category in categories" 
        :key="category.id"
        class="category-section"
      >
        <div class="category-header">
          <div class="category-info">
            <div class="category-icon">
              <Icon :icon="category.icon" />
            </div>
            <div class="category-title">
              <h2>{{ category.name }}</h2>
              <p>{{ category.description }}</p>
            </div>
          </div>
          <router-link 
            :to="`/articles?category=${category.name}`" 
            class="view-all"
          >
            查看全部
            <Icon icon="ri:arrow-right-line" />
          </router-link>
        </div>

        <div class="articles-grid">
          <article 
            v-for="article in category.articles" 
            :key="article.id"
            class="article-card"
          >
            <div class="article-cover">
              <img :src="`https://picsum.photos/800/400?random=${article.id}`" :alt="article.title">
            </div>
            <div class="article-content">
              <h3 class="article-title">
                <router-link :to="`/article/${article.id}`">{{ article.title }}</router-link>
              </h3>
              <p class="article-summary">{{ article.summary }}</p>
              <div class="article-meta">
                <span class="publish-date">
                  <Icon icon="ri:calendar-line" />
                  {{ formatDate(article.date) }}
                </span>
                <span class="read-time">
                  <Icon icon="ri:time-line" />
                  {{ article.readTime }} 分钟阅读
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Article {
  id: number
  title: string
  summary: string
  date: string
  readTime: number
}

interface Category {
  id: number
  name: string
  description: string
  icon: string
  articles: Article[]
}

const categories = ref<Category[]>([
  {
    id: 1,
    name: '前端开发',
    description: '探索现代前端技术和最佳实践',
    icon: 'ri:code-box-line',
    articles: [
      {
        id: 1,
        title: 'Vue3 组合式 API 实战指南',
        summary: '深入了解 Vue3 组合式 API 的使用方法和最佳实践',
        date: '2024-03-20',
        readTime: 15
      },
      {
        id: 2,
        title: 'TypeScript 高级类型编程',
        summary: '探索 TypeScript 类型系统的高级特性和应用',
        date: '2024-03-19',
        readTime: 12
      }
    ]
  },
  {
    id: 2,
    name: '后端开发',
    description: 'Node.js、Python 等后端技术分享',
    icon: 'ri:server-line',
    articles: [
      {
        id: 3,
        title: 'Node.js 性能调优实践',
        summary: '探索 Node.js 应用性能优化的关键技术点',
        date: '2024-03-18',
        readTime: 20
      }
    ]
  },
  // 添加更多分类...
])

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped lang="scss">
.categories-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 4rem;

  h1 {
    font-size: 2.5rem;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }

  .page-desc {
    color: var(--text-secondary);
    font-size: 1.125rem;
  }
}

.categories-grid {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.category-section {
  .category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border-color);
  }

  .category-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .category-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: var(--primary-light);
    border-radius: 12px;
    color: var(--primary-color);

    .icon {
      width: 24px;
      height: 24px;
    }
  }

  .category-title {
    h2 {
      font-size: 1.5rem;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
    }

    p {
      color: var(--text-secondary);
      font-size: 0.875rem;
    }
  }

  .view-all {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--bg-secondary);
    color: var(--text-secondary);
    border-radius: 8px;
    text-decoration: none;
    font-size: 0.875rem;
    transition: all 0.3s ease;

    .icon {
      width: 1.25em;
      height: 1.25em;
      transition: transform 0.3s ease;
    }

    &:hover {
      background: var(--primary-light);
      color: var(--primary-color);
      transform: translateY(-2px);

      .icon {
        transform: translateX(4px);
      }
    }
  }
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.article-card {
  background: var(--bg-primary);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);

    .article-cover img {
      transform: scale(1.05);
    }
  }
}

.article-cover {
  width: 100%;
  height: 180px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
}

.article-content {
  padding: 1.5rem;
}

.article-title {
  margin: 0 0 1rem;
  
  a {
    color: var(--text-primary);
    text-decoration: none;
    font-size: 1.125rem;
    line-height: 1.4;
    
    &:hover {
      color: var(--primary-color);
    }
  }
}

.article-summary {
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-meta {
  display: flex;
  gap: 1rem;
  color: var(--text-tertiary);
  font-size: 0.75rem;

  .publish-date,
  .read-time {
    display: flex;
    align-items: center;
    gap: 0.4rem;

    .icon {
      width: 1em;
      height: 1em;
    }
  }
}

@media (max-width: 768px) {
  .categories-page {
    padding: 1rem;
  }

  .page-header {
    margin-bottom: 3rem;

    h1 {
      font-size: 2rem;
    }
  }

  .category-section {
    .category-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .view-all {
      width: 100%;
      justify-content: center;
    }
  }

  .articles-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style> 
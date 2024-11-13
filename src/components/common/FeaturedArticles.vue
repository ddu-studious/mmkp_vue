<template>
  <section class="featured-articles">
    <div class="section-header">
      <h2>精选文章</h2>
      <p class="section-desc">发现高质量的技术文章</p>
      <div class="filter-tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.value"
          class="tab-btn"
          :class="{ active: activeTab === tab.value }"
          @click="activeTab = tab.value"
        >
          <Icon :icon="tab.icon" />
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div class="article-grid">
      <article 
        v-for="article in filteredArticles" 
        :key="article.id" 
        class="article-card"
      >
        <div class="article-cover">
          <img :src="`https://picsum.photos/800/400?random=${article.id}`" :alt="article.title">
          <div class="article-category">
            <Icon :icon="getCategoryIcon(article.category)" />
            {{ article.category }}
          </div>
        </div>
        
        <div class="article-content">
          <div class="article-tags">
            <span v-for="tag in article.tags" :key="tag" class="tag">
              <Icon icon="ri:hashtag-line" />
              {{ tag }}
            </span>
          </div>
          
          <h3 class="article-title">
            <router-link :to="`/article/${article.id}`">{{ article.title }}</router-link>
          </h3>
          
          <p class="article-summary">{{ article.summary }}</p>
          
          <div class="article-meta">
            <div class="meta-left">
              <span class="publish-date">
                <Icon icon="ri:calendar-line" />
                {{ formatDate(article.date) }}
              </span>
              <span class="read-time">
                <Icon icon="ri:time-line" />
                {{ article.readTime }} 分钟阅读
              </span>
            </div>
            
            <div class="meta-right">
              <div class="article-author">
                <img 
                  :src="`https://picsum.photos/32/32?random=${article.author.id}`" 
                  :alt="article.author.name"
                  class="author-avatar"
                >
                <span class="author-name">{{ article.author.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>

    <div class="section-footer">
      <router-link to="/articles" class="view-all-btn">
        查看全部文章
        <Icon icon="ri:arrow-right-line" />
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Author {
  id: number
  name: string
}

interface Article {
  id: number
  title: string
  summary: string
  date: string
  readTime: number
  tags: string[]
  category: string
  author: Author
}

const tabs = [
  { label: '最新发布', value: 'latest', icon: 'ri:flashlight-line' },
  { label: '最多阅读', value: 'popular', icon: 'ri:fire-line' },
  { label: '编辑精选', value: 'featured', icon: 'ri:award-line' }
]

const activeTab = ref('latest')

const articles = ref<Article[]>([
  {
    id: 1,
    title: "Vue3 组合式 API 实战指南",
    summary: "深入了解 Vue3 组合式 API 的使用方法和最佳实践，包括响应式系统、生命周期钩子、依赖注入等核心概念",
    date: "2024-03-20",
    readTime: 15,
    category: "前端开发",
    tags: ["Vue.js", "组合式 API"],
    author: {
      id: 1,
      name: "张三"
    }
  },
  {
    id: 2,
    title: "TypeScript 高级类型编程",
    summary: "探索 TypeScript 类型系统的高级特性和应用，掌握类型编程的核心技巧",
    date: "2024-03-19",
    readTime: 12,
    category: "前端开发",
    tags: ["TypeScript", "前端开发"],
    author: {
      id: 2,
      name: "李四"
    }
  },
  {
    id: 3,
    title: "现代化前端工程实践",
    summary: "前端工程化最佳实践和工具链搭建指南，打造高效的开发流程",
    date: "2024-03-18",
    readTime: 20,
    category: "工程化",
    tags: ["工程化", "前端开发"],
    author: {
      id: 3,
      name: "王五"
    }
  }
])

const filteredArticles = computed(() => {
  // 实际项目中可以根据 activeTab 进行不同的排序或筛选
  return articles.value
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    '前端开发': 'ri:code-box-line',
    '后端开发': 'ri:server-line',
    '工程化': 'ri:tools-line',
    '性能优化': 'ri:speed-line'
  }
  return icons[category] || 'ri:article-line'
}
</script>

<style scoped lang="scss">
.featured-articles {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;

  h2 {
    font-size: 2.5rem;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }

  .section-desc {
    color: var(--text-secondary);
    margin-bottom: 2rem;
  }
}

.filter-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;

  .tab-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1.25rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-primary);
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.3s ease;

    .icon {
      width: 1.25em;
      height: 1.25em;
    }

    &:hover {
      border-color: var(--primary-color);
      color: var(--primary-color);
      transform: translateY(-2px);
    }

    &.active {
      background: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
    }
  }
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.article-card {
  background: var(--bg-primary);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }
}

.article-cover {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  .article-category {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.8rem;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    border-radius: 20px;
    color: white;
    font-size: 0.875rem;

    .icon {
      width: 1em;
      height: 1em;
    }
  }
}

.article-content {
  padding: 1.5rem;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.25rem 0.75rem;
    background: var(--primary-light);
    color: var(--primary-color);
    border-radius: 20px;
    font-size: 0.875rem;
    transition: all 0.3s ease;

    .icon {
      width: 1em;
      height: 1em;
    }

    &:hover {
      background: var(--primary-color);
      color: white;
      transform: translateY(-2px);
    }
  }
}

.article-title {
  margin: 0 0 1rem;
  
  a {
    color: var(--text-primary);
    text-decoration: none;
    font-size: 1.25rem;
    line-height: 1.4;
    
    &:hover {
      color: var(--primary-color);
    }
  }
}

.article-summary {
  color: var(--text-secondary);
  font-size: 0.9375rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
  font-size: 0.875rem;
}

.meta-left {
  display: flex;
  gap: 1rem;
  color: var(--text-tertiary);

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

.article-author {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  background: var(--bg-secondary);
  border-radius: 20px;
  transition: all 0.3s ease;

  &:hover {
    background: var(--primary-light);
    transform: translateY(-2px);
  }

  .author-avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
  }

  .author-name {
    color: var(--text-secondary);
    font-size: 0.875rem;
  }
}

.section-footer {
  text-align: center;
}

.view-all-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  background: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.2);
  }

  .icon {
    width: 1.25em;
    height: 1.25em;
  }
}

@media (max-width: 768px) {
  .featured-articles {
    padding: 3rem 1rem;
  }

  .section-header {
    h2 {
      font-size: 2rem;
    }
  }

  .filter-tabs {
    flex-wrap: wrap;
    gap: 0.5rem;

    .tab-btn {
      flex: 1;
      min-width: 120px;
    }
  }

  .article-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .article-meta {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
</style> 
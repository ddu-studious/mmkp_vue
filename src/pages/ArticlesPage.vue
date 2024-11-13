<template>
  <div class="articles-page">
    <header class="page-header">
      <h1>技术文章</h1>
      <div class="filters">
        <div class="filter-group">
          <button 
            v-for="category in categories"
            :key="category.name"
            class="filter-btn"
            :class="{ active: selectedCategory === category.name }"
            @click="selectCategory(category.name)"
          >
            <Icon :icon="category.icon" />
            {{ category.name }}
          </button>
        </div>
      </div>
    </header>

    <div class="articles-grid">
      <article 
        v-for="article in filteredArticles" 
        :key="article.id" 
        class="article-card"
      >
        <div class="article-cover">
          <img :src="`https://picsum.photos/800/400?random=${article.id}`" :alt="article.title">
        </div>
        <div class="article-content">
          <div class="article-tags">
            <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <h2 class="article-title">
            <router-link :to="`/article/${article.id}`">{{ article.title }}</router-link>
          </h2>
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
              <div class="article-stats">
                <span class="stat">
                  <Icon icon="ri:eye-line" />
                  {{ article.views }}
                </span>
                <span class="stat">
                  <Icon icon="ri:heart-3-line" />
                  {{ article.likes }}
                </span>
                <span class="stat">
                  <Icon icon="ri:message-3-line" />
                  {{ article.comments }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>

    <div class="load-more" v-if="hasMore">
      <button 
        class="load-more-btn"
        :class="{ loading: isLoading }"
        @click="loadMore"
        :disabled="isLoading"
      >
        <span>{{ isLoading ? '加载中...' : '加载更多' }}</span>
        <Icon 
          v-if="isLoading"
          icon="ri:loader-4-line" 
          class="spinning"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 分类数据
const categories = [
  { name: '全部', icon: 'ri:apps-line' },
  { name: '前端开发', icon: 'ri:code-box-line' },
  { name: '后端开发', icon: 'ri:server-line' },
  { name: '工程化', icon: 'ri:tools-line' },
  { name: '性能优化', icon: 'ri:speed-line' },
  { name: '架构设计', icon: 'ri:layout-line' }
]

// 状态
const selectedCategory = ref(route.query.category || '全部')
const isLoading = ref(false)
const hasMore = ref(true)
const page = ref(1)

// 文章数据
const articles = ref([
  {
    id: 1,
    title: "Vue3 组合式 API 实战指南",
    summary: "深入了解 Vue3 组合式 API 的使用方法和最佳实践，包括响应式系统、生命周期钩子、依赖注入等核心概念",
    date: "2024-03-20",
    readTime: 15,
    tags: ["Vue.js", "组合式 API"],
    views: 1280,
    likes: 326,
    comments: 58,
    category: "前端开发"
  },
  {
    id: 2,
    title: "Node.js 性能调优实践",
    summary: "探索 Node.js 应用性能优化的关键技术点，包括内存管理、异步操作优化、集群部署等实用技巧",
    date: "2024-03-19",
    readTime: 20,
    tags: ["Node.js", "性能优化"],
    views: 960,
    likes: 245,
    comments: 42,
    category: "后端开发"
  },
  // 添加更多文章...
])

// 计算属性：过滤后的文章列表
const filteredArticles = computed(() => {
  if (selectedCategory.value === '全部') return articles.value
  return articles.value.filter(article => article.category === selectedCategory.value)
})

// 方法
const selectCategory = (category: string) => {
  selectedCategory.value = category
  router.push({ query: { category: category === '全部' ? undefined : category }})
  page.value = 1
  hasMore.value = true
}

const loadMore = async () => {
  if (isLoading.value) return
  
  isLoading.value = true
  page.value++
  
  try {
    // 模拟加载延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 模拟没有更多数据
    if (page.value > 3) {
      hasMore.value = false
    }
  } finally {
    isLoading.value = false
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 监听路由变化
watch(
  () => route.query.category,
  (newCategory) => {
    selectedCategory.value = newCategory || '全部'
  }
)

onMounted(() => {
  // 初始化加载
})
</script>

<style scoped lang="scss">
.articles-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 3rem;
  text-align: center;

  h1 {
    font-size: 2.5rem;
    color: var(--text-primary);
    margin-bottom: 2rem;
  }
}

.filters {
  .filter-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }

  .filter-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
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

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.article-card {
  background: var(--bg-primary);
  border-radius: 12px;
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
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
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
    padding: 0.25rem 0.75rem;
    background: var(--primary-light);
    color: var(--primary-color);
    border-radius: 16px;
    font-size: 0.75rem;
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
  font-size: 0.875rem;
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
  color: var(--text-tertiary);

  .meta-left {
    display: flex;
    gap: 1rem;
  }

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

.article-stats {
  display: flex;
  gap: 1rem;

  .stat {
    display: flex;
    align-items: center;
    gap: 0.4rem;

    .icon {
      width: 1em;
      height: 1em;
    }
  }
}

.load-more {
  text-align: center;
  margin: 3rem 0;
}

.load-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  background: var(--primary-color);
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .spinning {
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .articles-page {
    padding: 1rem;
  }

  .page-header {
    margin-bottom: 2rem;

    h1 {
      font-size: 2rem;
    }
  }

  .filters {
    overflow-x: auto;
    padding-bottom: 1rem;

    .filter-group {
      flex-wrap: nowrap;
      justify-content: flex-start;
      padding: 0 1rem;
    }
  }

  .articles-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style> 
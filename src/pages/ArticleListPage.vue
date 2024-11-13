<template>
  <div class="article-list">
    <header class="page-header">
      <h1>技术文章</h1>
      <div class="filters">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="搜索文章..."
          class="search-input"
        >
        <select v-model="selectedCategory" class="category-select">
          <option value="">全部分类</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
    </header>

    <LoadingSpinner v-if="loading" :loading="loading" />
    <ErrorMessage v-if="error" :error="error" />

    <div class="articles" v-else>
      <article v-for="article in filteredArticles" :key="article.id" class="article-item">
        <h2>{{ article.title }}</h2>
        <div class="meta">
          <span class="date">{{ formatDate(article.date) }}</span>
          <span class="category">{{ article.category }}</span>
          <span class="read-time">{{ article.readTime }} 分钟阅读</span>
        </div>
        <p class="summary">{{ article.summary }}</p>
        <div class="tags">
          <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
        <router-link :to="`/article/${article.id}`" class="read-more">
          阅读全文
          <span class="arrow">→</span>
        </router-link>
      </article>
    </div>

    <Pagination 
      v-if="totalPages > 1"
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useArticleStore } from '@/stores/article'
import { formatDate } from '@/utils/date'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import Pagination from '@/components/common/Pagination.vue'
import { useImage } from '@/composables/useImage'

const articleStore = useArticleStore()
const { articles, loading, error, currentPage, totalPages } = storeToRefs(articleStore)

const searchQuery = ref('')
const selectedCategory = ref('')

const categories = ["前端开发", "后端技术", "工程化", "算法", "系统设计"]

const { getThumbnailImage } = useImage()

const filteredArticles = computed(() => {
  return articles.value.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = !selectedCategory.value || article.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const handlePageChange = (page: number) => {
  articleStore.fetchArticles({
    page,
    category: selectedCategory.value,
    query: searchQuery.value
  })
}

onMounted(() => {
  articleStore.fetchArticles({
    page: 1,
    limit: 10
  })
})

const articles = computed(() => {
  return articles.value.map(article => ({
    ...article,
    thumbnail: getThumbnailImage() // 使用 400x300 的随机缩略图
  }))
})
</script>

<style scoped lang="scss">
.article-list {
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2rem;
    color: var(--text-primary);
    margin-bottom: 1.5rem;
    font-family: "楷体", "STKaiti", serif;
  }
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.search-input,
.category-select {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-primary);
  color: var(--text-primary);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
}

.search-input {
  flex: 1;
}

.article-item {
  padding: 2rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  h2 {
    font-size: 1.5rem;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }
}

.meta {
  display: flex;
  gap: 1rem;
  color: var(--text-tertiary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.summary {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: var(--bg-secondary);
  border-radius: 4px;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.read-more {
  display: inline-flex;
  align-items: center;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  
  .arrow {
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }

  &:hover .arrow {
    transform: translateX(4px);
  }
}
</style> 
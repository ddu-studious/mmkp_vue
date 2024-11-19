<template>
  <div class="articles-page">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-center mb-8 text-gray-900">
        文章列表
      </h1>
      
      <!-- 搜索栏 -->
      <div class="max-w-2xl mx-auto mb-8">
        <div class="relative">
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="搜索文章..."
            class="w-full px-4 py-3 rounded-lg border border-gray-200 
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-all duration-300"
          />
          <i class="fas fa-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>
      
      <!-- 工具栏 -->
      <div class="mb-8 flex flex-wrap justify-between items-center gap-4">
        <!-- 分类筛选 -->
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="cat in categories" 
            :key="cat"
            @click="selectedCategory = cat"
            :class="[
              'px-4 py-2 rounded-full transition-colors text-sm',
              selectedCategory === cat 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ cat }}
          </button>
        </div>

        <!-- 排序选项 -->
        <select 
          v-model="sortBy"
          class="px-4 py-2 rounded-lg border border-gray-200 
                 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                 bg-white cursor-pointer"
        >
          <option value="date">最新发布</option>
          <option value="views">最多阅读</option>
        </select>
      </div>

      <ArticleList 
        :articles="displayedArticles" 
        :loading="loading" 
      />

      <!-- 分页控件 -->
      <div v-if="totalPages > 1" class="flex justify-center mt-8 space-x-2">
        <button 
          @click="currentPage = Math.max(1, currentPage - 1)"
          class="pagination-btn"
          :disabled="currentPage === 1"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        
        <button 
          v-for="page in displayedPages" 
          :key="page"
          @click="currentPage = page"
          :class="[
            'pagination-btn',
            currentPage === page 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          {{ page }}
        </button>

        <button 
          @click="currentPage = Math.min(totalPages, currentPage + 1)"
          class="pagination-btn"
          :disabled="currentPage === totalPages"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>

      <BackToTop />
    </div>
  </div>
</template>

<style scoped>
.articles-page {
  @apply min-h-screen bg-gray-50;
}

.pagination-btn {
  @apply px-4 py-2 rounded transition-colors disabled:opacity-50 
         disabled:cursor-not-allowed min-w-[40px] flex items-center justify-center;
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ArticleList from '@/components/articles/ArticleList.vue'
import BackToTop from '@/components/BackToTop.vue'
import type { Article } from '@/types/global'

const articles = ref<Article[]>([])
const loading = ref(true)
const currentPage = ref(1)
const selectedCategory = ref('全部')
const categories = ['全部', '技术', '生活', '随笔']
const pageSize = 10

// 新增搜索和排序功能
const searchQuery = ref('')
const sortBy = ref('date')

// 计算属性：过滤和排序后的文章
const filteredAndSortedArticles = computed(() => {
  let result = articles.value

  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(article => 
      article.title.toLowerCase().includes(query) ||
      article.description.toLowerCase().includes(query)
    )
  }

  // 分类过滤
  if (selectedCategory.value !== '全部') {
    result = result.filter(article => 
      article.category === selectedCategory.value
    )
  }

  // 排序
  return [...result].sort((a, b) => {
    if (sortBy.value === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
    return (b.views || 0) - (a.views || 0)
  })
})

// 分页逻辑优化
const displayedArticles = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredAndSortedArticles.value.slice(start, start + pageSize)
})

const totalPages = computed(() => 
  Math.ceil(filteredAndSortedArticles.value.length / pageSize)
)

// 显示的页码范围
const displayedPages = computed(() => {
  const delta = 2
  const range = []
  const rangeWithDots = []
  let l

  for (let i = 1; i <= totalPages.value; i++) {
    if (
      i === 1 || 
      i === totalPages.value || 
      i >= currentPage.value - delta && 
      i <= currentPage.value + delta
    ) {
      range.push(i)
    }
  }

  range.forEach(i => {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l !== 1) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(i)
    l = i
  })

  return rangeWithDots
})
</script>
 
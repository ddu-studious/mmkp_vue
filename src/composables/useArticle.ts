import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Article, SearchParams } from '@/types'
import { apiService } from '@/services/api'
import { useNotification } from './useNotification'

export function useArticle() {
  const router = useRouter()
  const notification = useNotification()
  
  const articles = ref<Article[]>([])
  const currentArticle = ref<Article | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const totalPages = ref(1)
  const hasMore = ref(false)

  const featuredArticles = computed(() => 
    articles.value.filter(article => article.featured)
  )

  const latestArticles = computed(() => 
    [...articles.value].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ).slice(0, 5)
  )

  const fetchArticles = async (params: SearchParams) => {
    loading.value = true
    error.value = null
    try {
      const response = await apiService.getArticles(params)
      articles.value = response.data
      currentPage.value = response.pagination.page
      totalPages.value = response.pagination.totalPages
      hasMore.value = currentPage.value < totalPages.value
      return response.data
    } catch (e) {
      const message = e instanceof Error ? e.message : '获取文章列表失败'
      error.value = message
      notification.error(message)
      return []
    } finally {
      loading.value = false
    }
  }

  const fetchArticleById = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      const response = await apiService.getArticleById(id)
      currentArticle.value = response.data
      return response.data
    } catch (e) {
      const message = e instanceof Error ? e.message : '获取文章详情失败'
      error.value = message
      notification.error(message)
      router.push('/404')
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    articles,
    currentArticle,
    loading,
    error,
    currentPage,
    totalPages,
    hasMore,
    featuredArticles,
    latestArticles,
    fetchArticles,
    fetchArticleById
  }
} 
import { defineStore } from 'pinia'
import type { Article, SearchParams } from '@/types'
import { articleApi } from '@/services'
import { getErrorMessage } from '@/utils/error'

interface ArticleState {
  articles: Article[]
  currentArticle: Article | null
  loading: boolean
  error: string | null
  currentPage: number
  totalPages: number
  itemsPerPage: number
}

export const useArticleStore = defineStore('article', {
  state: (): ArticleState => ({
    articles: [],
    currentArticle: null,
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10
  }),

  getters: {
    featuredArticles: (state): Article[] => 
      state.articles.filter(article => article.tags.includes('featured')),
    
    getArticleById: (state) => (id: number): Article | undefined =>
      state.articles.find(article => article.id === id)
  },

  actions: {
    async fetchArticles(params: SearchParams) {
      this.loading = true
      this.error = null
      try {
        const { data, page, totalPages } = await articleApi.getArticles(params)
        this.articles = data
        this.currentPage = page
        this.totalPages = totalPages
      } catch (e) {
        this.error = getErrorMessage(e)
      } finally {
        this.loading = false
      }
    },

    async fetchArticleById(id: number) {
      this.loading = true
      this.error = null
      try {
        const article = await articleApi.getArticleById(id)
        this.currentArticle = article
        return article
      } catch (e) {
        this.error = getErrorMessage(e)
        return null
      } finally {
        this.loading = false
      }
    }
  }
}) 
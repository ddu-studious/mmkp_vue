import { defineStore } from 'pinia'
import type { Article } from '@/types'

interface ArticleState {
  articles: Article[]
  loading: boolean
  currentPage: number
  itemsPerPage: number
  total: number
}

export const useArticleStore = defineStore('article', {
  state: (): ArticleState => ({
    articles: [],
    loading: false,
    currentPage: 1,
    itemsPerPage: 10,
    total: 0
  }),

  getters: {
    hasMore: (state) => {
      return state.articles.length < state.total
    }
  },

  actions: {
    async fetchArticles(params?: { 
      page?: number
      category?: string 
      tags?: string[]
      sort?: string
      search?: string
    }) {
      try {
        this.loading = true
        // TODO: 实现实际的 API 调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 模拟数据
        this.articles = [
          {
            id: 1,
            title: 'Vue3 组合式 API 实战指南',
            summary: '深入了解 Vue3 组合式 API 的使用方法和最佳实践...',
            content: '',
            date: '2024-03-20',
            category: 'frontend',
            tags: ['Vue3', 'TypeScript'],
            views: 1234,
            comments: 23,
            cover: 'https://picsum.photos/800/400?random=1',
            readTime: 15,
            author: {
              id: 1,
              name: '张三'
            }
          },
          // 添加更多模拟数据...
        ]
        
        this.total = 100 // 模拟总数
      } catch (error) {
        console.error('Failed to fetch articles:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchMoreArticles() {
      if (this.loading || !this.hasMore) return
      
      this.currentPage++
      await this.fetchArticles({ page: this.currentPage })
    }
  }
}) 
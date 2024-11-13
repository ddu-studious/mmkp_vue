import { BaseApiService } from './base'
import type { Article, SearchParams, ArticleStats } from '@/types/article'
import type { ApiResponse, PaginatedResponse } from '@/types/api'

export class ArticleService extends BaseApiService {
  constructor() {
    super({ baseURL: '/articles' })
  }

  async getArticles(params: SearchParams): Promise<PaginatedResponse<Article[]>> {
    return this.get('', { params })
  }

  async getArticleById(id: number): Promise<ApiResponse<Article>> {
    return this.get(`/${id}`)
  }

  async createArticle(article: Partial<Article>): Promise<ApiResponse<Article>> {
    return this.post('', article)
  }

  async updateArticle(id: number, article: Partial<Article>): Promise<ApiResponse<Article>> {
    return this.put(`/${id}`, article)
  }

  async deleteArticle(id: number): Promise<ApiResponse<void>> {
    return this.delete(`/${id}`)
  }

  async getFeaturedArticles(): Promise<ApiResponse<Article[]>> {
    return this.get('/featured')
  }

  async getRelatedArticles(id: number): Promise<ApiResponse<Article[]>> {
    return this.get(`/${id}/related`)
  }

  async getArticleStats(id: number): Promise<ApiResponse<ArticleStats>> {
    return this.get(`/${id}/stats`)
  }

  async likeArticle(id: number): Promise<ApiResponse<void>> {
    return this.post(`/${id}/like`)
  }

  async unlikeArticle(id: number): Promise<ApiResponse<void>> {
    return this.post(`/${id}/unlike`)
  }

  async viewArticle(id: number): Promise<ApiResponse<void>> {
    return this.post(`/${id}/view`)
  }

  async searchArticles(query: string): Promise<ApiResponse<Article[]>> {
    return this.get('/search', { params: { query } })
  }

  async getArticlesByTag(tag: string): Promise<ApiResponse<Article[]>> {
    return this.get('/tags', { params: { tag } })
  }

  async getArticlesByCategory(category: string): Promise<ApiResponse<Article[]>> {
    return this.get('/categories', { params: { category } })
  }
}

export const articleService = new ArticleService() 
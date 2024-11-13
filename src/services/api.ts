import axios from 'axios'
import type { ApiService, ApiResponse, PaginatedResponse } from '@/types/api'
import type { Article, Comment, Category, Tag, SearchParams } from '@/types'
import { storage } from '@/utils/storage'

class ApiServiceImpl implements ApiService {
  private instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  constructor() {
    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        const token = storage.get<string>('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    this.instance.interceptors.response.use(
      (response) => response.data,
      (error) => Promise.reject(error)
    )
  }

  async getArticles(params: SearchParams): Promise<PaginatedResponse<Article>> {
    return this.instance.get('/articles', { params })
  }

  async getArticleById(id: number): Promise<ApiResponse<Article>> {
    return this.instance.get(`/articles/${id}`)
  }

  async createArticle(article: Partial<Article>): Promise<ApiResponse<Article>> {
    return this.instance.post('/articles', article)
  }

  async updateArticle(id: number, article: Partial<Article>): Promise<ApiResponse<Article>> {
    return this.instance.put(`/articles/${id}`, article)
  }

  async deleteArticle(id: number): Promise<ApiResponse<void>> {
    return this.instance.delete(`/articles/${id}`)
  }

  async getComments(articleId: number): Promise<ApiResponse<Comment[]>> {
    return this.instance.get(`/articles/${articleId}/comments`)
  }

  async createComment(articleId: number, comment: Partial<Comment>): Promise<ApiResponse<Comment>> {
    return this.instance.post(`/articles/${articleId}/comments`, comment)
  }

  async getCategories(): Promise<ApiResponse<Category[]>> {
    return this.instance.get('/categories')
  }

  async getTags(): Promise<ApiResponse<Tag[]>> {
    return this.instance.get('/tags')
  }
}

export const apiService = new ApiServiceImpl()
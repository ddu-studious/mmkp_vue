import type { AxiosRequestConfig } from 'axios'
import type { Article, Comment, Category, Tag } from '@/types'

// API 响应基础接口
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  meta?: {
    timestamp: string
    duration: number
    cache?: {
      hit: boolean
      key: string
      age: number
    }
  }
}

// 分页响应接口
export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    total: number
    page: number
    pageSize: number
    totalPages: number
    hasMore: boolean
  }
}

// API 错误响应
export interface ApiErrorResponse {
  code: number
  message: string
  details?: Record<string, any>
}

// API 请求配置
export interface ApiRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean
  skipErrorHandler?: boolean
  cache?: boolean | number
}

// API 认证响应
export interface AuthResponse extends ApiResponse<{
  token: string
  refreshToken: string
  user: User
}> {}

// API 文章响应
export interface ArticleResponse extends ApiResponse<Article> {}
export interface ArticleListResponse extends PaginatedResponse<Article> {}

// API 评论响应
export interface CommentResponse extends ApiResponse<Comment> {}
export interface CommentListResponse extends ApiResponse<Comment[]> {}

// API 上传响应
export interface UploadResponse extends ApiResponse<{
  url: string
  filename: string
  size: number
  mimeType: string
}> {}

// API 搜索响应
export interface SearchResponse<T> extends PaginatedResponse<T> {
  meta: {
    query: string
    took: number
    total: number
  }
}

// API 服务接口
export interface ApiService {
  getArticles(params: SearchParams): Promise<PaginatedResponse<Article>>
  getArticleById(id: number): Promise<ApiResponse<Article>>
  createArticle(article: Partial<Article>): Promise<ApiResponse<Article>>
  updateArticle(id: number, article: Partial<Article>): Promise<ApiResponse<Article>>
  deleteArticle(id: number): Promise<ApiResponse<void>>
  getComments(articleId: number): Promise<ApiResponse<Comment[]>>
  createComment(articleId: number, comment: Partial<Comment>): Promise<ApiResponse<Comment>>
  getCategories(): Promise<ApiResponse<Category[]>>
  getTags(): Promise<ApiResponse<Tag[]>>
}
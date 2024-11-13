export interface BaseResponse {
  code: number
  message: string
}

export interface DataResponse<T> extends BaseResponse {
  data: T
}

export interface ListResponse<T> extends BaseResponse {
  data: T[]
  pagination: {
    total: number
    page: number
    pageSize: number
    totalPages: number
  }
}

export interface ErrorResponse extends BaseResponse {
  details?: Record<string, any>
  stack?: string
}

export interface UploadResponse extends BaseResponse {
  data: {
    url: string
    filename: string
    size: number
    mimeType: string
  }
}

export interface SearchResponse<T> extends BaseResponse {
  data: T[]
  total: number
  took: number
  suggestions?: string[]
}

export interface StatsResponse extends BaseResponse {
  data: {
    views: number
    likes: number
    comments: number
    shares: number
    uniqueVisitors: number
  }
}

export interface AuthResponse extends BaseResponse {
  data: {
    token: string
    refreshToken: string
    expiresIn: number
    user: {
      id: number
      name: string
      email: string
      role: string
    }
  }
}

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

// 搜索响应接口
export interface SearchResponse<T> extends PaginatedResponse<T> {
  meta: {
    query: string
    took: number
    total: number
    filters?: Record<string, any>
  }
}

// 文件上传响应
export interface UploadResponse {
  url: string
  filename: string
  size: number
  mimeType: string
  meta?: {
    width?: number
    height?: number
    duration?: number
  }
}

// 统计响应
export interface StatsResponse {
  views: number
  likes: number
  comments: number
  shares: number
  timeRange: {
    start: string
    end: string
  }
}

// 错误响应
export interface ErrorResponse {
  code: string
  message: string
  details?: Record<string, any>
  stack?: string
} 
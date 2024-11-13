import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { ApiResponse } from './api'

// API 服务配置
export interface ApiServiceConfig {
  baseURL: string
  timeout?: number
  headers?: Record<string, string>
  withCredentials?: boolean
}

// API 缓存配置
export interface ApiCacheConfig {
  enabled: boolean
  maxAge: number
  exclude?: string[]
  storage?: 'memory' | 'local' | 'session'
}

// API 请求选项
export interface ApiRequestOptions extends AxiosRequestConfig {
  cache?: boolean | number
  retry?: number
  retryDelay?: number
  skipAuth?: boolean
  skipErrorHandler?: boolean
}

// API 响应处理器
export interface ApiResponseHandler<T = any> {
  onSuccess?: (response: ApiResponse<T>) => void | Promise<void>
  onError?: (error: Error) => void | Promise<void>
  onFinally?: () => void | Promise<void>
}

// API 拦截器配置
export interface ApiInterceptorConfig {
  onRequest?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>
  onRequestError?: (error: any) => any
  onResponse?: (response: AxiosResponse) => AxiosResponse
  onResponseError?: (error: any) => any
}

// API 服务状态
export interface ApiServiceStatus {
  online: boolean
  latency: number
  lastCheck: string
  version: string
  features: string[]
}

// API 批量操作结果
export interface ApiBatchResult<T> {
  success: T[]
  failed: Array<{
    item: T
    error: Error
  }>
  total: number
  successCount: number
  failureCount: number
} 
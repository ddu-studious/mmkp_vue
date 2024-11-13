import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { ApiResponse, ApiError, ApiResponseMeta } from '@/types/service'
import { storage } from './storage'
import { getErrorMessage } from './error'

// 创建请求 URL
export function createUrl(baseUrl: string, path: string, params?: Record<string, any>): string {
  const url = new URL(path, baseUrl)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value != null) {
        url.searchParams.append(key, String(value))
      }
    })
  }
  return url.toString()
}

// 格式化请求数据
export function formatRequestData(data: any): FormData | Record<string, any> {
  if (data instanceof FormData) {
    return data
  }

  if (data && typeof data === 'object' && Object.keys(data).some(key => data[key] instanceof File)) {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value != null) {
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, item)
          })
        } else {
          formData.append(key, value)
        }
      }
    })
    return formData
  }

  return data
}

// 处理 API 响应
export function handleApiResponse<T>(response: ApiResponse<T>): T {
  if (response.code !== 200) {
    throw new Error(response.message)
  }
  return response.data
}

// 处理 API 错误
export function handleApiError(error: ApiError): never {
  const message = getErrorMessage(error)
  console.error('API Error:', error)
  throw new Error(message)
}

// 获取认证头
export function getAuthHeader(): Record<string, string> {
  const token = storage.get<string>('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// 创建取消令牌
export function createCancelToken() {
  const controller = new AbortController()
  return {
    signal: controller.signal,
    cancel: () => controller.abort()
  }
}

// 创建 API 错误
export function createApiError(
  message: string,
  code: string = 'UNKNOWN_ERROR',
  statusCode?: number,
  details?: Record<string, any>
): ApiError {
  const error = new Error(message) as ApiError
  error.code = code
  error.statusCode = statusCode
  error.details = details
  return error
}

// 解析 API 错误
export function parseApiError(error: any): ApiError {
  if (error.response) {
    const { data, status } = error.response
    return createApiError(
      data.message || error.message,
      data.code || `HTTP_${status}`,
      status,
      data.details
    )
  }

  if (error.request) {
    return createApiError(
      'Network Error',
      'NETWORK_ERROR'
    )
  }

  return createApiError(
    error.message,
    'REQUEST_ERROR'
  )
}

// 创建响应元数据
export function createResponseMeta(response: AxiosResponse): ApiResponseMeta {
  const startTime = response.config.metadata?.startTime
  return {
    timestamp: new Date().toISOString(),
    duration: startTime ? Date.now() - startTime : 0,
    cache: response.headers['x-cache'] ? {
      hit: response.headers['x-cache'] === 'HIT',
      key: response.headers['x-cache-key'],
      age: parseInt(response.headers['x-cache-age'] || '0', 10)
    } : undefined
  }
}

// 格式化请求参数
export function formatRequestParams(params: Record<string, any>): Record<string, string> {
  const result: Record<string, string> = {}
  
  Object.entries(params).forEach(([key, value]) => {
    if (value != null) {
      if (Array.isArray(value)) {
        result[key] = value.join(',')
      } else if (typeof value === 'object') {
        result[key] = JSON.stringify(value)
      } else {
        result[key] = String(value)
      }
    }
  })
  
  return result
}

// 创建缓存键
export function createCacheKey(config: Record<string, any>): string {
  const { url, method, params, data } = config
  const parts = [method?.toUpperCase(), url]
  
  if (params) {
    parts.push(JSON.stringify(params))
  }
  
  if (data) {
    parts.push(JSON.stringify(data))
  }
  
  return parts.join(':')
}

// 解析 API 响应
export function parseApiResponse<T>(response: AxiosResponse): T {
  const { data, status } = response
  
  if (status >= 200 && status < 300) {
    return data.data
  }
  
  throw createApiError(
    data.message || 'Request failed',
    data.code || `HTTP_${status}`,
    status,
    data.details
  )
} 
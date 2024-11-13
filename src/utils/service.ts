import type { AxiosResponse } from 'axios'
import type { ApiResponse, ApiError } from '@/types/api'
import type { ApiRequestOptions } from '@/types/service'

// 创建 API 错误
export function createApiError(
  message: string,
  code: string = 'UNKNOWN_ERROR',
  statusCode?: number,
  details?: Record<string, any>
): ApiError {
  const error = new Error(message) as ApiError
  error.name = 'ApiError'
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
      data?.message || error.message,
      data?.code || `HTTP_${status}`,
      status,
      data?.details
    )
  }

  if (error.request) {
    return createApiError(
      'Network Error',
      'NETWORK_ERROR',
      undefined,
      {
        url: error.config?.url,
        method: error.config?.method
      }
    )
  }

  return createApiError(
    error.message,
    'REQUEST_ERROR',
    undefined,
    error.config
  )
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

// 创建请求选项
export function createRequestOptions(options: Partial<ApiRequestOptions> = {}): ApiRequestOptions {
  return {
    timeout: 10000,
    withCredentials: true,
    validateStatus: (status: number) => status >= 200 && status < 300,
    ...options
  }
}

// 解析响应数据
export function parseApiResponse<T>(response: AxiosResponse): ApiResponse<T> {
  const { data, status } = response
  
  if (status >= 200 && status < 300) {
    return {
      code: data.code || status,
      message: data.message || 'success',
      data: data.data,
      meta: {
        timestamp: new Date().toISOString(),
        ...data.meta
      }
    }
  }
  
  throw createApiError(
    data.message || 'Request failed',
    data.code || `HTTP_${status}`,
    status,
    data.details
  )
} 
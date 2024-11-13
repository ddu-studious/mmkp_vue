import type { AxiosResponse } from 'axios'
import type { ApiResponse, ApiResponseMeta } from '@/types/service'

export function createSuccessResponse<T>(
  data: T,
  message = 'success',
  meta?: Partial<ApiResponseMeta>
): ApiResponse<T> {
  return {
    code: 200,
    message,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta
    }
  }
}

export function createErrorResponse(
  message: string,
  code = 500,
  details?: Record<string, any>
): ApiResponse<null> {
  return {
    code,
    message,
    data: null,
    meta: {
      timestamp: new Date().toISOString(),
      details
    }
  }
}

export function parseResponse<T>(response: AxiosResponse): T {
  if (response.status >= 200 && response.status < 300) {
    return response.data.data
  }
  throw new Error(response.data.message || '请求失败')
}

export function formatResponseTime(duration: number): string {
  if (duration < 1000) {
    return `${duration}ms`
  }
  return `${(duration / 1000).toFixed(2)}s`
}

export function getResponseSize(response: AxiosResponse): string {
  const contentLength = response.headers['content-length']
  if (!contentLength) return 'unknown'

  const bytes = parseInt(contentLength, 10)
  if (bytes < 1024) return `${bytes}B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)}KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)}MB`
} 
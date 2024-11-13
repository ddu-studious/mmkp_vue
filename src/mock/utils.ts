import type { MockResponse, MockConfig } from '@/types/mock'
import { MOCK_CONFIG } from './config'

// 创建成功响应
export function createSuccessResponse<T>(
  data: T,
  message = 'success',
  meta?: Record<string, any>
): MockResponse<T> {
  return {
    code: MOCK_CONFIG.response.successCode,
    message,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta
    }
  }
}

// 创建错误响应
export function createErrorResponse(
  code: number,
  message: string,
  details?: Record<string, any>
): MockResponse<null> {
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

// 生成分页数据
export function createPaginatedResponse<T>(
  items: T[],
  page: number,
  limit: number,
  total: number
) {
  const totalPages = Math.ceil(total / limit)
  const hasMore = page < totalPages

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasMore
    }
  }
}

// 随机延迟
export function randomDelay(min = 100, max = 1000): Promise<void> {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min
  return new Promise(resolve => setTimeout(resolve, delay))
}

// 模拟网络错误
export function simulateNetworkError(probability = 0.1): boolean {
  return Math.random() < probability
}

// 过滤和排序数据
export function filterAndSort<T>(
  items: T[],
  filters: Record<string, any>,
  sort?: { field: keyof T; order: 'asc' | 'desc' }
): T[] {
  let result = [...items]

  // 应用过滤
  Object.entries(filters).forEach(([key, value]) => {
    if (value != null) {
      result = result.filter(item => {
        const itemValue = (item as any)[key]
        if (Array.isArray(value)) {
          return value.includes(itemValue)
        }
        if (typeof itemValue === 'string') {
          return itemValue.toLowerCase().includes(String(value).toLowerCase())
        }
        return itemValue === value
      })
    }
  })

  // 应用排序
  if (sort) {
    result.sort((a, b) => {
      const aValue = a[sort.field]
      const bValue = b[sort.field]
      const order = sort.order === 'asc' ? 1 : -1
      return aValue < bValue ? -order : order
    })
  }

  return result
} 
import { apiService } from './api'

// 导出 API 服务实例
export const articleApi = apiService
export const authApi = apiService
export const commentApi = apiService

// 统一处理 API 响应
export const handleResponse = <T>(response: any): T => {
  if (response.code !== 200) {
    throw new Error(response.message || '请求失败')
  }
  return response.data
}

// 统一处理分页参数
export const createPaginationParams = (page: number, limit: number) => ({
  page,
  limit,
  offset: (page - 1) * limit
})

// 统一处理查询参数
export const createQueryParams = (params: Record<string, any>) => {
  const query: Record<string, string> = {}
  
  Object.entries(params).forEach(([key, value]) => {
    if (value != null && value !== '') {
      if (Array.isArray(value)) {
        query[key] = value.join(',')
      } else {
        query[key] = String(value)
      }
    }
  })
  
  return query
}

// 统一处理文件上传
export const createFormData = (data: Record<string, any>) => {
  const formData = new FormData()
  
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value)
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        formData.append(`${key}[${index}]`, item)
      })
    } else if (typeof value === 'object' && value !== null) {
      formData.append(key, JSON.stringify(value))
    } else if (value != null) {
      formData.append(key, String(value))
    }
  })
  
  return formData
} 
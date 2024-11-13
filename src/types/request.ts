export interface ApiRequestConfig {
  baseURL?: string
  timeout?: number
  headers?: Record<string, string>
  params?: Record<string, any>
  data?: any
  signal?: AbortSignal
  cache?: boolean | number
  retry?: number
  retryDelay?: number
  withCredentials?: boolean
}

export interface PaginationParams {
  page?: number
  pageSize?: number
  offset?: number
  limit?: number
}

export interface SortParams {
  field: string
  order: 'asc' | 'desc'
}

export interface FilterParams {
  field: string
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'like'
  value: any
}

export interface SearchParams extends PaginationParams {
  query?: string
  filters?: FilterParams[]
  sort?: SortParams[]
  fields?: string[]
  highlight?: boolean
}

export interface UploadParams {
  file: File
  type?: 'image' | 'video' | 'document'
  folder?: string
  filename?: string
  metadata?: Record<string, any>
}

export interface BatchOperationParams<T = any> {
  operation: 'create' | 'update' | 'delete'
  items: T[]
  options?: Record<string, any>
} 
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { API_CONFIG } from './config'
import { setupInterceptors } from './interceptors'
import { storage } from '@/utils/storage'
import type { ApiServiceConfig, ApiCacheConfig } from '@/types/service'

export class BaseApiService {
  protected instance: AxiosInstance
  protected baseUrl: string
  protected cacheConfig: ApiCacheConfig

  constructor(config: Partial<ApiServiceConfig> = {}) {
    this.baseUrl = config.baseURL || API_CONFIG.baseURL
    this.instance = axios.create({
      ...API_CONFIG,
      ...config
    })
    this.cacheConfig = {
      enabled: true,
      maxAge: 5 * 60 * 1000,
      exclude: []
    }
    setupInterceptors(this.instance)
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig) {
    if (this.cacheConfig.enabled && !this.cacheConfig.exclude?.includes(url)) {
      const cacheKey = this.getCacheKey(url, config)
      const cached = storage.get<T>(cacheKey)
      if (cached) return cached
    }

    const response = await this.instance.get<T>(url, config)
    
    if (this.cacheConfig.enabled) {
      const cacheKey = this.getCacheKey(url, config)
      storage.set(cacheKey, response.data, this.cacheConfig.maxAge)
    }

    return response.data
  }

  protected async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    const response = await this.instance.post<T>(url, data, config)
    return response.data
  }

  protected async put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    const response = await this.instance.put<T>(url, data, config)
    return response.data
  }

  protected async delete<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this.instance.delete<T>(url, config)
    return response.data
  }

  protected getCacheKey(url: string, config?: AxiosRequestConfig): string {
    const params = config?.params ? JSON.stringify(config.params) : ''
    return `api:${url}:${params}`
  }
} 
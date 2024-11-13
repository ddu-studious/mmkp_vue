import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { storage } from './storage'
import { getErrorMessage } from './error'
import type { ApiResponse } from '@/types/api'

export class HttpClient {
  private instance: AxiosInstance
  private abortControllers: Map<string, AbortController>

  constructor(config: AxiosRequestConfig = {}) {
    this.instance = axios.create({
      timeout: 10000,
      ...config
    })
    this.abortControllers = new Map()

    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        // 添加取消令牌
        const controller = new AbortController()
        config.signal = controller.signal
        this.abortControllers.set(this.getRequestKey(config), controller)

        // 添加认证头
        const token = storage.get<string>('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        return config
      },
      (error) => {
        console.error('Request error:', error)
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        // 清理取消令牌
        this.removeController(response.config)
        return response.data
      },
      (error) => {
        this.removeController(error.config)
        console.error('Response error:', getErrorMessage(error))
        return Promise.reject(error)
      }
    )
  }

  private getRequestKey(config: AxiosRequestConfig): string {
    return `${config.method}_${config.url}_${JSON.stringify(config.params)}`
  }

  private removeController(config: AxiosRequestConfig) {
    const key = this.getRequestKey(config)
    this.abortControllers.delete(key)
  }

  public cancelRequest(config: AxiosRequestConfig) {
    const key = this.getRequestKey(config)
    const controller = this.abortControllers.get(key)
    if (controller) {
      controller.abort()
      this.abortControllers.delete(key)
    }
  }

  public cancelAllRequests() {
    this.abortControllers.forEach(controller => controller.abort())
    this.abortControllers.clear()
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config)
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post(url, data, config)
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.put(url, data, config)
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, config)
  }

  async request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.instance.request(config)
  }
}

export const http = new HttpClient({
  baseURL: import.meta.env.VITE_API_BASE_URL
}) 
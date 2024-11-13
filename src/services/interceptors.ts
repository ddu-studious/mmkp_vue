import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useNotification } from '@/composables/useNotification'
import { storage } from '@/utils/storage'
import { createApiError } from '@/utils/error'

export function setupInterceptors(instance: AxiosInstance) {
  // 请求拦截器
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // 添加认证头
      const token = storage.get<string>('token')
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`
      }

      // 添加时间戳防止缓存
      if (config.method === 'get') {
        config.params = {
          ...config.params,
          _t: Date.now()
        }
      }

      // 添加请求开始时间
      config.metadata = {
        startTime: Date.now()
      }

      return config
    },
    (error: AxiosError) => {
      return Promise.reject(createApiError(error))
    }
  )

  // 响应拦截器
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // 计算请求耗时
      const startTime = response.config.metadata?.startTime
      if (startTime) {
        response.data.meta = {
          ...response.data.meta,
          duration: Date.now() - startTime
        }
      }

      return response
    },
    async (error: AxiosError) => {
      const notification = useNotification()
      const authStore = useAuthStore()

      // 处理特定错误
      if (error.response) {
        const { status } = error.response

        switch (status) {
          case 401:
            await authStore.logout()
            notification.error('登录已过期，请重新登录')
            window.location.href = '/login'
            break
          case 403:
            notification.error('没有权限执行此操作')
            break
          case 404:
            notification.error('请求的资源不存在')
            break
          case 429:
            notification.error('请求过于频繁，请稍后再试')
            break
          case 500:
            notification.error('服务器错误，请稍后重试')
            break
          default:
            notification.error('请求失败，请稍后重试')
        }
      } else if (error.request) {
        notification.error('网络错误，请检查网络连接')
      } else {
        notification.error('请求配置错误')
      }

      return Promise.reject(createApiError(error))
    }
  )
} 
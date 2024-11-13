import type { AxiosRequestConfig } from 'axios'

export const API_CONFIG: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  validateStatus: (status: number) => status >= 200 && status < 300
}

export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    me: '/auth/me'
  },
  articles: {
    list: '/articles',
    detail: (id: number) => `/articles/${id}`,
    create: '/articles',
    update: (id: number) => `/articles/${id}`,
    delete: (id: number) => `/articles/${id}`,
    comments: (id: number) => `/articles/${id}/comments',
    like: (id: number) => `/articles/${id}/like',
    unlike: (id: number) => `/articles/${id}/unlike'
  },
  comments: {
    create: (articleId: number) => `/articles/${articleId}/comments',
    update: (id: number) => `/comments/${id}`,
    delete: (id: number) => `/comments/${id}`,
    like: (id: number) => `/comments/${id}/like',
    unlike: (id: number) => `/comments/${id}/unlike'
  },
  users: {
    profile: '/users/profile',
    avatar: '/users/avatar',
    settings: '/users/settings',
    notifications: '/users/notifications'
  },
  search: {
    articles: '/search/articles',
    tags: '/search/tags',
    suggestions: '/search/suggestions'
  },
  upload: {
    image: '/upload/image',
    file: '/upload/file'
  }
}

export const CACHE_CONFIG = {
  enabled: true,
  maxAge: 5 * 60 * 1000, // 5分钟
  exclude: [
    '/auth/',
    '/users/profile',
    '/upload/'
  ]
}

export const ERROR_MESSAGES = {
  network: '网络错误，请检查网络连接',
  timeout: '请求超时，请稍后重试',
  server: '服务器错误，请稍后重试',
  unauthorized: '未授权，请先登录',
  forbidden: '没有权限执行此操作',
  notFound: '请求的资源不存在',
  validation: '请求参数验证失败',
  default: '请求失败，请稍后重试'
}

export const RETRY_CONFIG = {
  maxRetries: 3,
  delay: 1000,
  methods: ['GET'],
  statusCodes: [408, 500, 502, 503, 504]
} 
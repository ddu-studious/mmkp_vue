import type { Article, Comment, Category, Tag, User } from './index'

// Mock 数据集
export interface MockDataset {
  users: User[]
  articles: Article[]
  comments: Comment[]
  categories: Category[]
  tags: Tag[]
}

// Mock 配置
export interface MockConfig {
  delay: {
    default: number
    list: number
    detail: number
    create: number
    update: number
    delete: number
  }
  pagination: {
    defaultPage: number
    defaultLimit: number
    maxLimit: number
  }
  errors: {
    notFound: ErrorConfig
    unauthorized: ErrorConfig
    forbidden: ErrorConfig
    badRequest: ErrorConfig
    serverError: ErrorConfig
  }
  response: {
    successCode: number
    errorCode: number
    defaultMessage: string
  }
}

interface ErrorConfig {
  code: number
  message: string
}

// Mock 响应类型
export interface MockResponse<T = any> {
  code: number
  message: string
  data: T
  meta?: {
    timestamp: string
    [key: string]: any
  }
}

// Mock 请求处理器类型
export type MockHandler = (
  req: MockRequest,
  res: MockResponse,
  ctx: MockContext
) => Promise<MockResponse> | MockResponse

// Mock 请求类型
export interface MockRequest {
  url: URL
  method: string
  headers: Headers
  params: URLSearchParams
  body?: any
}

// Mock 上下文类型
export interface MockContext {
  delay: (ms?: number) => MockContext
  status: (code: number) => MockContext
  json: <T>(data: T) => MockResponse<T>
  set: (headers: Record<string, string>) => MockContext
} 
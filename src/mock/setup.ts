import { setupWorker } from 'msw'
import { handlers } from './handlers'
import { mockData } from './data'
import { MOCK_CONFIG } from './config'

// 初始化 Mock 服务
export async function setupMockService() {
  if (import.meta.env.VITE_ENABLE_MOCK !== 'true') {
    return
  }

  const worker = setupWorker(...handlers)

  // 配置 Service Worker
  await worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: '/mockServiceWorker.js',
      options: {
        scope: '/'
      }
    },
    quiet: import.meta.env.PROD
  })

  // 添加响应拦截器
  worker.events.on('response:mocked', (response, requestId) => {
    if (!import.meta.env.PROD) {
      console.log(`[MSW] Mocked response for ${requestId}:`, response)
    }
  })

  // 添加请求拦截器
  worker.events.on('request:start', (request) => {
    if (!import.meta.env.PROD) {
      console.log(`[MSW] Intercepted ${request.method} ${request.url}`)
    }
  })

  // 添加错误处理
  worker.events.on('unhandledException', (error) => {
    console.error('[MSW] An exception occurred:', error)
  })

  console.log('[MSW] Mock Service Worker started')

  return {
    worker,
    mockData,
    config: MOCK_CONFIG
  }
}

// 重置 Mock 数据
export function resetMockData() {
  Object.assign(mockData, {
    users: [],
    articles: [],
    comments: [],
    categories: [],
    tags: []
  })
}

// 导出工具函数
export * from './utils' 
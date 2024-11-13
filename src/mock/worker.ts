import { setupWorker, rest } from 'msw'
import { handlers } from './handlers'

// 创建 Mock Service Worker 实例
export const worker = setupWorker(...handlers)

// 启动 Mock 服务
export async function setupMock() {
  if (import.meta.env.VITE_ENABLE_MOCK === 'true') {
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js',
        options: {
          scope: '/'
        }
      }
    })

    // 添加响应拦截器
    worker.events.on('response:mocked', (response, requestId) => {
      console.log(`[MSW] Mocked response for ${requestId}:`, response)
    })

    worker.events.on('request:unhandled', (request, requestId) => {
      console.warn(`[MSW] Unhandled request: ${request.method} ${request.url}`)
    })

    console.log('[MSW] Mock Service Worker started')
  }
}

// 停止 Mock 服务
export async function stopMock() {
  if (worker) {
    await worker.stop()
    console.log('[MSW] Mock Service Worker stopped')
  }
}

// 重置 Mock 服务
export async function resetMock() {
  if (worker) {
    await worker.resetHandlers()
    console.log('[MSW] Mock Service Worker handlers reset')
  }
} 
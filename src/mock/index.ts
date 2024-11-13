import { setupWorker } from 'msw'
import { handlers } from './handlers'

// 创建 Service Worker 实例
export const worker = setupWorker(...handlers)

// 启动 Mock 服务
export async function setupMock() {
  if (import.meta.env.VITE_ENABLE_MOCK === 'true') {
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js'
      }
    })
    console.log('Mock Service Worker started')
  }
}

// 生成模拟数据
export { mockData } from './data' 
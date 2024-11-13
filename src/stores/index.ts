import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { App } from 'vue'

const pinia = createPinia()

// 持久化插件
pinia.use(piniaPluginPersistedstate)

export function setupStore(app: App) {
  app.use(pinia)
}

export * from './article'
export * from './comment'
export * from './theme'
export * from './user' 
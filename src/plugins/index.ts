import type { App } from 'vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import Pagination from '@/components/common/Pagination.vue'
import BackToTop from '@/components/common/BackToTop.vue'

const globalComponents = {
  LoadingSpinner,
  ErrorMessage,
  Pagination,
  BackToTop
}

export function registerGlobalComponents(app: App) {
  Object.entries(globalComponents).forEach(([name, component]) => {
    app.component(name, component)
  })
}

export function setupPlugins(app: App) {
  registerGlobalComponents(app)
} 
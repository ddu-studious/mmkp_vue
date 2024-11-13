/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_DESCRIPTION: string
  readonly VITE_ENABLE_MOCK: string
  readonly VITE_STORAGE_PREFIX: string
  readonly VITE_ENABLE_PWA: string
  readonly VITE_GA_ID?: string
  readonly VITE_SENTRY_DSN?: string
  readonly VITE_API_TIMEOUT?: string
  readonly VITE_API_RETRY_COUNT?: string
  readonly VITE_API_RETRY_DELAY?: string
  readonly VITE_UPLOAD_MAX_SIZE?: string
  readonly VITE_UPLOAD_ALLOWED_TYPES?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.md' {
  const content: string
  export default content
}

declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.json' {
  const value: any
  export default value
} 
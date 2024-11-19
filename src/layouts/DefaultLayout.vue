<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
    <AppNav />
    <main class="flex-1 w-full">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <slot></slot>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppNav from '../components/AppNav.vue'
import AppFooter from '../components/AppFooter.vue'
</script>

<style>
:root {
  --primary-color: #3b82f6;
  --primary-hover: #2563eb;
  --bg-primary: #ffffff;
  --bg-primary-dark: #111827;
  --text-primary: #1f2937;
  --text-primary-dark: #f3f4f6;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @apply text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900;
}

/* Element Plus 暗色模式覆盖 */
html.dark {
  --el-bg-color: #1f2937;
  --el-bg-color-overlay: #374151;
  --el-text-color-primary: #f3f4f6;
  --el-text-color-regular: #e5e7eb;
  --el-border-color: #374151;
  --el-border-color-light: #4b5563;
  --el-fill-color-blank: #111827;
  color-scheme: dark;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-transparent;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-700 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-gray-600;
}

/* 过渡效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Element Plus 组件样式覆盖 */
:deep(.el-button) {
  @apply !font-normal;
}

:deep(.el-input__wrapper) {
  @apply !shadow-none dark:!bg-gray-800 dark:!border-gray-700;
}

:deep(.el-input__inner) {
  @apply dark:!text-gray-200 dark:placeholder:text-gray-500;
}

:deep(.el-button--primary) {
  @apply !bg-blue-600 hover:!bg-blue-700 dark:!bg-blue-500 dark:hover:!bg-blue-600;
}

:deep(.el-tooltip__trigger) {
  @apply !inline-flex;
}
</style> 
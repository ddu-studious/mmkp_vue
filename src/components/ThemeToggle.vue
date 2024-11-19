<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

// 监听系统主题变化
const watchSystemTheme = () => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      themeStore.setTheme(e.matches)
    }
  })
}

onMounted(() => {
  themeStore.initTheme()
  watchSystemTheme()
})
</script>

<template>
  <button 
    @click="themeStore.toggleTheme"
    class="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    title="切换主题"
  >
    <Icon 
      :icon="themeStore.isDark ? 'ph:moon-fill' : 'ph:sun-fill'"
      class="w-5 h-5 text-gray-500 dark:text-gray-400 transition-colors"
    />
  </button>
</template> 
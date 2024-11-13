import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

  const toggleTheme = () => {
    isDark.value = !isDark.value
    document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  }

  // 初始化主题
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    isDark.value = savedTheme === 'dark'
    document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  }

  return {
    isDark,
    toggleTheme,
    initTheme
  }
}) 
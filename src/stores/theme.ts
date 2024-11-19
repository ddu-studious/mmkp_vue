import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

  // 初始化主题
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    setTheme(savedTheme === 'dark' || (!savedTheme && prefersDark))
  }

  // 设置主题
  const setTheme = (dark: boolean) => {
    isDark.value = dark
    localStorage.setItem('theme', dark ? 'dark' : 'light')
    
    // 强制移除后再添加，确保类名正确应用
    document.documentElement.classList.remove('dark')
    if (dark) {
      document.documentElement.classList.add('dark')
    }
    
    // 更新 meta theme-color
    updateMetaThemeColor(dark)
  }

  // 更新 meta theme-color
  const updateMetaThemeColor = (dark: boolean) => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', dark ? '#111827' : '#ffffff')
    }
  }

  // 切换主题
  const toggleTheme = () => {
    setTheme(!isDark.value)
  }

  // 监听主题变化
  watch(isDark, (newValue) => {
    setTheme(newValue)
  }, { immediate: true })

  return {
    isDark,
    initTheme,
    setTheme,
    toggleTheme
  }
}) 
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'

export function useTheme() {
  const themeStore = useThemeStore()
  const { mode, colorScheme, fontSize, systemDark } = storeToRefs(themeStore)

  const isDark = computed(() => {
    if (mode.value === 'system') {
      return systemDark.value
    }
    return mode.value === 'dark'
  })

  const toggleTheme = () => {
    const newMode = isDark.value ? 'light' : 'dark'
    themeStore.setMode(newMode)
  }

  const setColorScheme = (scheme: 'default' | 'high-contrast') => {
    themeStore.setColorScheme(scheme)
  }

  const setFontSize = (size: 'small' | 'medium' | 'large') => {
    themeStore.setFontSize(size)
  }

  return {
    mode,
    colorScheme,
    fontSize,
    isDark,
    toggleTheme,
    setColorScheme,
    setFontSize
  }
} 
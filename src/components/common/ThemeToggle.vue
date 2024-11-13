<template>
  <button 
    class="theme-toggle" 
    @click="toggleTheme"
    :title="isDark ? '切换到亮色模式' : '切换到暗色模式'"
  >
    <Icon :icon="isDark ? 'ri:sun-line' : 'ri:moon-line'" />
  </button>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)
const { toggleTheme } = themeStore
</script>

<style scoped lang="scss">
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0.25rem;
  border: none;
  border-radius: 0.375rem;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: var(--primary-color);
    background: var(--bg-secondary);
  }

  .icon {
    width: 1.25rem;
    height: 1.25rem;
    fill: currentColor;
  }
}
</style> 
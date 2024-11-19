import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

export const useAppStore = defineStore('app', () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const startLoading = () => {
    loading.value = true
  }

  const stopLoading = () => {
    loading.value = false
  }

  const setError = (message: string) => {
    error.value = message
    ElMessage.error(message)
  }

  const clearError = () => {
    error.value = null
  }

  return {
    loading,
    error,
    startLoading,
    stopLoading,
    setError,
    clearError
  }
}) 
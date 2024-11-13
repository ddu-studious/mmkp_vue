import { ref } from 'vue'

export function useLoading(initialState = false) {
  const isLoading = ref(initialState)
  const error = ref<string | null>(null)

  const withLoading = async <T>(fn: () => Promise<T>): Promise<T | null> => {
    isLoading.value = true
    error.value = null

    try {
      const result = await fn()
      return result
    } catch (e) {
      error.value = e instanceof Error ? e.message : '操作失败'
      return null
    } finally {
      isLoading.value = false
    }
  }

  const startLoading = () => {
    isLoading.value = true
    error.value = null
  }

  const stopLoading = () => {
    isLoading.value = false
  }

  const setError = (message: string) => {
    error.value = message
  }

  const clearError = () => {
    error.value = null
  }

  return {
    isLoading,
    error,
    withLoading,
    startLoading,
    stopLoading,
    setError,
    clearError
  }
} 
import { ref, watch } from 'vue'
import { storage } from '@/utils/storage'

interface CacheOptions {
  key: string
  maxAge?: number
  immediate?: boolean
}

export function useCache<T>(
  fetcher: () => Promise<T>,
  options: CacheOptions
) {
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetch = async (force = false) => {
    const cached = !force && storage.get<T>(options.key)
    if (cached) {
      data.value = cached
      return cached
    }

    loading.value = true
    error.value = null

    try {
      const result = await fetcher()
      data.value = result
      if (options.maxAge) {
        storage.set(options.key, result, options.maxAge)
      }
      return result
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('Unknown error')
      throw error.value
    } finally {
      loading.value = false
    }
  }

  const refresh = () => fetch(true)
  const clear = () => storage.remove(options.key)

  if (options.immediate) {
    fetch()
  }

  return {
    data,
    loading,
    error,
    fetch,
    refresh,
    clear
  }
} 
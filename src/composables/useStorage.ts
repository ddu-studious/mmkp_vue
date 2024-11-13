import { ref, watch } from 'vue'
import { storage } from '@/utils/storage'

export function useStorage<T>(key: string, initialValue: T, options?: { 
  expire?: number 
}) {
  const storedValue = storage.get<T>(key)
  const value = ref<T>(storedValue ?? initialValue)

  watch(value, (newValue) => {
    if (newValue === null) {
      storage.remove(key)
    } else {
      storage.set(key, newValue, options?.expire)
    }
  }, { deep: true })

  return value
} 
import { ref } from 'vue'

export function useDebounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
) {
  const timeoutId = ref<number | null>(null)

  function debounced(...args: Parameters<T>) {
    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
    }

    timeoutId.value = window.setTimeout(() => {
      fn(...args)
      timeoutId.value = null
    }, delay)
  }

  return debounced
} 
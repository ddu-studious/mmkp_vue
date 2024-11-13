import { ref, watch } from 'vue'
import type { Ref } from 'vue'

export function useThrottle<T>(value: Ref<T>, delay: number = 300) {
  const throttledValue = ref<T>(value.value) as Ref<T>
  let lastTime = Date.now()
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  watch(value, (newValue) => {
    const now = Date.now()
    const remaining = delay - (now - lastTime)

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    if (remaining <= 0) {
      throttledValue.value = newValue
      lastTime = now
    } else {
      timeoutId = setTimeout(() => {
        throttledValue.value = newValue
        lastTime = Date.now()
      }, remaining)
    }
  })

  const cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  const flush = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      throttledValue.value = value.value
      lastTime = Date.now()
    }
  }

  return {
    throttledValue,
    cancel,
    flush
  }
} 
import { onMounted, onUnmounted, type Ref } from 'vue'

export function useClickOutside(
  elementRef: Ref<HTMLElement | undefined>,
  callback: (event: MouseEvent) => void
) {
  const handleClick = (event: MouseEvent) => {
    if (elementRef.value && !elementRef.value.contains(event.target as Node)) {
      callback(event)
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClick)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClick)
  })

  return {
    handleClick
  }
} 
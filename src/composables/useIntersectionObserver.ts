import { ref, onMounted, onUnmounted } from 'vue'

interface Options extends IntersectionObserverInit {
  immediate?: boolean
  once?: boolean
}

export function useIntersectionObserver(
  target: HTMLElement | null,
  callback: (entry: IntersectionObserverEntry) => void,
  options: Options = {}
) {
  const { 
    root = null,
    rootMargin = '0px',
    threshold = 0,
    immediate = true,
    once = false
  } = options

  const isSupported = window && 'IntersectionObserver' in window
  const isIntersecting = ref(false)
  let observer: IntersectionObserver | null = null

  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  const observe = () => {
    if (!isSupported || !target) return

    cleanup()

    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        isIntersecting.value = entry.isIntersecting

        if (entry.isIntersecting) {
          callback(entry)
          if (once) {
            cleanup()
          }
        }
      },
      {
        root,
        rootMargin,
        threshold
      }
    )

    observer.observe(target)
  }

  onMounted(() => {
    if (immediate) {
      observe()
    }
  })

  onUnmounted(() => {
    cleanup()
  })

  return {
    isSupported,
    isIntersecting,
    observe,
    cleanup
  }
} 
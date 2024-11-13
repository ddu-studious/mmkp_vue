import { ref, onMounted, onUnmounted } from 'vue'

interface ScrollOptions {
  threshold?: number
  throttle?: number
}

export function useScroll(options: ScrollOptions = {}) {
  const { threshold = 0, throttle = 16 } = options

  const scrollY = ref(0)
  const scrollDirection = ref<'up' | 'down' | null>(null)
  const isScrolling = ref(false)
  const reachedBottom = ref(false)
  let lastScrollY = window.scrollY
  let ticking = false
  let scrollTimeout: number | null = null

  const updateScroll = () => {
    scrollY.value = window.scrollY
    scrollDirection.value = window.scrollY > lastScrollY ? 'down' : 'up'
    lastScrollY = window.scrollY

    // 检查是否到达底部
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    reachedBottom.value = windowHeight + window.scrollY >= documentHeight - threshold

    // 更新滚动状态
    if (scrollTimeout) {
      window.clearTimeout(scrollTimeout)
    }
    isScrolling.value = true
    scrollTimeout = window.setTimeout(() => {
      isScrolling.value = false
    }, 150)

    ticking = false
  }

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateScroll()
        ticking = false
      })
      ticking = true
    }
  }

  const scrollTo = (options: ScrollToOptions) => {
    window.scrollTo({
      behavior: 'smooth',
      ...options
    })
  }

  const scrollToTop = () => {
    scrollTo({ top: 0 })
  }

  const scrollToBottom = () => {
    scrollTo({ top: document.documentElement.scrollHeight })
  }

  const scrollToElement = (element: HTMLElement) => {
    element.scrollIntoView({ behavior: 'smooth' })
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    updateScroll()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    if (scrollTimeout) {
      window.clearTimeout(scrollTimeout)
    }
  })

  return {
    scrollY,
    scrollDirection,
    isScrolling,
    reachedBottom,
    scrollTo,
    scrollToTop,
    scrollToBottom,
    scrollToElement
  }
} 
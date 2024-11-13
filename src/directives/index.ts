import type { App, DirectiveBinding } from 'vue'

interface ExtendedHTMLElement extends HTMLElement {
  _clickOutsideHandler?: (event: Event) => void
  _longPressHandler?: {
    start: (e: Event) => void
    cancel: () => void
  }
  _intersectionObserver?: IntersectionObserver
}

// 点击外部指令
const clickOutside = {
  mounted(el: ExtendedHTMLElement, binding: DirectiveBinding) {
    el._clickOutsideHandler = (event: Event) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event)
      }
    }
    document.addEventListener('click', el._clickOutsideHandler)
  },
  unmounted(el: ExtendedHTMLElement) {
    if (el._clickOutsideHandler) {
      document.removeEventListener('click', el._clickOutsideHandler)
      delete el._clickOutsideHandler
    }
  }
}

// 图片懒加载指令
const lazyLoad = {
  mounted(el: ExtendedHTMLElement, binding: DirectiveBinding) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (el instanceof HTMLImageElement) {
            el.src = binding.value
          }
          observer.unobserve(el)
        }
      })
    })
    el._intersectionObserver = observer
    observer.observe(el)
  },
  unmounted(el: ExtendedHTMLElement) {
    if (el._intersectionObserver) {
      el._intersectionObserver.disconnect()
      delete el._intersectionObserver
    }
  }
}

// 长按指令
const longPress = {
  mounted(el: ExtendedHTMLElement, binding: DirectiveBinding) {
    if (typeof binding.value !== 'function') {
      console.warn(`v-long-press expects a function, got ${binding.value}`)
      return
    }

    let pressTimer: number | null = null

    const start = (e: Event) => {
      if (e.type === 'click') return
      if (pressTimer === null) {
        pressTimer = window.setTimeout(() => {
          binding.value(e)
        }, binding.arg ? Number(binding.arg) : 500)
      }
    }

    const cancel = () => {
      if (pressTimer) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
    }

    el._longPressHandler = { start, cancel }

    el.addEventListener('mousedown', start)
    el.addEventListener('touchstart', start)
    el.addEventListener('click', cancel)
    el.addEventListener('mouseout', cancel)
    el.addEventListener('touchend', cancel)
    el.addEventListener('touchcancel', cancel)
  },
  unmounted(el: ExtendedHTMLElement) {
    if (el._longPressHandler) {
      const { start, cancel } = el._longPressHandler
      el.removeEventListener('mousedown', start)
      el.removeEventListener('touchstart', start)
      el.removeEventListener('click', cancel)
      el.removeEventListener('mouseout', cancel)
      el.removeEventListener('touchend', cancel)
      el.removeEventListener('touchcancel', cancel)
      delete el._longPressHandler
    }
  }
}

export function setupDirectives(app: App) {
  app.directive('click-outside', clickOutside)
  app.directive('lazy', lazyLoad)
  app.directive('long-press', longPress)
} 
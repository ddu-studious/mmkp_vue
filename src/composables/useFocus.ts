import { ref, onMounted, type Ref } from 'vue'

interface UseFocusOptions {
  autoFocus?: boolean
  selectOnFocus?: boolean
}

export function useFocus(options: UseFocusOptions = {}) {
  const { autoFocus = false, selectOnFocus = false } = options
  const elementRef = ref<HTMLElement>()
  const isFocused = ref(false)

  const focus = () => {
    if (elementRef.value instanceof HTMLElement) {
      elementRef.value.focus()
      if (selectOnFocus && 'select' in elementRef.value) {
        ;(elementRef.value as HTMLInputElement | HTMLTextAreaElement).select()
      }
    }
  }

  const blur = () => {
    if (elementRef.value instanceof HTMLElement) {
      elementRef.value.blur()
    }
  }

  const handleFocus = () => {
    isFocused.value = true
  }

  const handleBlur = () => {
    isFocused.value = false
  }

  onMounted(() => {
    if (autoFocus) {
      focus()
    }
  })

  return {
    elementRef,
    isFocused,
    focus,
    blur,
    handleFocus,
    handleBlur
  }
} 
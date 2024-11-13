import { onMounted, onUnmounted } from 'vue'

type KeyHandler = (event: KeyboardEvent) => void
type KeyBinding = {
  key: string
  handler: KeyHandler
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
  meta?: boolean
}

export function useKeyboard(bindings: KeyBinding[]) {
  const handleKeyDown = (event: KeyboardEvent) => {
    for (const binding of bindings) {
      const keyMatch = event.key.toLowerCase() === binding.key.toLowerCase()
      const ctrlMatch = binding.ctrl ? event.ctrlKey : !event.ctrlKey
      const shiftMatch = binding.shift ? event.shiftKey : !event.shiftKey
      const altMatch = binding.alt ? event.altKey : !event.altKey
      const metaMatch = binding.meta ? event.metaKey : !event.metaKey

      if (keyMatch && ctrlMatch && shiftMatch && altMatch && metaMatch) {
        event.preventDefault()
        binding.handler(event)
      }
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })
}

// 预定义的键盘快捷键
export const KEYBOARD_SHORTCUTS = {
  SEARCH: { key: 'k', ctrl: true },
  THEME: { key: 't', ctrl: true },
  HOME: { key: 'h', ctrl: true },
  BACK: { key: 'Escape' },
  SAVE: { key: 's', ctrl: true }
} 
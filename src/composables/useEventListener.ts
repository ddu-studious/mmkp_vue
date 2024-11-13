import { onMounted, onUnmounted } from 'vue'

type EventTarget = Window | Document | HTMLElement | Element

export function useEventListener<K extends keyof WindowEventMap>(
  target: Window,
  event: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): void
export function useEventListener<K extends keyof DocumentEventMap>(
  target: Document,
  event: K,
  handler: (event: DocumentEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): void
export function useEventListener<K extends keyof HTMLElementEventMap>(
  target: HTMLElement,
  event: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): void
export function useEventListener(
  target: EventTarget,
  event: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
) {
  onMounted(() => {
    target.addEventListener(event, handler, options)
  })

  onUnmounted(() => {
    target.removeEventListener(event, handler, options)
  })
} 
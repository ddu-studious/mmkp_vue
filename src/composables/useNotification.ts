import { useNotificationStore } from '@/stores/notification'
import type { NotificationType } from '@/stores/notification'

export function useNotification() {
  const store = useNotificationStore()

  const show = (message: string, type: NotificationType = 'info', duration = 3000) => {
    return store.show(message, type, duration)
  }

  const success = (message: string, duration?: number) => {
    return store.success(message, duration)
  }

  const error = (message: string, duration?: number) => {
    return store.error(message, duration)
  }

  const warning = (message: string, duration?: number) => {
    return store.warning(message, duration)
  }

  const info = (message: string, duration?: number) => {
    return store.info(message, duration)
  }

  const remove = (id: number) => {
    store.remove(id)
  }

  const clear = () => {
    store.clear()
  }

  return {
    show,
    success,
    error,
    warning,
    info,
    remove,
    clear
  }
} 
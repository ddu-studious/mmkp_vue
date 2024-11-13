import { defineStore } from 'pinia'

export type NotificationType = 'success' | 'error' | 'warning' | 'info'

interface Notification {
  id: number
  type: NotificationType
  message: string
  duration?: number
}

interface NotificationState {
  notifications: Notification[]
  counter: number
}

export const useNotificationStore = defineStore('notification', {
  state: (): NotificationState => ({
    notifications: [],
    counter: 0
  }),

  actions: {
    show(message: string, type: NotificationType = 'info', duration = 3000) {
      const id = ++this.counter
      
      this.notifications.push({
        id,
        type,
        message,
        duration
      })

      if (duration > 0) {
        setTimeout(() => {
          this.remove(id)
        }, duration)
      }

      return id
    },

    success(message: string, duration?: number) {
      return this.show(message, 'success', duration)
    },

    error(message: string, duration?: number) {
      return this.show(message, 'error', duration)
    },

    warning(message: string, duration?: number) {
      return this.show(message, 'warning', duration)
    },

    info(message: string, duration?: number) {
      return this.show(message, 'info', duration)
    },

    remove(id: number) {
      const index = this.notifications.findIndex(n => n.id === id)
      if (index > -1) {
        this.notifications.splice(index, 1)
      }
    },

    clear() {
      this.notifications = []
    }
  }
}) 
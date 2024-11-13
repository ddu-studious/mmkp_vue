import { BaseApiService } from './base'
import type { User } from '@/types'
import type { ApiResponse } from '@/types/api'

export class UserService extends BaseApiService {
  constructor() {
    super('/users')
  }

  async getCurrentUser() {
    return this.get<User>('/me')
  }

  async updateProfile(data: Partial<User>) {
    return this.put<User>('/me', data)
  }

  async updateAvatar(file: File) {
    const formData = new FormData()
    formData.append('avatar', file)
    return this.post<{ url: string }>('/me/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  async updatePassword(data: { oldPassword: string; newPassword: string }) {
    return this.put<void>('/me/password', data)
  }

  async getNotifications() {
    return this.get<Notification[]>('/me/notifications')
  }

  async markNotificationAsRead(id: number) {
    return this.put<void>(`/me/notifications/${id}/read`)
  }

  async markAllNotificationsAsRead() {
    return this.put<void>('/me/notifications/read-all')
  }

  async getPreferences() {
    return this.get<User['preferences']>('/me/preferences')
  }

  async updatePreferences(data: Partial<User['preferences']>) {
    return this.put<User['preferences']>('/me/preferences', data)
  }
}

export const userService = new UserService() 
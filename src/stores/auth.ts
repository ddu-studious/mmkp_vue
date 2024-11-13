import { defineStore } from 'pinia'
import type { User } from '@/types/user'
import { authApi } from '@/services/auth'
import { storage } from '@/utils/storage'
import { getErrorMessage } from '@/utils/error'

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: storage.get('user'),
    token: storage.get('token'),
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin'
  },

  actions: {
    async login(email: string, password: string, remember: boolean = false) {
      this.loading = true
      this.error = null
      try {
        const { user, token } = await authApi.login({ email, password, remember })
        this.user = user
        this.token = token
        storage.set('user', user)
        storage.set('token', token)
      } catch (e) {
        this.error = getErrorMessage(e)
        throw e
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        await authApi.logout()
      } finally {
        this.user = null
        this.token = null
        storage.remove('user')
        storage.remove('token')
      }
    },

    async getCurrentUser() {
      if (!this.token) return null
      
      this.loading = true
      try {
        const user = await authApi.getCurrentUser()
        this.user = user
        storage.set('user', user)
        return user
      } catch (e) {
        this.error = getErrorMessage(e)
        return null
      } finally {
        this.loading = false
      }
    }
  }
}) 
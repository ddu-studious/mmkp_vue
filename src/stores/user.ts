import { defineStore } from 'pinia'
import type { User } from '@/types'

interface UserState {
  currentUser: User | null
  token: string | null
  preferences: {
    theme: 'light' | 'dark'
    fontSize: 'small' | 'medium' | 'large'
    language: 'zh' | 'en'
  }
  recentViewed: number[]
  searchHistory: string[]
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    currentUser: null,
    token: null,
    preferences: {
      theme: 'light',
      fontSize: 'medium',
      language: 'zh'
    },
    recentViewed: [],
    searchHistory: []
  }),

  persist: {
    key: 'user-state',
    storage: localStorage,
    paths: ['preferences', 'recentViewed', 'searchHistory']
  },

  getters: {
    isLoggedIn: (state) => !!state.currentUser,
    username: (state) => state.currentUser?.name || '游客'
  },

  actions: {
    addRecentViewed(articleId: number) {
      if (!this.recentViewed.includes(articleId)) {
        this.recentViewed.unshift(articleId)
        if (this.recentViewed.length > 10) {
          this.recentViewed.pop()
        }
      }
    },

    addSearchHistory(query: string) {
      if (!this.searchHistory.includes(query)) {
        this.searchHistory.unshift(query)
        if (this.searchHistory.length > 10) {
          this.searchHistory.pop()
        }
      }
    },

    clearSearchHistory() {
      this.searchHistory = []
    }
  }
}) 
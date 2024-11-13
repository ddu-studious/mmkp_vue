import { defineStore } from 'pinia'
import type { Comment } from '@/types'
import { commentApi } from '@/services'
import { getErrorMessage } from '@/utils/error'

export const useCommentStore = defineStore('comment', {
  state: () => ({
    comments: [] as Comment[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchComments(articleId: number) {
      this.loading = true
      this.error = null
      try {
        const comments = await commentApi.getComments(articleId)
        this.comments = comments
      } catch (e) {
        this.error = getErrorMessage(e)
      } finally {
        this.loading = false
      }
    },

    async addComment(articleId: number, comment: { content: string, author: string }) {
      this.loading = true
      this.error = null
      try {
        const newComment = await commentApi.createComment(articleId, comment)
        this.comments.push(newComment)
      } catch (e) {
        this.error = getErrorMessage(e)
      } finally {
        this.loading = false
      }
    }
  }
}) 
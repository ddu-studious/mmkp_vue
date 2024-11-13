import { ref } from 'vue'
import type { Comment } from '@/types'
import { commentApi } from '@/services'
import { getErrorMessage } from '@/utils/error'

export function useComment(articleId: number) {
  const comments = ref<Comment[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchComments = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await commentApi.getComments(articleId)
      comments.value = response
    } catch (e) {
      error.value = getErrorMessage(e)
    } finally {
      loading.value = false
    }
  }

  const addComment = async (comment: { content: string, author: string }) => {
    loading.value = true
    error.value = null
    try {
      const newComment = await commentApi.createComment(articleId, comment)
      comments.value.unshift(newComment)
      return true
    } catch (e) {
      error.value = getErrorMessage(e)
      return false
    } finally {
      loading.value = false
    }
  }

  const deleteComment = async (commentId: number) => {
    loading.value = true
    error.value = null
    try {
      await commentApi.deleteComment(articleId, commentId)
      comments.value = comments.value.filter(c => c.id !== commentId)
      return true
    } catch (e) {
      error.value = getErrorMessage(e)
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    comments,
    loading,
    error,
    fetchComments,
    addComment,
    deleteComment
  }
} 
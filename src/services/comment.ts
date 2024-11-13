import { BaseApiService } from './base'
import type { Comment } from '@/types'
import type { ApiResponse } from '@/types/api'

export class CommentService extends BaseApiService {
  constructor() {
    super('/comments')
  }

  async getComments(articleId: number) {
    const cacheKey = this.getCacheKey(`/articles/${articleId}/comments`)
    return this.withCache<Comment[]>(
      cacheKey,
      () => this.get(`/articles/${articleId}/comments`),
      5 * 60 * 1000 // 5分钟缓存
    )
  }

  async createComment(articleId: number, data: { content: string; author: string }) {
    return this.post<Comment>(`/articles/${articleId}/comments`, data)
  }

  async updateComment(id: number, data: Partial<Comment>) {
    return this.put<Comment>(`/${id}`, data)
  }

  async deleteComment(id: number) {
    return this.delete(`/${id}`)
  }

  async likeComment(id: number) {
    return this.post<Comment>(`/${id}/like`)
  }

  async getReplies(commentId: number) {
    return this.get<Comment[]>(`/${commentId}/replies`)
  }

  async addReply(commentId: number, data: { content: string; author: string }) {
    return this.post<Comment>(`/${commentId}/replies`, data)
  }
}

export const commentService = new CommentService() 
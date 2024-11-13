import { BaseApiService } from './base'
import type { UserInteraction } from '@/types'

export class StatsService extends BaseApiService {
  constructor() {
    super('/stats')
  }

  async recordView(articleId: number) {
    return this.post<void>('/view', { articleId })
  }

  async recordInteraction(interaction: UserInteraction) {
    return this.post<void>('/interaction', interaction)
  }

  async getArticleStats(articleId: number) {
    return this.get<{
      views: number
      likes: number
      comments: number
      shares: number
    }>(`/articles/${articleId}`)
  }

  async getUserStats(userId: number) {
    return this.get<{
      articles: number
      followers: number
      following: number
      totalViews: number
    }>(`/users/${userId}`)
  }

  async getPopularArticles(period: 'day' | 'week' | 'month' = 'week') {
    return this.get('/popular-articles', { params: { period } })
  }

  async getTrending() {
    return this.get('/trending')
  }
}

export const statsService = new StatsService() 
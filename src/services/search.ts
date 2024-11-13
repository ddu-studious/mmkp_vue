import { BaseApiService } from './base'
import type { SearchResult, SearchParams } from '@/types'
import type { PaginatedResponse } from '@/types/api'

export class SearchService extends BaseApiService {
  constructor() {
    super('/search')
  }

  async search(params: SearchParams) {
    return this.get<PaginatedResponse<SearchResult[]>>('', { params })
  }

  async searchArticles(query: string) {
    return this.get<SearchResult[]>('/articles', { params: { query } })
  }

  async searchTags(query: string) {
    return this.get<string[]>('/tags', { params: { query } })
  }

  async getPopularSearches() {
    return this.get<string[]>('/popular')
  }

  async getSearchSuggestions(query: string) {
    return this.get<string[]>('/suggestions', { params: { query } })
  }

  async recordSearch(query: string) {
    return this.post('/record', { query })
  }
}

export const searchService = new SearchService() 
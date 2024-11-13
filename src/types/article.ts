export interface Article {
  id: number
  title: string
  summary: string
  date: string
  category: string
  readTime: number
  tags: string[]
  views: number
  likes: number
  comments: number
  author: {
    id: number
    name: string
    avatar: string
  }
  isNew?: boolean
}

export interface SearchParams {
  query?: string
  category?: string
  tags?: string[]
  page?: number
  limit?: number
  sort?: 'latest' | 'popular' | 'recommended'
  status?: Article['status']
  featured?: boolean
}

export interface ArticleStats {
  totalViews: number
  totalLikes: number
  totalComments: number
  averageReadTime: number
  popularTags: Array<{
    name: string
    count: number
  }>
  categoryDistribution: Array<{
    name: string
    count: number
  }>
} 
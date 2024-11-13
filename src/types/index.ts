export interface BaseResponse {
  code: number
  message: string
  meta?: Record<string, any>
}

export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  bio?: string
  role: 'admin' | 'user'
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
  preferences?: {
    theme?: 'light' | 'dark'
    fontSize?: 'small' | 'medium' | 'large'
    language?: string
    emailNotifications?: boolean
  }
  social?: {
    github?: string
    twitter?: string
    linkedin?: string
    website?: string
  }
  stats?: {
    articles: number
    comments: number
    likes: number
    followers: number
    following: number
  }
}

export interface Author {
  id: number
  name: string
  avatar?: string
}

export interface Article {
  id: number
  title: string
  summary: string
  content?: string
  date: string
  category: string
  readTime: number
  image: string
  tags: string[]
  views: number
  likes: number
  comments: number
  author: Author
  isNew?: boolean
  status?: 'draft' | 'published' | 'archived'
}

export interface Comment {
  id: number
  content: string
  author: string
  date: string
  articleId: number
  likes?: number
  replies?: Comment[]
  parentId?: number
}

export interface Category {
  id: number
  name: string
  description: string
  articleCount: number
  slug: string
}

export interface Tag {
  id: number
  name: string
  articleCount: number
  slug: string
}

export interface SearchParams {
  query?: string
  category?: string
  tags?: string[]
  page?: number
  limit?: number
  sort?: 'latest' | 'popular' | 'recommended'
  status?: Article['status']
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    total: number
    page: number
    pageSize: number
    totalPages: number
    hasMore: boolean
  }
}

export interface Notification {
  id: number
  type: 'comment' | 'like' | 'follow' | 'mention'
  message: string
  isRead: boolean
  date: string
  link?: string
  sender?: {
    id: number
    name: string
    avatar?: string
  }
}

export interface Stats {
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

export interface SearchResult {
  id: number
  title: string
  excerpt: string
  category: string
  link: string
}

// 添加搜索相关的类型定义
export interface SearchResults {
  articles: Article[]
  tags: Tag[]
  categories: Category[]
  total: number
}

export interface SearchFilter {
  type: 'all' | 'article' | 'tag' | 'category'
  category?: string
  tags?: string[]
  dateRange?: [Date, Date]
  sortBy?: 'relevance' | 'date' | 'views'
}
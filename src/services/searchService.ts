import type { SearchResult, Article, Tag, Category } from '@/types'

// 模拟搜索结果分类
interface SearchResults {
  articles: Article[]
  tags: Tag[]
  categories: Category[]
  total: number
}

export class SearchService {
  private static instance: SearchService
  private searchHistory: string[] = []
  private popularSearches: string[] = [
    'Vue 3', 'React', 'TypeScript', '性能优化', '微前端', 'Vite'
  ]

  private constructor() {
    // 从 localStorage 加载搜索历史
    const history = localStorage.getItem('searchHistory')
    if (history) {
      this.searchHistory = JSON.parse(history)
    }
  }

  static getInstance(): SearchService {
    if (!SearchService.instance) {
      SearchService.instance = new SearchService()
    }
    return SearchService.instance
  }

  // 搜索建议
  async getSuggestions(query: string): Promise<string[]> {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const suggestions = [
      ...this.popularSearches,
      ...this.searchHistory
    ].filter(item => 
      item.toLowerCase().includes(query.toLowerCase())
    )

    return [...new Set(suggestions)].slice(0, 5)
  }

  // 综合搜索
  async search(query: string, filters?: {
    type?: 'all' | 'article' | 'tag' | 'category'
    category?: string
    tags?: string[]
    dateRange?: [Date, Date]
    sortBy?: 'relevance' | 'date' | 'views'
  }): Promise<SearchResults> {
    // 记录搜索历史
    this.addToHistory(query)

    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 300))

    // 模拟搜索结果
    return {
      articles: [
        {
          id: 1,
          title: `关于 ${query} 的深入解析`,
          summary: `这是一篇关于 ${query} 的详细文章...`,
          date: new Date().toISOString(),
          category: '前端开发',
          readTime: 10,
          image: 'https://picsum.photos/800/400',
          tags: ['Vue.js', 'JavaScript'],
          views: 1200,
          likes: 350,
          comments: 42,
          author: {
            id: 1,
            name: '张三'
          }
        },
        // ... 更多文章
      ],
      tags: [
        {
          id: 1,
          name: query,
          articleCount: 42,
          slug: query.toLowerCase().replace(/\s+/g, '-')
        }
      ],
      categories: [
        {
          id: 1,
          name: '前端开发',
          description: '前端相关技术文章',
          articleCount: 120,
          slug: 'frontend'
        }
      ],
      total: 1
    }
  }

  // 添加搜索历史
  private addToHistory(query: string): void {
    if (!query.trim()) return

    this.searchHistory = [
      query,
      ...this.searchHistory.filter(item => item !== query)
    ].slice(0, 10)

    localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
  }

  // 获取搜索历史
  getHistory(): string[] {
    return this.searchHistory
  }

  // 清除搜索历史
  clearHistory(): void {
    this.searchHistory = []
    localStorage.removeItem('searchHistory')
  }

  // 获取热门搜索
  getPopularSearches(): string[] {
    return this.popularSearches
  }

  // 高亮搜索结果
  highlightText(text: string, query: string): string {
    if (!query.trim()) return text
    
    const regex = new RegExp(`(${query})`, 'gi')
    return text.replace(regex, '<mark>$1</mark>')
  }
}

export const searchService = SearchService.getInstance()
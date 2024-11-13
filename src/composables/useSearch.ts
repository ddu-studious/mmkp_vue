import { ref, computed } from 'vue'
import { useDebounce } from './useDebounce'
import type { SearchResults } from '@/types'

interface SearchResult {
  id: number | string
  title: string
  type: 'article' | 'tag' | 'category'
  link: string
  // ... 其他必要的字段
}

export function useSearch() {
  const query = ref('')
  const searchResults = ref<SearchResults | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const selectedIndex = ref(-1)

  // 搜索历史
  const searchHistory = ref<string[]>([])
  
  // 热门搜索
  const popularSearches = ref([
    'Vue 3', 'React', 'TypeScript', '性能优化', '微前端', 'Vite'
  ])

  // 使用防抖处理搜索
  const debouncedSearch = useDebounce(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      searchResults.value = null
      return
    }

    try {
      isLoading.value = true
      error.value = null
      
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // TODO: 替换为实际的 API 调用
      searchResults.value = {
        articles: [
          {
            id: 1,
            title: `关于 ${searchQuery} 的深入解析`,
            summary: `这是一篇关于 ${searchQuery} 的详细文章...`,
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
          }
        ],
        tags: [
          {
            id: 1,
            name: searchQuery,
            articleCount: 42,
            slug: searchQuery.toLowerCase().replace(/\s+/g, '-')
          }
        ],
        categories: [],
        total: 1
      }
    } catch (e) {
      error.value = '搜索失败，请稍后重试'
      searchResults.value = null
    } finally {
      isLoading.value = false
    }
  }, 300)

  // 监听搜索输入
  const handleSearchInput = (value: string) => {
    query.value = value
    debouncedSearch(value)
  }

  // 清除搜索
  const clearSearch = () => {
    query.value = ''
    searchResults.value = null
    error.value = null
    selectedIndex.value = -1
  }

  // 添加到搜索历史
  const addToHistory = (term: string) => {
    if (!term.trim()) return
    
    searchHistory.value = [
      term,
      ...searchHistory.value.filter(item => item !== term)
    ].slice(0, 10)
    
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
  }

  // 清除历史记录
  const clearHistory = () => {
    searchHistory.value = []
    localStorage.removeItem('searchHistory')
  }

  // 选择建议
  const selectSuggestion = (suggestion: string) => {
    query.value = suggestion
    handleSearchInput(suggestion)
    addToHistory(suggestion)
  }

  // 初始化时加载搜索历史
  const loadHistory = () => {
    const history = localStorage.getItem('searchHistory')
    if (history) {
      searchHistory.value = JSON.parse(history)
    }
  }

  // 加载历史记录
  loadHistory()

  return {
    query,
    searchResults,
    isLoading,
    error,
    selectedIndex,
    searchHistory,
    popularSearches,
    handleSearchInput,
    clearSearch,
    clearHistory,
    selectSuggestion,
    addToHistory
  }
} 
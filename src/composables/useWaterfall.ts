import { ref, onMounted, onUnmounted } from 'vue'
import type { Article } from '@/types'

export function useWaterfall() {
  const container = ref<HTMLElement | null>(null)
  const isLoading = ref(false)
  const currentPage = ref(1)
  const itemsPerPage = ref(6)
  const noMoreData = ref(false)

  // 瀑布流布局计算
  const calculateLayout = () => {
    if (!container.value) return
    
    const items = container.value.children
    const containerWidth = container.value.offsetWidth
    const columnCount = containerWidth <= 768 ? 1 : 
                       containerWidth <= 1200 ? 2 : 3
    
    // 计算列宽和间距
    const gap = 20
    const columnWidth = (containerWidth - (columnCount - 1) * gap) / columnCount
    
    // 初始化列高度数组
    const columnHeights = Array(columnCount).fill(0)
    
    // 为每个项目分配位置
    Array.from(items).forEach((item: Element) => {
      const columnIndex = columnHeights.indexOf(Math.min(...columnHeights))
      const x = columnIndex * (columnWidth + gap)
      const y = columnHeights[columnIndex]
      
      ;(item as HTMLElement).style.transform = 
        `translate(${x}px, ${y}px)`
      ;(item as HTMLElement).style.width = `${columnWidth}px`
      
      columnHeights[columnIndex] += (item as HTMLElement).offsetHeight + gap
    })
    
    // 设置容器高度
    container.value.style.height = `${Math.max(...columnHeights)}px`
  }

  // 监听窗口大小变化
  const debouncedCalculateLayout = debounce(calculateLayout, 200)

  onMounted(() => {
    window.addEventListener('resize', debouncedCalculateLayout)
    calculateLayout()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', debouncedCalculateLayout)
  })

  // 加载更多
  const loadMore = async (loadMoreFn: () => Promise<Article[]>) => {
    if (isLoading.value || noMoreData.value) return
    
    isLoading.value = true
    try {
      const newArticles = await loadMoreFn()
      if (newArticles.length === 0) {
        noMoreData.value = true
      } else {
        currentPage.value++
      }
    } catch (error) {
      console.error('Failed to load more articles:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    container,
    isLoading,
    currentPage,
    itemsPerPage,
    noMoreData,
    calculateLayout,
    loadMore
  }
}

// 防抖函数
function debounce(fn: Function, wait: number) {
  let timeout: number | null = null
  return function(...args: any[]) {
    if (timeout) clearTimeout(timeout)
    timeout = window.setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
} 
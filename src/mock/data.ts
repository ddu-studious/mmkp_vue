import { generateDataset } from './generators'

// 生成初始数据
const initialData = generateDataset(20)

// 导出模拟数据
export const mockData = {
  users: initialData.users,
  articles: initialData.articles,
  comments: initialData.comments,
  categories: initialData.categories,
  tags: initialData.tags
}

// 导出数据操作函数
export const dataOperations = {
  // 添加文章
  addArticle(article: any) {
    const newArticle = {
      ...article,
      id: Math.max(...mockData.articles.map(a => a.id)) + 1
    }
    mockData.articles.push(newArticle)
    return newArticle
  },

  // 更新文章
  updateArticle(id: number, updates: any) {
    const index = mockData.articles.findIndex(a => a.id === id)
    if (index !== -1) {
      mockData.articles[index] = { ...mockData.articles[index], ...updates }
      return mockData.articles[index]
    }
    return null
  },

  // 删除文章
  deleteArticle(id: number) {
    const index = mockData.articles.findIndex(a => a.id === id)
    if (index !== -1) {
      mockData.articles.splice(index, 1)
      return true
    }
    return false
  },

  // 添加评论
  addComment(comment: any) {
    const newComment = {
      ...comment,
      id: Math.max(...mockData.comments.map(c => c.id)) + 1,
      date: new Date().toISOString()
    }
    mockData.comments.push(newComment)
    return newComment
  },

  // 重置数据
  resetData() {
    const newData = generateDataset(20)
    Object.assign(mockData, newData)
  }
} 
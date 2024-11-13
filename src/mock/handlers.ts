import { rest } from 'msw'
import { mockData } from './data'
import type { Article, Comment, SearchParams } from '@/types'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const handlers = [
  // 获取文章列表
  rest.get(`${BASE_URL}/articles`, (req, res, ctx) => {
    const page = Number(req.url.searchParams.get('page')) || 1
    const limit = Number(req.url.searchParams.get('limit')) || 10
    const category = req.url.searchParams.get('category')
    const tag = req.url.searchParams.get('tag')
    const query = req.url.searchParams.get('query')

    let articles = [...mockData.articles]

    // 过滤
    if (category) {
      articles = articles.filter(article => article.category === category)
    }
    if (tag) {
      articles = articles.filter(article => article.tags.includes(tag))
    }
    if (query) {
      const searchQuery = query.toLowerCase()
      articles = articles.filter(article => 
        article.title.toLowerCase().includes(searchQuery) ||
        article.summary.toLowerCase().includes(searchQuery)
      )
    }

    // 分页
    const total = articles.length
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedArticles = articles.slice(start, end)

    return res(
      ctx.delay(300),
      ctx.status(200),
      ctx.json({
        code: 200,
        message: 'success',
        data: paginatedArticles,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      })
    )
  }),

  // 获取文章详情
  rest.get(`${BASE_URL}/articles/:id`, (req, res, ctx) => {
    const { id } = req.params
    const article = mockData.articles.find(a => a.id === Number(id))

    if (!article) {
      return res(
        ctx.delay(300),
        ctx.status(404),
        ctx.json({
          code: 404,
          message: '文章不存在'
        })
      )
    }

    return res(
      ctx.delay(300),
      ctx.status(200),
      ctx.json({
        code: 200,
        message: 'success',
        data: article
      })
    )
  }),

  // 获取评论列表
  rest.get(`${BASE_URL}/articles/:id/comments`, (req, res, ctx) => {
    const { id } = req.params
    const comments = mockData.comments.filter(c => c.articleId === Number(id))

    return res(
      ctx.delay(300),
      ctx.status(200),
      ctx.json({
        code: 200,
        message: 'success',
        data: comments
      })
    )
  }),

  // 添加评论
  rest.post(`${BASE_URL}/articles/:id/comments`, async (req, res, ctx) => {
    const { id } = req.params
    const body = await req.json()

    const newComment: Comment = {
      id: mockData.comments.length + 1,
      articleId: Number(id),
      content: body.content,
      author: body.author,
      date: new Date().toISOString(),
      likes: 0
    }

    mockData.comments.push(newComment)

    return res(
      ctx.delay(300),
      ctx.status(200),
      ctx.json({
        code: 200,
        message: 'success',
        data: newComment
      })
    )
  })
] 
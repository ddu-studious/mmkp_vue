import { faker } from '@faker-js/faker/locale/zh_CN'
import type { Article, Comment, Category, Tag, User } from '@/types'

// 生成用户数据
export function generateUser(): User {
  return {
    id: faker.number.int(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    bio: faker.person.bio(),
    role: faker.helpers.arrayElement(['admin', 'user']),
    status: faker.helpers.arrayElement(['active', 'inactive']),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    preferences: {
      theme: faker.helpers.arrayElement(['light', 'dark']),
      fontSize: faker.helpers.arrayElement(['small', 'medium', 'large']),
      language: faker.helpers.arrayElement(['zh', 'en']),
      emailNotifications: faker.datatype.boolean()
    },
    social: {
      github: faker.internet.url(),
      twitter: faker.internet.url(),
      linkedin: faker.internet.url(),
      website: faker.internet.url()
    },
    stats: {
      articles: faker.number.int({ min: 0, max: 100 }),
      comments: faker.number.int({ min: 0, max: 500 }),
      likes: faker.number.int({ min: 0, max: 1000 }),
      followers: faker.number.int({ min: 0, max: 1000 }),
      following: faker.number.int({ min: 0, max: 1000 })
    }
  }
}

// 生成文章数据
export function generateArticle(author?: User): Article {
  const articleAuthor = author || generateUser()
  return {
    id: faker.number.int(),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(5),
    summary: faker.lorem.paragraph(),
    date: faker.date.recent().toISOString(),
    category: faker.helpers.arrayElement(['前端', '后端', '工程化', '算法']),
    tags: faker.helpers.arrayElements(['Vue', 'React', 'TypeScript', 'Node.js'], 2),
    author: {
      id: articleAuthor.id,
      name: articleAuthor.name,
      bio: articleAuthor.bio,
      avatar: articleAuthor.avatar,
      social: articleAuthor.social
    },
    readTime: faker.number.int({ min: 3, max: 15 }),
    views: faker.number.int({ min: 100, max: 10000 }),
    likes: faker.number.int({ min: 10, max: 1000 }),
    comments: faker.number.int({ min: 0, max: 100 })
  }
}

// 生成评论数据
export function generateComment(articleId: number, author?: User): Comment {
  const commentAuthor = author || generateUser()
  return {
    id: faker.number.int(),
    content: faker.lorem.paragraph(),
    author: commentAuthor.name,
    date: faker.date.recent().toISOString(),
    articleId,
    likes: faker.number.int({ min: 0, max: 50 }),
    replies: faker.helpers.maybe(() => 
      Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => ({
        id: faker.number.int(),
        content: faker.lorem.sentence(),
        author: faker.person.fullName(),
        date: faker.date.recent().toISOString(),
        articleId,
        parentId: faker.number.int()
      }))
    )
  }
}

// 生成分类数据
export function generateCategory(): Category {
  return {
    id: faker.number.int(),
    name: faker.helpers.arrayElement(['前端开发', '后端技术', '工程化', '算法', '系统设计']),
    description: faker.lorem.sentence(),
    articleCount: faker.number.int({ min: 5, max: 50 }),
    slug: faker.helpers.slugify()
  }
}

// 生成标签数据
export function generateTag(): Tag {
  return {
    id: faker.number.int(),
    name: faker.helpers.arrayElement(['Vue', 'React', 'TypeScript', 'Node.js', 'Docker']),
    articleCount: faker.number.int({ min: 3, max: 30 }),
    slug: faker.helpers.slugify()
  }
}

// 生成批量数据
export function generateBatch<T>(
  generator: () => T,
  count: number,
  options?: {
    beforeEach?: (index: number) => void
    afterEach?: (item: T, index: number) => void
  }
): T[] {
  return Array.from({ length: count }, (_, index) => {
    options?.beforeEach?.(index)
    const item = generator()
    options?.afterEach?.(item, index)
    return item
  })
}

// 生成随机数据集
export function generateDataset(count = 10) {
  const users = generateBatch(generateUser, count)
  const articles = generateBatch(() => generateArticle(faker.helpers.arrayElement(users)), count * 2)
  const comments = articles.flatMap(article => 
    generateBatch(() => generateComment(article.id, faker.helpers.arrayElement(users)), 
    faker.number.int({ min: 0, max: 5 }))
  )
  const categories = generateBatch(generateCategory, 5)
  const tags = generateBatch(generateTag, 8)

  return {
    users,
    articles,
    comments,
    categories,
    tags
  }
} 
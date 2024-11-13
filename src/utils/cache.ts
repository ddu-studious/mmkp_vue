interface CacheOptions {
  maxAge?: number // 缓存过期时间（毫秒）
  maxSize?: number // 最大缓存条目数
}

interface CacheEntry<T> {
  value: T
  timestamp: number
  expiry?: number
}

export class Cache<T = any> {
  private cache: Map<string, CacheEntry<T>>
  private maxAge: number
  private maxSize: number

  constructor(options: CacheOptions = {}) {
    this.cache = new Map()
    this.maxAge = options.maxAge || 5 * 60 * 1000 // 默认5分钟
    this.maxSize = options.maxSize || 100
  }

  set(key: string, value: T, maxAge?: number): void {
    // 检查缓存大小
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.findOldestEntry()
      if (oldestKey) this.cache.delete(oldestKey)
    }

    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      expiry: maxAge || this.maxAge
    })
  }

  get(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    // 检查是否过期
    if (Date.now() - entry.timestamp > (entry.expiry || this.maxAge)) {
      this.cache.delete(key)
      return null
    }

    return entry.value
  }

  has(key: string): boolean {
    return this.cache.has(key) && !this.isExpired(key)
  }

  delete(key: string): void {
    this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  private isExpired(key: string): boolean {
    const entry = this.cache.get(key)
    if (!entry) return true
    return Date.now() - entry.timestamp > (entry.expiry || this.maxAge)
  }

  private findOldestEntry(): string | null {
    let oldestKey: string | null = null
    let oldestTime = Infinity

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp
        oldestKey = key
      }
    }

    return oldestKey
  }
}

// 创建全局缓存实例
export const cache = new Cache() 
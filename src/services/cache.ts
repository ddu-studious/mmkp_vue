interface CacheItem<T> {
  data: T
  timestamp: number
  expiry: number
}

class ApiCache {
  private cache = new Map<string, CacheItem<any>>()

  set<T>(key: string, data: T, maxAge: number): void {
    const timestamp = Date.now()
    this.cache.set(key, {
      data,
      timestamp,
      expiry: timestamp + maxAge
    })
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() > item.expiry) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  has(key: string): boolean {
    return this.cache.has(key)
  }

  delete(key: string): void {
    this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  cleanup(): void {
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key)
      }
    }
  }
}

export const apiCache = new ApiCache() 
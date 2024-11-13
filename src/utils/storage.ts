interface StorageOptions {
  prefix?: string
  expire?: number // 过期时间（毫秒）
}

interface StorageData<T> {
  value: T
  expire?: number
}

class Storage {
  private prefix: string

  constructor(options: StorageOptions = {}) {
    this.prefix = options.prefix || 'app_'
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`
  }

  set<T>(key: string, value: T, expire?: number): void {
    const data: StorageData<T> = {
      value,
      expire: expire ? Date.now() + expire : undefined
    }
    localStorage.setItem(this.getKey(key), JSON.stringify(data))
  }

  get<T>(key: string): T | null {
    const json = localStorage.getItem(this.getKey(key))
    if (!json) return null

    try {
      const data: StorageData<T> = JSON.parse(json)
      if (data.expire && data.expire < Date.now()) {
        this.remove(key)
        return null
      }
      return data.value
    } catch {
      return null
    }
  }

  remove(key: string): void {
    localStorage.removeItem(this.getKey(key))
  }

  clear(includePrefix = true): void {
    if (includePrefix) {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key)
        }
      })
    } else {
      localStorage.clear()
    }
  }
}

export const storage = new Storage() 
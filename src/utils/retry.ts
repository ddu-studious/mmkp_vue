interface RetryConfig {
  retries?: number
  retryDelay?: number
  shouldRetry?: (error: unknown) => boolean
  onRetry?: (error: unknown, retryCount: number) => void
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  config: RetryConfig = {}
): Promise<T> {
  const {
    retries = 3,
    retryDelay = 1000,
    shouldRetry = (error) => true,
    onRetry = () => {}
  } = config

  let lastError: unknown
  
  for (let i = 0; i < retries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      
      if (i === retries - 1 || !shouldRetry(error)) {
        throw error
      }

      onRetry(error, i + 1)
      await new Promise(resolve => setTimeout(resolve, retryDelay * (i + 1)))
    }
  }

  throw lastError
}

export function createRetryableRequest(config: RetryConfig = {}) {
  return function retryableRequest<T>(fn: () => Promise<T>): Promise<T> {
    return withRetry(fn, config)
  }
}

export const defaultRetryConfig: RetryConfig = {
  retries: 3,
  retryDelay: 1000,
  shouldRetry: (error: unknown) => {
    if (error instanceof Error) {
      // 不重试 4xx 错误
      if ('status' in error && (error as any).status >= 400 && (error as any).status < 500) {
        return false
      }
      // 重试网络错误和 5xx 错误
      return true
    }
    return false
  },
  onRetry: (error, retryCount) => {
    console.warn(`Retrying request (${retryCount})...`, error)
  }
} 
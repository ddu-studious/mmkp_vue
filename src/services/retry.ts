interface RetryConfig {
  retries?: number
  retryDelay?: number
  shouldRetry?: (error: any) => boolean
  onRetry?: (error: any, retryCount: number) => void
}

export class ApiRetryService {
  private config: Required<RetryConfig>

  constructor(config: RetryConfig = {}) {
    this.config = {
      retries: config.retries ?? 3,
      retryDelay: config.retryDelay ?? 1000,
      shouldRetry: config.shouldRetry ?? this.defaultShouldRetry,
      onRetry: config.onRetry ?? this.defaultOnRetry
    }
  }

  async retry<T>(fn: () => Promise<T>): Promise<T> {
    let lastError: any
    
    for (let attempt = 1; attempt <= this.config.retries; attempt++) {
      try {
        return await fn()
      } catch (error) {
        lastError = error
        
        if (attempt === this.config.retries || !this.config.shouldRetry(error)) {
          throw error
        }

        await this.delay(this.config.retryDelay * attempt)
        this.config.onRetry(error, attempt)
      }
    }

    throw lastError
  }

  private defaultShouldRetry(error: any): boolean {
    return !error.response || error.response.status >= 500
  }

  private defaultOnRetry(error: any, retryCount: number): void {
    console.warn(`Retrying request (${retryCount})...`, error)
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const apiRetry = new ApiRetryService() 
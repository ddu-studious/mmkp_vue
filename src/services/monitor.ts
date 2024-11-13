import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

interface ApiMetrics {
  requests: number
  errors: number
  totalLatency: number
  lastCheck: string
}

class ApiMonitor {
  private metrics: ApiMetrics = {
    requests: 0,
    errors: 0,
    totalLatency: 0,
    lastCheck: new Date().toISOString()
  }

  onRequest(config: AxiosRequestConfig) {
    this.metrics.requests++
    config.metadata = {
      startTime: Date.now()
    }
    return config
  }

  onResponse(response: AxiosResponse) {
    const startTime = response.config.metadata?.startTime
    if (startTime) {
      const latency = Date.now() - startTime
      this.metrics.totalLatency += latency
    }
    return response
  }

  onError(error: AxiosError) {
    this.metrics.errors++
    return Promise.reject(error)
  }

  getMetrics() {
    return {
      ...this.metrics,
      averageLatency: this.metrics.requests 
        ? Math.round(this.metrics.totalLatency / this.metrics.requests) 
        : 0,
      errorRate: this.metrics.requests 
        ? (this.metrics.errors / this.metrics.requests * 100).toFixed(2) + '%'
        : '0%'
    }
  }

  reset() {
    this.metrics = {
      requests: 0,
      errors: 0,
      totalLatency: 0,
      lastCheck: new Date().toISOString()
    }
  }
}

export const apiMonitor = new ApiMonitor()
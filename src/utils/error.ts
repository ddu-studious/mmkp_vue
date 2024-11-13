import type { AxiosError } from 'axios'
import type { ErrorResponse } from '@/types/response'

export class AppError extends Error {
  code: string
  details?: Record<string, any>
  statusCode?: number
  isOperational: boolean

  constructor(
    message: string,
    code: string = 'UNKNOWN_ERROR',
    statusCode?: number,
    details?: Record<string, any>,
    isOperational: boolean = true
  ) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.statusCode = statusCode
    this.details = details
    this.isOperational = isOperational
    Error.captureStackTrace(this, this.constructor)
  }

  static fromAxiosError(error: AxiosError<ErrorResponse>): AppError {
    if (error.response) {
      const { data, status } = error.response
      return new AppError(
        data?.message || error.message,
        data?.code || `HTTP_${status}`,
        status,
        data?.details
      )
    }

    if (error.request) {
      return new AppError(
        'Network Error',
        'NETWORK_ERROR',
        undefined,
        {
          url: error.config?.url,
          method: error.config?.method
        }
      )
    }

    return new AppError(
      error.message,
      'REQUEST_ERROR',
      undefined,
      error.config
    )
  }

  toJSON(): Record<string, any> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      details: this.details,
      stack: this.stack
    }
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}

export function getErrorMessage(error: unknown): string {
  if (isAppError(error)) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return String(error)
}

export function createError(
  message: string,
  code?: string,
  statusCode?: number,
  details?: Record<string, any>
): AppError {
  return new AppError(message, code, statusCode, details)
} 
import type { AxiosError } from 'axios'
import type { ApiError } from '@/types/api'

export type ErrorType = 'network' | 'validation' | 'auth' | 'not_found' | 'server' | 'unknown'

export function classifyError(error: unknown): {
  type: ErrorType
  message: string
  details?: Record<string, string[]>
} {
  if (!isAxiosError(error)) {
    return { type: 'unknown', message: 'An unexpected error occurred' }
  }

  if (!error.response) {
    return { type: 'network', message: 'Network error. Please check your connection.' }
  }

  const status = error.response.status
  const apiError = error.response.data as ApiError | undefined

  switch (status) {
    case 400:
    case 422:
      return {
        type: 'validation',
        message: apiError?.message ?? 'Validation error',
        details: apiError?.details,
      }
    case 401:
      return { type: 'auth', message: 'Session expired. Please log in again.' }
    case 403:
      return { type: 'auth', message: 'You do not have permission to perform this action.' }
    case 404:
      return { type: 'not_found', message: 'Resource not found.' }
    default:
      return { type: 'server', message: 'Server error. Please try again later.' }
  }
}

function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError)?.isAxiosError === true
}

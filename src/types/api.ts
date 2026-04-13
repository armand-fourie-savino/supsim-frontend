/** Wrapper for single-resource API responses */
export interface ApiResponse<T> {
  data: T
  message?: string
}

/** Wrapper for paginated list responses */
export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

/** Standard API error shape */
export interface ApiError {
  message: string
  code: string
  details?: Record<string, string[]>
}

import { ref, watch } from 'vue'
import type { Ref, WatchSource } from 'vue'

interface UseApiReturn<T> {
  data: Ref<T | null>
  error: Ref<Error | null>
  loading: Ref<boolean>
  refresh: () => Promise<void>
}

export function useApi<T>(fetcher: () => Promise<T>): UseApiReturn<T> {
  const data = ref<T | null>(null) as Ref<T | null>
  const error = ref<Error | null>(null)
  const loading = ref(false)

  async function refresh() {
    loading.value = true
    error.value = null
    try {
      data.value = await fetcher()
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }

  refresh()

  return { data, error, loading, refresh }
}

export function useWatchedApi<T>(
  fetcher: () => Promise<T>,
  deps: WatchSource[],
): UseApiReturn<T> {
  const state = useApi(fetcher)

  watch(deps, () => state.refresh())

  return state
}

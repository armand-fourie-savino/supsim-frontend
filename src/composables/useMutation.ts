import { ref } from 'vue'
import type { Ref } from 'vue'

interface UseMutationReturn<TInput, TResult> {
  data: Ref<TResult | null>
  error: Ref<Error | null>
  loading: Ref<boolean>
  mutate: (input: TInput) => Promise<TResult>
  reset: () => void
}

export function useMutation<TInput, TResult>(
  mutator: (input: TInput) => Promise<TResult>,
): UseMutationReturn<TInput, TResult> {
  const data = ref<TResult | null>(null) as Ref<TResult | null>
  const error = ref<Error | null>(null)
  const loading = ref(false)

  async function mutate(input: TInput): Promise<TResult> {
    loading.value = true
    error.value = null
    try {
      const result = await mutator(input)
      data.value = result
      return result
    } catch (err) {
      error.value = err as Error
      throw err
    } finally {
      loading.value = false
    }
  }

  function reset() {
    data.value = null
    error.value = null
    loading.value = false
  }

  return { data, error, loading, mutate, reset }
}

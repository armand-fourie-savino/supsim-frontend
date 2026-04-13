import { ref, watch, toValue } from 'vue'
import type { Ref, MaybeRefOrGetter } from 'vue'

export function useDebounce<T>(source: MaybeRefOrGetter<T>, delay = 300): Ref<T> {
  const debounced = ref(toValue(source)) as Ref<T>

  let timeout: ReturnType<typeof setTimeout>

  watch(
    () => toValue(source),
    (newValue) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        debounced.value = newValue
      }, delay)
    },
  )

  return debounced
}

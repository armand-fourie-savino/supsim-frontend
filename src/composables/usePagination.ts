import { ref, computed } from 'vue'
import type { Ref } from 'vue'

export function usePagination(totalItems: Ref<number>, pageSize = 20) {
  const currentPage = ref(1)

  const totalPages = computed(() => Math.ceil(totalItems.value / pageSize))

  const offset = computed(() => (currentPage.value - 1) * pageSize)

  const hasNextPage = computed(() => currentPage.value < totalPages.value)
  const hasPrevPage = computed(() => currentPage.value > 1)

  function nextPage() {
    if (hasNextPage.value) currentPage.value++
  }

  function prevPage() {
    if (hasPrevPage.value) currentPage.value--
  }

  function goToPage(page: number) {
    currentPage.value = Math.max(1, Math.min(page, totalPages.value))
  }

  return {
    currentPage,
    totalPages,
    offset,
    pageSize,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    goToPage,
  }
}

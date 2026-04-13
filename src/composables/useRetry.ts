import { ref } from 'vue'

export function useRetry<T>(fn: () => Promise<T>, maxRetries = 3, delayMs = 1000) {
  const attempts = ref(0)

  async function execute(): Promise<T> {
    attempts.value = 0

    for (let i = 0; i <= maxRetries; i++) {
      attempts.value = i + 1
      try {
        return await fn()
      } catch (err) {
        if (i === maxRetries) throw err
        await new Promise((r) => setTimeout(r, delayMs * (i + 1)))
      }
    }

    throw new Error('Unreachable')
  }

  return { execute, attempts }
}

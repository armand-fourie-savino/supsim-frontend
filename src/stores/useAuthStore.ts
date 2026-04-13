import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<Record<string, unknown> | null>(null)
    const token = ref<string | null>(null)

    const isAuthenticated = computed(() => !!token.value)

    async function login(_credentials: { email: string; password: string }) {
      // TODO: integrate with auth service
      throw new Error('Not implemented')
    }

    function logout() {
      user.value = null
      token.value = null
    }

    return { user, token, isAuthenticated, login, logout }
  },
  {
    persist: {
      pick: ['token'],
    },
  },
)

import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'

export default defineConfig({
  plugins: [
    // File-based routing — must be before Vue()
    VueRouter({
      routesFolder: 'src/pages',
      dts: 'src/typed-router.d.ts',
    }),

    Vue(),

    // Auto-import components
    Components({
      dirs: ['src/components'],
      deep: true,
      dts: 'src/components.d.ts',
      resolvers: [PrimeVueResolver()],
    }),

    // Auto-import composables and Vue APIs
    AutoImport({
      imports: ['vue', 'pinia', '@vueuse/core'],
      dirs: ['src/composables', 'src/stores'],
      dts: 'src/auto-imports.d.ts',
      vueTemplate: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

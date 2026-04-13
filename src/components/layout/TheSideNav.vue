<script setup lang="ts">
import { ref } from 'vue'

const collapsed = ref(false)
const userMenuOpen = ref(false)

const authStore = useAuthStore()

const navItems = [
  { label: 'Dashboard', icon: 'pi pi-objects-column', to: '/' },
  { label: 'Stock Planning', icon: 'pi pi-chart-bar', to: '/stock-planning' },
  { label: 'Simulation', icon: 'pi pi-play', to: '/simulation' },
]

function toggleCollapse() {
  collapsed.value = !collapsed.value
}

function toggleUserMenu() {
  userMenuOpen.value = !userMenuOpen.value
}

function handleLogout() {
  userMenuOpen.value = false
  authStore.logout()
}

const username = computed(() => {
  const user = authStore.user as Record<string, unknown> | null
  return (user?.name as string) ?? (user?.email as string) ?? 'User'
})

const initials = computed(() => {
  return username.value
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})
</script>

<template>
  <nav class="sidenav" :class="{ collapsed }">
    <div class="sidenav-header">
      <button class="sidenav-toggle" @click="toggleCollapse" aria-label="Toggle navigation">
        <i class="pi pi-bars"></i>
      </button>
      <Transition name="fade">
        <span v-show="!collapsed" class="sidenav-title">SupSim</span>
      </Transition>
    </div>

    <ul class="sidenav-menu">
      <li v-for="item in navItems" :key="item.to">
        <RouterLink :to="item.to" class="sidenav-link" active-class="sidenav-link--active">
          <i :class="item.icon"></i>
          <Transition name="fade">
            <span v-show="!collapsed" class="sidenav-link-label">{{ item.label }}</span>
          </Transition>
        </RouterLink>
      </li>
    </ul>

    <div class="sidenav-footer">
      <div class="sidenav-user" @click="toggleUserMenu">
        <div class="sidenav-avatar">{{ initials }}</div>
        <Transition name="fade">
          <span v-show="!collapsed" class="sidenav-username">{{ username }}</span>
        </Transition>
      </div>
      <Transition name="slide-up">
        <div v-if="userMenuOpen" class="sidenav-dropdown">
          <button class="sidenav-dropdown-item" @click="handleLogout">
            <i class="pi pi-sign-out"></i>
            <span>Logout</span>
          </button>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<style scoped>
.sidenav {
  display: flex;
  flex-direction: column;
  width: 240px;
  height: 100vh;
  background: var(--color-surface);
  border-right: 1px solid var(--color-border);
  transition: width var(--transition-normal);
  overflow: hidden;
  position: sticky;
  top: 0;
  flex-shrink: 0;
}

.sidenav.collapsed {
  width: 56px;
}

.sidenav-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  min-height: 56px;
}

.sidenav-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  background: none;
  border: none;
  color: var(--color-text);
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: background var(--transition-fast);
}

.sidenav-toggle:hover {
  background: var(--color-border);
}

.sidenav-title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-primary);
  white-space: nowrap;
}

.sidenav-menu {
  flex: 1;
  list-style: none;
  padding: var(--spacing-sm);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.sidenav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-sm);
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  text-decoration: none;
  white-space: nowrap;
  transition:
    background var(--transition-fast),
    color var(--transition-fast);
}

.sidenav-link i {
  width: 20px;
  text-align: center;
  flex-shrink: 0;
  font-size: var(--font-size-md);
}

.sidenav-link:hover {
  background: var(--color-border);
  color: var(--color-text);
}

.sidenav-link--active {
  background: color-mix(in srgb, var(--color-primary) 12%, transparent);
  color: var(--color-primary);
  font-weight: 500;
}

.sidenav-link--active:hover {
  background: color-mix(in srgb, var(--color-primary) 18%, transparent);
  color: var(--color-primary);
}

.sidenav-link-label {
  font-size: var(--font-size-sm);
}

.sidenav-footer {
  position: relative;
  border-top: 1px solid var(--color-border);
  padding: var(--spacing-sm);
}

.sidenav-user {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background var(--transition-fast);
}

.sidenav-user:hover {
  background: var(--color-border);
}

.sidenav-avatar {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xs);
  font-weight: 600;
  flex-shrink: 0;
}

.sidenav-username {
  font-size: var(--font-size-sm);
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidenav-dropdown {
  position: absolute;
  bottom: 100%;
  left: var(--spacing-sm);
  right: var(--spacing-sm);
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-xs);
  margin-bottom: var(--spacing-xs);
}

.sidenav-dropdown-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  width: 100%;
  padding: var(--spacing-sm);
  border: none;
  background: none;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition:
    background var(--transition-fast),
    color var(--transition-fast);
}

.sidenav-dropdown-item:hover {
  background: var(--color-border);
  color: var(--color-danger);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-fast);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition:
    opacity var(--transition-fast),
    transform var(--transition-fast);
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>

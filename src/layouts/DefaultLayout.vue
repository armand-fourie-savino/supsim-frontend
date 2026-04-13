<template>
  <div class="app-layout">
    <TheSideNav />
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}

.app-main {
  flex: 1;
  padding: var(--spacing-lg);
  overflow-y: auto;
}
</style>

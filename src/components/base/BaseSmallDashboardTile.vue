<script setup lang="ts">
interface Props {
  title: string
  metric: string | number
  icon?: string
}

defineProps<Props>()
</script>

<template>
  <div class="small-tile">
    <div class="small-tile-title">{{ title }}</div>
    <div class="small-tile-metric">
      <slot name="metric">{{ metric }}</slot>
    </div>
    <div v-if="icon" class="small-tile-icon">
      <i :class="icon"></i>
    </div>
  </div>
</template>

<style scoped>
.small-tile {
  position: relative;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-lg);
  overflow: hidden;
}

.small-tile-title {
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-xs);
}

.small-tile-metric {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.2;
}

.small-tile-icon {
  position: absolute;
  bottom: var(--spacing-md);
  right: var(--spacing-md);
  font-size: 1.5rem;
  color: var(--color-text-muted);
  opacity: 0.15;
}
</style>

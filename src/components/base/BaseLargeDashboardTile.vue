<script setup lang="ts">
import type { Severity, TileTag, TileTrend, TileFooterItem } from '@/types/dashboard'

interface Props {
  icon: string
  tag: TileTag
  title: string
  metric: string | number
  subtitle?: string
  trend?: TileTrend
  footerItems?: TileFooterItem[]
  severity?: Severity
}

withDefaults(defineProps<Props>(), {
  severity: 'secondary',
})

const severityToTagSeverity: Record<Severity, string> = {
  danger: 'danger',
  warning: 'warn',
  success: 'success',
  secondary: 'secondary',
}

const trendArrows: Record<string, string> = {
  up: '\u2191',
  down: '\u2193',
  flat: '\u2192',
}
</script>

<template>
  <div class="tile" :class="`tile--${severity}`">
    <div class="tile-header">
      <div class="tile-icon">
        <i :class="icon"></i>
      </div>
      <Tag :value="tag.label" :severity="severityToTagSeverity[tag.severity]" />
    </div>

    <div class="tile-body">
      <div class="tile-title">{{ title }}</div>
      <div class="tile-metric">
        <slot name="metric">{{ metric }}</slot>
      </div>
      <div v-if="subtitle || trend" class="tile-subtitle">
        <span v-if="subtitle" class="tile-subtitle-text">{{ subtitle }}</span>
        <span v-if="trend" class="tile-trend" :class="`tile-trend--${trend.direction}`">
          {{ trendArrows[trend.direction] }} {{ trend.text }}
        </span>
      </div>
    </div>

    <div v-if="footerItems?.length || $slots.footer" class="tile-footer">
      <slot name="footer">
        <div v-for="item in footerItems" :key="item.label" class="tile-footer-row">
          <span class="tile-footer-label">{{ item.label }}</span>
          <span class="tile-footer-value">{{ item.value }}</span>
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.tile {
  --tile-accent: var(--color-secondary);

  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--tile-accent);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.tile--danger {
  --tile-accent: var(--color-danger);
}
.tile--warning {
  --tile-accent: var(--color-warning);
}
.tile--success {
  --tile-accent: var(--color-success);
}
.tile--secondary {
  --tile-accent: var(--color-secondary);
}

.tile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tile-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: color-mix(in srgb, var(--tile-accent) 12%, transparent);
  color: var(--tile-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-lg);
}

.tile-body {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.tile-title {
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tile-metric {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.2;
}

.tile-subtitle {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.tile-subtitle-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.tile-trend {
  font-size: var(--font-size-xs);
  font-weight: 500;
}

.tile-trend--up {
  color: var(--color-danger);
}

.tile-trend--down {
  color: var(--color-success);
}

.tile-trend--flat {
  color: var(--color-text-muted);
}

.tile-footer {
  border-top: 1px solid var(--color-border);
  padding-top: var(--spacing-sm);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.tile-footer-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tile-footer-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.tile-footer-value {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text);
}
</style>

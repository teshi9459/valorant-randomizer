<template>
  <div class="map-filter">
    <h3 class="filter-title">Map Filter</h3>

    <div class="filter-section">
      <h4 class="section-title">Plant Spots</h4>
      <div class="site-options">
        <label class="site-option">
          <input
            type="radio"
            name="siteCount"
            :checked="modelValue.siteCount === null"
            @change="updateSiteCount(null)"
          />
          <span class="site-custom">Alle</span>
        </label>
        <label class="site-option">
          <input
            type="radio"
            name="siteCount"
            :checked="modelValue.siteCount === 2"
            @change="updateSiteCount(2)"
          />
          <span class="site-custom">2 Sites</span>
        </label>
        <label class="site-option">
          <input
            type="radio"
            name="siteCount"
            :checked="modelValue.siteCount === 3"
            @change="updateSiteCount(3)"
          />
          <span class="site-custom">3 Sites</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MapFilters } from '@/types/filters'

interface Props {
  modelValue: MapFilters
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [filters: MapFilters]
}>()

function updateSiteCount(count: 2 | 3 | null) {
  emit('update:modelValue', { siteCount: count })
}
</script>

<style scoped>
.map-filter {
  background: var(--color-card);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
}

.filter-title {
  font-size: 1.25rem;
  margin-bottom: var(--spacing-md);
  color: var(--color-accent);
}

.filter-section {
  margin-bottom: 0;
}

.section-title {
  font-size: 0.9rem;
  margin-bottom: var(--spacing-sm);
  color: var(--color-text);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.site-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-sm);
}

.site-option {
  display: flex;
  cursor: pointer;
  user-select: none;
}

.site-option input[type='radio'] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.site-custom {
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--color-card-dark);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-muted);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all var(--transition-base);
  text-align: center;
  width: 100%;
}

.site-option input:checked + .site-custom {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-card-dark);
}

.site-option:hover .site-custom {
  border-color: var(--color-accent);
}

@media (max-width: 768px) {
  .site-options {
    grid-template-columns: 1fr;
  }
}
</style>

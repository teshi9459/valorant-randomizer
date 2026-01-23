<template>
  <div class="weapon-filter">
    <h3 class="filter-title">Waffen Filter</h3>

    <div class="filter-section">
      <h4 class="section-title">Waffentypen</h4>
      <div class="type-options">
        <label v-for="type in weaponTypes" :key="type" class="type-option">
          <input
            type="checkbox"
            :value="type"
            :checked="isTypeSelected(type)"
            @change="toggleType(type)"
          />
          <span class="type-custom">{{ type }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { WeaponFilters } from '@/types/filters'

interface Props {
  modelValue: WeaponFilters
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [filters: WeaponFilters]
}>()

const weaponTypes = ['Sidearm', 'SMG', 'Shotgun', 'Rifle', 'Sniper', 'Heavy', 'Melee'] as const

const localFilters = ref<WeaponFilters>({
  categories: props.modelValue.categories
})

watch(localFilters, (newFilters) => {
  emit('update:modelValue', newFilters)
}, { deep: true })

function isTypeSelected(type: string): boolean {
  return localFilters.value.categories?.includes(type as any) || false
}

function toggleType(type: string) {
  const currentTypes = localFilters.value.categories || []
  if (currentTypes.includes(type as any)) {
    localFilters.value.categories = currentTypes.filter(t => t !== type) as any
    if (localFilters.value.categories.length === 0) {
      localFilters.value.categories = null
    }
  } else {
    localFilters.value.categories = [...currentTypes, type] as any
  }
}
</script>

<style scoped>
.weapon-filter {
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
  margin-bottom: var(--spacing-md);
}

.filter-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 0.9rem;
  margin-bottom: var(--spacing-sm);
  color: var(--color-text);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.type-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-sm);
}

.type-option {
  display: flex;
  cursor: pointer;
  user-select: none;
}

.type-option input[type='checkbox'] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.type-custom {
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

.type-option input:checked + .type-custom {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-card-dark);
}

.type-option:hover .type-custom {
  border-color: var(--color-accent);
}

@media (max-width: 768px) {
  .type-options {
    grid-template-columns: 1fr;
  }
}
</style>

<template>
  <div class="category-filter">
    <h3 class="filter-title">Kategorien</h3>
    <div class="category-options">
      <label v-for="category in categories" :key="category.value" class="category-option">
        <input
          type="checkbox"
          :value="category.value"
          :checked="modelValue.includes(category.value)"
          @change="toggleCategory(category.value)"
        />
        <span class="category-custom">{{ category.label }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CategoryType } from '@/types/filters'

interface Props {
  modelValue: CategoryType[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [categories: CategoryType[]]
}>()

const categories = [
  { value: 'agents' as CategoryType, label: 'Agents' },
  { value: 'weapons' as CategoryType, label: 'Waffen' },
  { value: 'maps' as CategoryType, label: 'Maps' },
  { value: 'shields' as CategoryType, label: 'Rüstung' }
]

function toggleCategory(category: CategoryType) {
  const newCategories = props.modelValue.includes(category)
    ? props.modelValue.filter(c => c !== category)
    : [...props.modelValue, category]
  emit('update:modelValue', newCategories)
}
</script>

<style scoped>
.category-filter {
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

.category-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: var(--spacing-sm);
}

.category-option {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.category-option input[type='checkbox'] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.category-custom {
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-card-dark);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-muted);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  transition: all var(--transition-base);
  text-align: center;
  width: 100%;
}

.category-option input:checked + .category-custom {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-card-dark);
  box-shadow: var(--shadow-accent);
}

.category-option:hover .category-custom {
  border-color: var(--color-accent);
}

@media (max-width: 768px) {
  .category-options {
    grid-template-columns: repeat(2, 1fr);
  }

  .category-custom {
    font-size: 0.75rem;
    padding: var(--spacing-xs) var(--spacing-sm);
  }
}
</style>

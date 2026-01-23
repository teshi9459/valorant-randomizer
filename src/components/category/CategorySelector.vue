<template>
  <div class="category-selector">
    <h3 class="selector-title">Wähle Kategorien zum Randomisieren</h3>
    <CategoryFilter :model-value="modelValue" @update:model-value="updateCategories" />
  </div>
</template>

<script setup lang="ts">
import CategoryFilter from '@/components/filters/CategoryFilter.vue'
import { CategoryType } from '@/types/filters'

interface Props {
  modelValue: CategoryType[]
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [categories: CategoryType[]]
}>()

function updateCategories(categories: CategoryType[]) {
  emit('update:modelValue', categories)
}
</script>

<style scoped>
.category-selector {
  background: var(--color-card);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
}

.selector-title {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-lg);
  color: var(--color-accent);
  text-align: center;
}
</style>

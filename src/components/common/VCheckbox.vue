<template>
  <label class="v-checkbox">
    <input type="checkbox" :checked="modelValue" :disabled="disabled" @change="handleChange" />
    <span class="checkbox-custom"></span>
    <span class="checkbox-label">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}
</script>

<style scoped>
.v-checkbox {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  user-select: none;
}

.v-checkbox input[type='checkbox'] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.checkbox-custom {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-card-dark);
  transition: all var(--transition-base);
  position: relative;
  flex-shrink: 0;
}

.checkbox-custom::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 6px;
  width: 4px;
  height: 10px;
  border: solid var(--color-card-dark);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity var(--transition-base);
}

.v-checkbox input:checked + .checkbox-custom {
  background: var(--color-accent);
  border-color: var(--color-accent);
}

.v-checkbox input:checked + .checkbox-custom::after {
  opacity: 1;
}

.v-checkbox:hover .checkbox-custom {
  border-color: var(--color-accent);
}

.v-checkbox input:disabled + .checkbox-custom {
  opacity: 0.5;
  cursor: not-allowed;
}

.checkbox-label {
  color: var(--color-text);
  font-size: 0.95rem;
}
</style>

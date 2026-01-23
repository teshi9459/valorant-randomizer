<template>
  <button :class="['v-button', variant, { disabled }]" :disabled="disabled" @click="handleClick">
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

function handleClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<style scoped>
.v-button {
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-full);
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: all var(--transition-base);
  white-space: nowrap;
  font-family: var(--font-primary);
}

.v-button.primary {
  background: var(--color-accent);
  color: var(--color-card-dark);
  box-shadow: var(--shadow-accent);
}

.v-button.primary:hover:not(.disabled) {
  background: var(--color-accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 12px 36px rgba(255, 70, 85, 0.5);
}

.v-button.primary:active:not(.disabled) {
  transform: translateY(0);
}

.v-button.secondary {
  background: var(--color-card);
  color: var(--color-text);
  border: 2px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.v-button.secondary:hover:not(.disabled) {
  border-color: var(--color-accent);
  color: var(--color-accent);
  transform: translateY(-2px);
}

.v-button.ghost {
  background: transparent;
  color: var(--color-muted);
  border: 1px solid var(--color-border);
}

.v-button.ghost:hover:not(.disabled) {
  color: var(--color-text);
  border-color: var(--color-accent);
}

.v-button.danger {
  background: var(--color-error);
  color: white;
  box-shadow: 0 10px 30px rgba(244, 67, 54, 0.4);
}

.v-button.danger:hover:not(.disabled) {
  background: #e53935;
  transform: translateY(-2px);
}

.v-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .v-button {
    font-size: 0.85rem;
    padding: var(--spacing-xs) var(--spacing-md);
    width: 100%;
  }
}
</style>

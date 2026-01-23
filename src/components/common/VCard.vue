<template>
  <div :class="['v-card', variant]">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'dark' | 'bordered'
}

withDefaults(defineProps<Props>(), {
  variant: 'default'
})
</script>

<style scoped>
.v-card {
  background: var(--color-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}

.v-card.dark {
  background: var(--color-card-dark);
}

.v-card.bordered {
  border: 2px solid var(--color-border);
}

.v-card.bordered:hover {
  border-color: var(--color-accent);
}
</style>

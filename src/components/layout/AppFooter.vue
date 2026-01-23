<template>
  <footer class="app-footer">
    <div class="container">
      <p class="text-muted text-sm text-center">
        Valorant Randomizer &copy; {{ currentYear }} |
        Daten von <a href="https://valorant-api.com" target="_blank" rel="noopener">Valorant API</a>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.app-footer {
  background: var(--color-card-dark);
  border-top: 1px solid var(--color-border);
  padding: var(--spacing-lg) 0;
  margin-top: auto;
}

.app-footer a {
  color: var(--color-accent);
  text-decoration: underline;
}

.app-footer a:hover {
  color: var(--color-accent-hover);
}
</style>

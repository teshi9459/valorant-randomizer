<template>
  <div id="app">
    <AppHeader />
    <main class="main-content">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import { useValorantDataStore } from './stores/valorant-data'

const valorantData = useValorantDataStore()

onMounted(async () => {
  try {
    await valorantData.loadData()
  } catch (error) {
    console.error('Failed to load Valorant data:', error)
  }
})
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-bg);
}

.main-content {
  flex: 1;
  padding: var(--spacing-xl);
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .main-content {
    padding: var(--spacing-md);
  }
}
</style>

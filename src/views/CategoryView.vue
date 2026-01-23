<template>
  <div class="category-view">
    <div class="view-header">
      <h1>CATEGORY MODE</h1>
      <p class="view-subtitle">Wähle Kategorien und erhalte ein zufälliges Ergebnis</p>
    </div>

    <!-- Configuration Section -->
    <div class="config-section">
      <CategorySelector v-model="categoryStore.selectedCategories" />

      <div v-if="categoryStore.selectedCategories.length > 0" class="advanced-filters">
        <AgentFilter
          v-if="categoryStore.selectedCategories.includes('agents')"
          v-model="categoryStore.filters.agentFilters"
          v-model:abilities-enabled="categoryStore.filters.abilitiesEnabled"
        />

        <WeaponFilter
          v-if="categoryStore.selectedCategories.includes('weapons')"
          v-model="categoryStore.filters.weaponFilters"
        />

        <MapFilter
          v-if="categoryStore.selectedCategories.includes('maps')"
          v-model="categoryStore.filters.mapFilters"
        />
      </div>

      <div class="config-actions">
        <VButton
          :disabled="categoryStore.selectedCategories.length === 0"
          @click="categoryStore.generate"
        >
          🎲 Generieren
        </VButton>
        <VButton
          v-if="categoryStore.result"
          variant="secondary"
          @click="categoryStore.generate"
        >
          🔄 Neu generieren
        </VButton>
        <VButton
          v-if="categoryStore.result"
          variant="ghost"
          @click="handleShare"
        >
          🔗 Teilen
        </VButton>
        <VButton
          v-if="categoryStore.result"
          variant="ghost"
          @click="categoryStore.clearResult"
        >
          Zurücksetzen
        </VButton>
      </div>
    </div>

    <!-- Result Section -->
    <div class="result-section">
      <ResultDisplay :result="categoryStore.result" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCategoryStore } from '@/stores/category'
import { useUrlSharing } from '@/composables/useUrlSharing'
import VButton from '@/components/common/VButton.vue'
import AgentFilter from '@/components/filters/AgentFilter.vue'
import WeaponFilter from '@/components/filters/WeaponFilter.vue'
import MapFilter from '@/components/filters/MapFilter.vue'
import CategorySelector from '@/components/category/CategorySelector.vue'
import ResultDisplay from '@/components/category/ResultDisplay.vue'

const categoryStore = useCategoryStore()
const { copyShareUrl, loadStateFromUrl } = useUrlSharing()

// Load state from URL on mount
onMounted(() => {
  const state = loadStateFromUrl()
  if (state) {
    if (state.selectedCategories) categoryStore.selectedCategories = state.selectedCategories
    if (state.filters) categoryStore.filters = state.filters
    if (state.result) categoryStore.result = state.result
  }
})

async function handleShare() {
  const state = {
    selectedCategories: categoryStore.selectedCategories,
    filters: categoryStore.filters,
    result: categoryStore.result
  }
  const success = await copyShareUrl(state)
  if (success) {
    alert('Link wurde in die Zwischenablage kopiert!')
  }
}
</script>

<style scoped>
.category-view {
  max-width: 1200px;
  margin: 0 auto;
}

.view-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.view-header h1 {
  font-size: 3rem;
  color: var(--color-accent);
  margin-bottom: var(--spacing-sm);
}

.view-subtitle {
  font-size: 1.1rem;
  color: var(--color-muted);
}

.config-section {
  margin-bottom: var(--spacing-2xl);
}

.advanced-filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  margin: var(--spacing-xl) 0;
}

.config-actions {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: center;
  flex-wrap: wrap;
}

.result-section {
  margin-top: var(--spacing-2xl);
}

@media (max-width: 768px) {
  .view-header h1 {
    font-size: 2rem;
  }

  .advanced-filters {
    grid-template-columns: 1fr;
  }

  .config-actions {
    flex-direction: column;
  }
}
</style>

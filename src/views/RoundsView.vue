<template>
  <div class="rounds-view">
    <div class="view-header">
      <h1>ROUNDS MODE</h1>
      <p class="view-subtitle">Generiere eine Liste von Runden mit zufälligen Loadouts</p>
    </div>

    <!-- Configuration Section -->
    <div class="config-section">
      <h2 class="section-title">Konfiguration</h2>

      <div class="config-grid">
        <RoundInput v-model="roundsStore.roundCount" />

        <CategoryFilter v-model="roundsStore.filters.categories" />
      </div>

      <div class="advanced-filters">
        <AgentFilter
          v-if="roundsStore.filters.categories.includes('agents')"
          v-model="roundsStore.filters.agentFilters"
          v-model:abilities-enabled="roundsStore.filters.abilitiesEnabled"
        />

        <WeaponFilter
          v-if="roundsStore.filters.categories.includes('weapons')"
          v-model="roundsStore.filters.weaponFilters"
        />

        <MapFilter
          v-if="roundsStore.filters.categories.includes('maps')"
          v-model="roundsStore.filters.mapFilters"
        />
      </div>

      <div class="config-actions">
        <VButton
          :disabled="roundsStore.filters.categories.length === 0"
          @click="roundsStore.generateRounds(roundsStore.roundCount)"
        >
          {{ roundsStore.rounds.length > 0 ? 'Alles neu generieren' : 'Runden generieren' }}
        </VButton>
        <VButton
          v-if="roundsStore.rounds.length > 0"
          variant="ghost"
          @click="handleShare"
        >
          🔗 Teilen
        </VButton>
        <VButton
          v-if="roundsStore.rounds.length > 0"
          variant="ghost"
          @click="roundsStore.clearAll"
        >
          Zurücksetzen
        </VButton>
      </div>
    </div>

    <!-- Rounds List -->
    <div v-if="roundsStore.rounds.length > 0" class="rounds-section">
      <h2 class="section-title">Runden</h2>
      <RoundsList
        :rounds="roundsStore.rounds"
        @toggle-complete="roundsStore.toggleRoundComplete"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <div class="empty-icon">🎯</div>
      <h3>Noch keine Runden generiert</h3>
      <p class="text-muted">
        Wähle Kategorien aus und klicke auf "Runden generieren", um zu beginnen
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoundsStore } from '@/stores/rounds'
import { useUrlSharing } from '@/composables/useUrlSharing'
import VButton from '@/components/common/VButton.vue'
import CategoryFilter from '@/components/filters/CategoryFilter.vue'
import AgentFilter from '@/components/filters/AgentFilter.vue'
import WeaponFilter from '@/components/filters/WeaponFilter.vue'
import MapFilter from '@/components/filters/MapFilter.vue'
import RoundInput from '@/components/rounds/RoundInput.vue'
import RoundsList from '@/components/rounds/RoundsList.vue'

const roundsStore = useRoundsStore()
const { copyShareUrl, loadStateFromUrl } = useUrlSharing()

// Load state from URL on mount
onMounted(() => {
  const state = loadStateFromUrl()
  if (state) {
    if (state.rounds) roundsStore.rounds = state.rounds
    if (state.roundCount) roundsStore.roundCount = state.roundCount
    if (state.filters) roundsStore.filters = state.filters
  }
})

async function handleShare() {
  const state = {
    rounds: roundsStore.rounds,
    roundCount: roundsStore.roundCount,
    filters: roundsStore.filters
  }
  const success = await copyShareUrl(state)
  if (success) {
    alert('Link wurde in die Zwischenablage kopiert!')
  }
}
</script>

<style scoped>
.rounds-view {
  max-width: 1400px;
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

.section-title {
  font-size: 1.75rem;
  margin-bottom: var(--spacing-lg);
  color: var(--color-text);
}

.config-section {
  margin-bottom: var(--spacing-2xl);
}

.config-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.advanced-filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.config-actions {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.rounds-section {
  margin-bottom: var(--spacing-2xl);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-2xl);
  background: var(--color-card);
  border-radius: var(--radius-lg);
  border: 2px dashed var(--color-border);
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: var(--spacing-md);
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-sm);
  color: var(--color-text);
}

@media (max-width: 768px) {
  .view-header h1 {
    font-size: 2rem;
  }

  .config-grid {
    grid-template-columns: 1fr;
  }

  .advanced-filters {
    grid-template-columns: 1fr;
  }

  .config-actions {
    flex-direction: column;
  }
}
</style>

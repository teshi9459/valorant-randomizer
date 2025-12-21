<template>
  <div class="lobby-view">
    <div class="view-header">
      <h1>LOBBY MODE</h1>
      <p class="view-subtitle">Füge Spieler zu Teams hinzu und randomisiere für jeden Spieler</p>
    </div>

    <!-- Filters Section -->
    <div class="filters-section">
      <h2 class="section-title">Filter & Kategorien</h2>

      <CategoryFilter v-model="lobbyStore.filters.categories" />

      <div class="advanced-filters">
        <AgentFilter
          v-if="lobbyStore.filters.categories.includes('agents')"
          v-model="lobbyStore.filters.agentFilters"
          v-model:abilities-enabled="lobbyStore.filters.abilitiesEnabled"
        />

        <WeaponFilter
          v-if="lobbyStore.filters.categories.includes('weapons')"
          v-model="lobbyStore.filters.weaponFilters"
        />

        <MapFilter
          v-if="lobbyStore.filters.categories.includes('maps')"
          v-model="lobbyStore.filters.mapFilters"
        />
      </div>
    </div>

    <!-- Teams Section -->
    <div class="teams-section">
      <div class="teams-header">
        <h2 class="section-title">Teams</h2>
        <div class="teams-actions">
          <VButton
            v-if="lobbyStore.allPlayers.length > 0"
            variant="ghost"
            @click="handleShare"
          >
            🔗 Teilen
          </VButton>
          <VButton
            variant="secondary"
            :disabled="lobbyStore.allPlayers.length === 0"
            @click="lobbyStore.clearAll"
          >
            Alle entfernen
          </VButton>
          <VButton
            :disabled="lobbyStore.allPlayers.length === 0 || lobbyStore.filters.categories.length === 0"
            @click="lobbyStore.generateForAllPlayers"
          >
            Für alle generieren
          </VButton>
        </div>
      </div>

      <div class="teams-grid">
        <TeamSection
          team="A"
          :players="lobbyStore.teamA"
          @add-player="(name) => lobbyStore.addPlayer('A', name)"
          @reroll="lobbyStore.rerollPlayer"
          @remove="lobbyStore.removePlayer"
        />

        <TeamSection
          team="B"
          :players="lobbyStore.teamB"
          @add-player="(name) => lobbyStore.addPlayer('B', name)"
          @reroll="lobbyStore.rerollPlayer"
          @remove="lobbyStore.removePlayer"
        />
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="lobbyStore.allPlayers.length === 0" class="empty-state">
      <div class="empty-icon">👥</div>
      <h3>Noch keine Spieler</h3>
      <p class="text-muted">Füge Spieler zu Team A oder Team B hinzu, um zu beginnen</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useLobbyStore } from '@/stores/lobby'
import { useUrlSharing } from '@/composables/useUrlSharing'
import VButton from '@/components/common/VButton.vue'
import CategoryFilter from '@/components/filters/CategoryFilter.vue'
import AgentFilter from '@/components/filters/AgentFilter.vue'
import WeaponFilter from '@/components/filters/WeaponFilter.vue'
import MapFilter from '@/components/filters/MapFilter.vue'
import TeamSection from '@/components/lobby/TeamSection.vue'

const lobbyStore = useLobbyStore()
const { copyShareUrl, loadStateFromUrl } = useUrlSharing()

// Load state from URL on mount
onMounted(() => {
  const state = loadStateFromUrl()
  if (state) {
    // Restore lobby state from URL
    if (state.teamA) lobbyStore.teamA = state.teamA
    if (state.teamB) lobbyStore.teamB = state.teamB
    if (state.filters) lobbyStore.filters = state.filters
  }
})

async function handleShare() {
  const state = {
    teamA: lobbyStore.teamA,
    teamB: lobbyStore.teamB,
    filters: lobbyStore.filters
  }
  const success = await copyShareUrl(state)
  if (success) {
    alert('Link wurde in die Zwischenablage kopiert!')
  }
}
</script>

<style scoped>
.lobby-view {
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

.filters-section {
  margin-bottom: var(--spacing-2xl);
}

.advanced-filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
}

.teams-section {
  margin-bottom: var(--spacing-2xl);
}

.teams-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.teams-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.teams-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--spacing-xl);
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

@media (max-width: 1024px) {
  .teams-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .view-header h1 {
    font-size: 2rem;
  }

  .teams-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-md);
  }

  .teams-actions {
    width: 100%;
    flex-direction: column;
  }

  .advanced-filters {
    grid-template-columns: 1fr;
  }
}
</style>

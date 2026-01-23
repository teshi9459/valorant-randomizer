<template>
  <div class="team-section">
    <div class="team-header">
      <h2 :class="`team-title team-${team.toLowerCase()}`">Team {{ team }}</h2>
      <span class="team-count">{{ players.length }}/5</span>
    </div>

    <TeamInput
      :team="team"
      :disabled="players.length >= 5"
      @add-player="$emit('addPlayer', $event)"
    />

    <div v-if="players.length > 0" class="players-grid">
      <PlayerCard
        v-for="player in players"
        :key="player.id"
        :player="player"
        @reroll="$emit('reroll', player.id)"
        @remove="$emit('remove', player.id)"
      />
    </div>

    <div v-else class="empty-state">
      <p class="text-muted">Noch keine Spieler in Team {{ team }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import TeamInput from './TeamInput.vue'
import PlayerCard from './PlayerCard.vue'
import { Player } from '@/types/models'

interface Props {
  team: 'A' | 'B'
  players: Player[]
}

defineProps<Props>()

defineEmits<{
  addPlayer: [name: string]
  reroll: [playerId: string]
  remove: [playerId: string]
}>()
</script>

<style scoped>
.team-section {
  background: var(--color-card);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
}

.team-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.team-title {
  font-size: 2rem;
  margin: 0;
}

.team-title.team-a {
  color: var(--color-team-a);
}

.team-title.team-b {
  color: var(--color-team-b);
}

.team-count {
  font-family: var(--font-primary);
  font-size: 1.5rem;
  color: var(--color-muted);
}

.players-grid {
  display: grid;
  gap: var(--spacing-md);
}

.empty-state {
  padding: var(--spacing-xl);
  text-align: center;
  background: var(--color-card-dark);
  border-radius: var(--radius-md);
  border: 2px dashed var(--color-border);
}
</style>

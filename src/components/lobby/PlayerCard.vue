<template>
  <VCard :variant="player.team === 'A' ? 'bordered' : 'bordered'" class="player-card">
    <div class="player-header">
      <h3 class="player-name" :class="`team-${player.team.toLowerCase()}`">
        {{ player.name }}
      </h3>
      <div class="player-actions">
        <VButton v-if="player.assignments" variant="ghost" size="sm" @click="$emit('reroll')">
          🎲
        </VButton>
        <VButton variant="danger" size="sm" @click="$emit('remove')">
          ✕
        </VButton>
      </div>
    </div>

    <div v-if="player.assignments" class="assignments">
      <!-- Agent -->
      <div v-if="player.assignments.agent" class="assignment-item">
        <div class="assignment-label">Agent</div>
        <div class="assignment-content">
          <img
            v-if="player.assignments.agent.displayIconSmall"
            :src="player.assignments.agent.displayIconSmall"
            :alt="player.assignments.agent.displayName"
            class="assignment-icon"
          />
          <span class="assignment-name">{{ player.assignments.agent.displayName }}</span>
          <span class="assignment-role">{{ player.assignments.agent.role.displayName }}</span>
        </div>
      </div>

      <!-- Abilities -->
      <div v-if="player.assignments.abilities && player.assignments.abilities.length > 0" class="assignment-item">
        <div class="assignment-label">Abilities</div>
        <div class="abilities-list">
          <div v-for="ability in player.assignments.abilities" :key="ability.slot" class="ability-item">
            <img
              v-if="ability.displayIcon"
              :src="ability.displayIcon"
              :alt="ability.displayName"
              class="ability-icon"
            />
            <span class="ability-name">{{ ability.displayName }}</span>
          </div>
        </div>
      </div>

      <!-- Weapon -->
      <div v-if="player.assignments.weapon" class="assignment-item">
        <div class="assignment-label">Waffe</div>
        <div class="assignment-content">
          <img
            v-if="player.assignments.weapon.displayIcon"
            :src="player.assignments.weapon.displayIcon"
            :alt="player.assignments.weapon.displayName"
            class="assignment-icon weapon-icon"
          />
          <span class="assignment-name">{{ player.assignments.weapon.displayName }}</span>
          <span class="assignment-category">{{ player.assignments.weapon.category }}</span>
        </div>
      </div>

      <!-- Map -->
      <div v-if="player.assignments.map" class="assignment-item">
        <div class="assignment-label">Map</div>
        <div class="assignment-content">
          <img
            v-if="player.assignments.map.listViewIcon"
            :src="player.assignments.map.listViewIcon"
            :alt="player.assignments.map.displayName"
            class="assignment-icon map-icon"
          />
          <span class="assignment-name">{{ player.assignments.map.displayName }}</span>
          <span class="assignment-sites">{{ player.assignments.map.siteCount }} Sites</span>
        </div>
      </div>

      <!-- Shield -->
      <div v-if="player.assignments.shield" class="assignment-item">
        <div class="assignment-label">Rüstung</div>
        <div class="assignment-content">
          <span class="assignment-name">{{ player.assignments.shield.displayName }}</span>
          <span class="assignment-cost">{{ player.assignments.shield.cost }} Credits</span>
        </div>
      </div>
    </div>

    <div v-else class="no-assignments">
      <p class="text-muted">Noch keine Zuweisung</p>
    </div>
  </VCard>
</template>

<script setup lang="ts">
import VCard from '@/components/common/VCard.vue'
import VButton from '@/components/common/VButton.vue'
import { Player } from '@/types/models'

interface Props {
  player: Player
}

defineProps<Props>()

defineEmits<{
  reroll: []
  remove: []
}>()
</script>

<style scoped>
.player-card {
  transition: all var(--transition-base);
}

.player-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 2px solid var(--color-border);
}

.player-name {
  font-size: 1.5rem;
  margin: 0;
}

.player-name.team-a {
  color: var(--color-team-a);
}

.player-name.team-b {
  color: var(--color-team-b);
}

.player-actions {
  display: flex;
  gap: var(--spacing-xs);
}

.assignments {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.assignment-item {
  background: var(--color-card-dark);
  border-radius: var(--radius-sm);
  padding: var(--spacing-sm);
}

.assignment-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-muted);
  margin-bottom: var(--spacing-xs);
  font-weight: 600;
}

.assignment-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.assignment-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: var(--radius-sm);
}

.weapon-icon {
  width: 60px;
  height: 40px;
}

.map-icon {
  width: 60px;
  height: 40px;
  object-fit: cover;
}

.assignment-name {
  font-weight: 600;
  color: var(--color-text);
}

.assignment-role,
.assignment-category,
.assignment-sites,
.assignment-cost {
  margin-left: auto;
  font-size: 0.85rem;
  color: var(--color-muted);
  background: var(--color-card);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
}

.abilities-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-xs);
}

.ability-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  background: var(--color-card);
  padding: var(--spacing-xs);
  border-radius: var(--radius-sm);
}

.ability-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.ability-name {
  font-size: 0.8rem;
  color: var(--color-text);
}

.no-assignments {
  padding: var(--spacing-xl);
  text-align: center;
}

@media (max-width: 768px) {
  .player-name {
    font-size: 1.2rem;
  }

  .assignment-icon {
    width: 32px;
    height: 32px;
  }

  .weapon-icon {
    width: 48px;
    height: 32px;
  }

  .map-icon {
    width: 48px;
    height: 32px;
  }

  .assignment-name {
    font-size: 0.9rem;
  }

  .abilities-list {
    grid-template-columns: 1fr;
  }

  .assignment-role,
  .assignment-category,
  .assignment-sites,
  .assignment-cost {
    font-size: 0.75rem;
    padding: 2px 6px;
  }
}
</style>

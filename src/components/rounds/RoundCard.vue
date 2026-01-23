<template>
  <VCard :class="['round-card', { completed: round.completed }]">
    <div class="round-header">
      <div class="round-info">
        <VCheckbox :model-value="round.completed" @update:model-value="$emit('toggleComplete')">
          <span class="round-number">Runde {{ round.roundNumber }}</span>
        </VCheckbox>
      </div>
      <span v-if="round.completed" class="completed-badge">✓ Abgeschlossen</span>
    </div>

    <div class="assignments">
      <!-- Agent -->
      <div v-if="round.assignments.agent" class="assignment-item">
        <div class="assignment-label">Agent</div>
        <div class="assignment-content">
          <img
            v-if="round.assignments.agent.displayIconSmall"
            :src="round.assignments.agent.displayIconSmall"
            :alt="round.assignments.agent.displayName"
            class="assignment-icon"
          />
          <span class="assignment-name">{{ round.assignments.agent.displayName }}</span>
          <span class="assignment-role">{{ round.assignments.agent.role.displayName }}</span>
        </div>
      </div>

      <!-- Abilities -->
      <div v-if="round.assignments.abilities && round.assignments.abilities.length > 0" class="assignment-item">
        <div class="assignment-label">Abilities</div>
        <div class="abilities-list">
          <div v-for="ability in round.assignments.abilities" :key="ability.slot" class="ability-item">
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
      <div v-if="round.assignments.weapon" class="assignment-item">
        <div class="assignment-label">Waffe</div>
        <div class="assignment-content">
          <img
            v-if="round.assignments.weapon.displayIcon"
            :src="round.assignments.weapon.displayIcon"
            :alt="round.assignments.weapon.displayName"
            class="assignment-icon weapon-icon"
          />
          <span class="assignment-name">{{ round.assignments.weapon.displayName }}</span>
          <span class="assignment-category">{{ round.assignments.weapon.category }}</span>
        </div>
      </div>

      <!-- Map -->
      <div v-if="round.assignments.map" class="assignment-item">
        <div class="assignment-label">Map</div>
        <div class="assignment-content">
          <img
            v-if="round.assignments.map.listViewIcon"
            :src="round.assignments.map.listViewIcon"
            :alt="round.assignments.map.displayName"
            class="assignment-icon map-icon"
          />
          <span class="assignment-name">{{ round.assignments.map.displayName }}</span>
          <span class="assignment-sites">{{ round.assignments.map.siteCount }} Sites</span>
        </div>
      </div>

      <!-- Shield -->
      <div v-if="round.assignments.shield" class="assignment-item">
        <div class="assignment-label">Rüstung</div>
        <div class="assignment-content">
          <span class="assignment-name">{{ round.assignments.shield.displayName }}</span>
          <span class="assignment-cost">{{ round.assignments.shield.cost }} Credits</span>
        </div>
      </div>
    </div>
  </VCard>
</template>

<script setup lang="ts">
import VCard from '@/components/common/VCard.vue'
import VCheckbox from '@/components/common/VCheckbox.vue'
import { Round } from '@/types/models'

interface Props {
  round: Round
}

defineProps<Props>()

defineEmits<{
  toggleComplete: []
}>()
</script>

<style scoped>
.round-card {
  transition: all var(--transition-base);
}

.round-card.completed {
  opacity: 0.6;
  border-color: var(--color-success);
}

.round-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 2px solid var(--color-border);
}

.round-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.round-number {
  font-family: var(--font-primary);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-accent);
}

.completed-badge {
  background: var(--color-success);
  color: white;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.assignments {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
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
  width: 32px;
  height: 32px;
  object-fit: contain;
  border-radius: var(--radius-sm);
}

.weapon-icon {
  width: 50px;
  height: 32px;
}

.map-icon {
  width: 50px;
  height: 32px;
  object-fit: cover;
}

.assignment-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--color-text);
}

.assignment-role,
.assignment-category,
.assignment-sites,
.assignment-cost {
  margin-left: auto;
  font-size: 0.75rem;
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
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.ability-name {
  font-size: 0.75rem;
  color: var(--color-text);
}

@media (max-width: 768px) {
  .round-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xs);
  }

  .round-number {
    font-size: 1.1rem;
  }

  .completed-badge {
    font-size: 0.7rem;
    padding: 2px 8px;
  }

  .assignment-icon {
    width: 28px;
    height: 28px;
  }

  .weapon-icon {
    width: 42px;
    height: 28px;
  }

  .map-icon {
    width: 42px;
    height: 28px;
  }

  .assignment-name {
    font-size: 0.85rem;
  }

  .abilities-list {
    grid-template-columns: 1fr;
  }

  .assignment-role,
  .assignment-category,
  .assignment-sites,
  .assignment-cost {
    font-size: 0.7rem;
    padding: 2px 6px;
  }
}
</style>

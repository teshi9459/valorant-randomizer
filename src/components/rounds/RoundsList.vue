<template>
  <div class="rounds-list">
    <div v-if="rounds.length > 0" class="progress-bar">
      <div class="progress-fill" :style="{ width: `${progressPercentage}%` }"></div>
      <span class="progress-text">{{ completedCount }} / {{ rounds.length }} Runden abgeschlossen</span>
    </div>

    <div class="rounds-grid">
      <RoundCard
        v-for="round in rounds"
        :key="round.roundNumber"
        :round="round"
        @toggle-complete="$emit('toggleComplete', round.roundNumber)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import RoundCard from './RoundCard.vue'
import { Round } from '@/types/models'

interface Props {
  rounds: Round[]
}

const props = defineProps<Props>()

defineEmits<{
  toggleComplete: [roundNumber: number]
}>()

const completedCount = computed(() => props.rounds.filter(r => r.completed).length)

const progressPercentage = computed(() => {
  if (props.rounds.length === 0) return 0
  return (completedCount.value / props.rounds.length) * 100
})
</script>

<style scoped>
.rounds-list {
  width: 100%;
}

.progress-bar {
  background: var(--color-card-dark);
  border-radius: var(--radius-full);
  height: 40px;
  position: relative;
  overflow: hidden;
  margin-bottom: var(--spacing-xl);
  border: 2px solid var(--color-border);
}

.progress-fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(90deg, var(--color-accent), var(--color-accent-hover));
  transition: width 0.3s ease;
}

.progress-text {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-family: var(--font-primary);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  z-index: 1;
}

.rounds-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--spacing-lg);
}

@media (max-width: 768px) {
  .rounds-grid {
    grid-template-columns: 1fr;
  }
}
</style>

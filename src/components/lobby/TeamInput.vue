<template>
  <div class="team-input">
    <VInput
      v-model="playerName"
      :placeholder="`Spieler für Team ${team} hinzufügen...`"
      @keyup.enter="addPlayerHandler"
    />
    <VButton :disabled="!playerName.trim() || disabled" @click="addPlayerHandler">
      Hinzufügen
    </VButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VInput from '@/components/common/VInput.vue'
import VButton from '@/components/common/VButton.vue'

interface Props {
  team: 'A' | 'B'
  disabled?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  addPlayer: [name: string]
}>()

const playerName = ref('')

function addPlayerHandler() {
  if (playerName.value.trim() && !props.disabled) {
    emit('addPlayer', playerName.value.trim())
    playerName.value = ''
  }
}
</script>

<style scoped>
.team-input {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}
</style>

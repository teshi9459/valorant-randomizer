import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Round, RoundAssignment } from '@/types/models'
import { FilterState, DEFAULT_FILTERS } from '@/types/filters'
import { useValorantDataStore } from './valorant-data'
import { getRandomItem, getRandomAbilities } from '@/services/randomizer/core'
import { applyAgentFilters, applyWeaponFilters, applyMapFilters } from '@/services/randomizer/filters'

export const useRoundsStore = defineStore('rounds', () => {
  const valorantData = useValorantDataStore()

  // State
  const rounds = ref<Round[]>([])
  const roundCount = ref(13)
  const filters = ref<FilterState>(JSON.parse(JSON.stringify(DEFAULT_FILTERS)))

  // Actions
  function generateRoundAssignment(): RoundAssignment {
    const assignment: RoundAssignment = {}

    // Generate Agent
    if (filters.value.categories.includes('agents')) {
      const filteredAgents = applyAgentFilters(valorantData.agents, filters.value.agentFilters)
      const agent = getRandomItem(filteredAgents)
      if (agent) {
        assignment.agent = agent

        // Generate Abilities if enabled
        if (filters.value.abilitiesEnabled) {
          assignment.abilities = getRandomAbilities(agent, 4)
        }
      }
    }

    // Generate Weapon
    if (filters.value.categories.includes('weapons')) {
      const filteredWeapons = applyWeaponFilters(valorantData.weapons, filters.value.weaponFilters)
      const weapon = getRandomItem(filteredWeapons)
      if (weapon) assignment.weapon = weapon
    }

    // Generate Map
    if (filters.value.categories.includes('maps')) {
      const filteredMaps = applyMapFilters(valorantData.maps, filters.value.mapFilters)
      const map = getRandomItem(filteredMaps)
      if (map) assignment.map = map
    }

    // Generate Shield
    if (filters.value.categories.includes('shields')) {
      const shield = getRandomItem(valorantData.shields)
      if (shield) assignment.shield = shield
    }

    return assignment
  }

  function generateRounds(count: number) {
    rounds.value = Array.from({ length: count }, (_, index) => ({
      roundNumber: index + 1,
      completed: false,
      assignments: generateRoundAssignment()
    }))
  }

  function toggleRoundComplete(roundNumber: number) {
    const round = rounds.value.find(r => r.roundNumber === roundNumber)
    if (round) {
      round.completed = !round.completed
    }
  }

  function regenerateAll() {
    generateRounds(roundCount.value)
  }

  function clearAll() {
    rounds.value = []
    roundCount.value = 13
  }

  function resetFilters() {
    filters.value = JSON.parse(JSON.stringify(DEFAULT_FILTERS))
  }

  return {
    // State
    rounds,
    roundCount,
    filters,
    // Actions
    generateRounds,
    toggleRoundComplete,
    regenerateAll,
    clearAll,
    resetFilters
  }
})

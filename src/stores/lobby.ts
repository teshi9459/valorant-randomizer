import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { Player, PlayerAssignment } from '@/types/models'
import { FilterState, DEFAULT_FILTERS } from '@/types/filters'
import { useValorantDataStore } from './valorant-data'
import { getRandomItem, getRandomAbilities } from '@/services/randomizer/core'
import { applyAgentFilters, applyWeaponFilters, applyMapFilters } from '@/services/randomizer/filters'

export const useLobbyStore = defineStore('lobby', () => {
  const valorantData = useValorantDataStore()

  // State
  const teamA = ref<Player[]>([])
  const teamB = ref<Player[]>([])
  const filters = ref<FilterState>(JSON.parse(JSON.stringify(DEFAULT_FILTERS)))

  // Computed
  const allPlayers = computed(() => [...teamA.value, ...teamB.value])

  // Actions
  function addPlayer(team: 'A' | 'B', name: string) {
    const targetTeam = team === 'A' ? teamA : teamB
    if (targetTeam.value.length >= 5) return

    targetTeam.value.push({
      id: crypto.randomUUID(),
      name,
      team
    })
  }

  function removePlayer(playerId: string) {
    teamA.value = teamA.value.filter(p => p.id !== playerId)
    teamB.value = teamB.value.filter(p => p.id !== playerId)
  }

  function generateAssignmentForPlayer(player: Player): PlayerAssignment {
    const assignment: PlayerAssignment = {}

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

  function generateForAllPlayers() {
    teamA.value = teamA.value.map(player => ({
      ...player,
      assignments: generateAssignmentForPlayer(player)
    }))

    teamB.value = teamB.value.map(player => ({
      ...player,
      assignments: generateAssignmentForPlayer(player)
    }))
  }

  function rerollPlayer(playerId: string) {
    const player = allPlayers.value.find(p => p.id === playerId)
    if (!player) return

    const newAssignment = generateAssignmentForPlayer(player)

    if (player.team === 'A') {
      const index = teamA.value.findIndex(p => p.id === playerId)
      teamA.value[index] = { ...player, assignments: newAssignment }
    } else {
      const index = teamB.value.findIndex(p => p.id === playerId)
      teamB.value[index] = { ...player, assignments: newAssignment }
    }
  }

  function clearAll() {
    teamA.value = []
    teamB.value = []
  }

  function resetFilters() {
    filters.value = JSON.parse(JSON.stringify(DEFAULT_FILTERS))
  }

  return {
    // State
    teamA,
    teamB,
    filters,
    // Computed
    allPlayers,
    // Actions
    addPlayer,
    removePlayer,
    generateForAllPlayers,
    rerollPlayer,
    clearAll,
    resetFilters
  }
})

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Agent, Weapon, GameMap, Shield, Ability } from '@/types/models'
import { CategoryType, DEFAULT_FILTERS } from '@/types/filters'
import { FilterState } from '@/types/filters'
import { useValorantDataStore } from './valorant-data'
import { getRandomItem, getRandomAbilities } from '@/services/randomizer/core'
import { applyAgentFilters, applyWeaponFilters, applyMapFilters } from '@/services/randomizer/filters'

export interface CategoryResult {
  agent?: Agent
  abilities?: Ability[]
  weapon?: Weapon
  map?: GameMap
  shield?: Shield
}

export const useCategoryStore = defineStore('category', () => {
  const valorantData = useValorantDataStore()

  // State
  const selectedCategories = ref<CategoryType[]>(['agents'])
  const filters = ref<FilterState>(JSON.parse(JSON.stringify(DEFAULT_FILTERS)))
  const result = ref<CategoryResult | null>(null)

  // Actions
  function generate() {
    const newResult: CategoryResult = {}

    // Generate Agent
    if (selectedCategories.value.includes('agents')) {
      const filteredAgents = applyAgentFilters(valorantData.agents, filters.value.agentFilters)
      const agent = getRandomItem(filteredAgents)
      if (agent) {
        newResult.agent = agent

        // Generate Abilities if enabled
        if (filters.value.abilitiesEnabled) {
          newResult.abilities = getRandomAbilities(agent, 4)
        }
      }
    }

    // Generate Weapon
    if (selectedCategories.value.includes('weapons')) {
      const filteredWeapons = applyWeaponFilters(valorantData.weapons, filters.value.weaponFilters)
      const weapon = getRandomItem(filteredWeapons)
      if (weapon) newResult.weapon = weapon
    }

    // Generate Map
    if (selectedCategories.value.includes('maps')) {
      const filteredMaps = applyMapFilters(valorantData.maps, filters.value.mapFilters)
      const map = getRandomItem(filteredMaps)
      if (map) newResult.map = map
    }

    // Generate Shield
    if (selectedCategories.value.includes('shields')) {
      const shield = getRandomItem(valorantData.shields)
      if (shield) newResult.shield = shield
    }

    result.value = newResult
  }

  function clearResult() {
    result.value = null
  }

  function resetFilters() {
    filters.value = JSON.parse(JSON.stringify(DEFAULT_FILTERS))
    selectedCategories.value = ['agents']
  }

  return {
    // State
    selectedCategories,
    filters,
    result,
    // Actions
    generate,
    clearResult,
    resetFilters
  }
})

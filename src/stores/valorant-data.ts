import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchAgents } from '@/services/api/agents'
import { fetchWeapons } from '@/services/api/weapons'
import { fetchMaps } from '@/services/api/maps'
import { Agent, Weapon, GameMap, SHIELDS, STARTER_AGENTS } from '@/types/models'

export const useValorantDataStore = defineStore('valorant-data', () => {
  // State
  const agents = ref<Agent[]>([])
  const weapons = ref<Weapon[]>([])
  const maps = ref<GameMap[]>([])
  const shields = ref(SHIELDS)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const initialized = ref(false)

  // Actions
  async function loadData() {
    if (initialized.value) return

    loading.value = true
    error.value = null

    try {
      const [agentsData, weaponsData, mapsData] = await Promise.all([
        fetchAgents(),
        fetchWeapons(),
        fetchMaps()
      ])

      agents.value = agentsData
      weapons.value = weaponsData
      maps.value = mapsData
      initialized.value = true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load Valorant data'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function refreshData() {
    initialized.value = false
    await loadData()
  }

  // Getters
  const agentsByRole = computed(() => {
    return (role: string) => agents.value.filter(a => a.role.displayName === role)
  })

  const starterAgents = computed(() => {
    return agents.value.filter(a => STARTER_AGENTS.includes(a.displayName))
  })

  const weaponsByCategory = computed(() => {
    return (category: string) => weapons.value.filter(w => w.category === category)
  })

  const mapsBySiteCount = computed(() => {
    return (count: 2 | 3) => maps.value.filter(m => m.siteCount === count)
  })

  return {
    // State
    agents,
    weapons,
    maps,
    shields,
    loading,
    error,
    initialized,
    // Actions
    loadData,
    refreshData,
    // Getters
    agentsByRole,
    starterAgents,
    weaponsByCategory,
    mapsBySiteCount
  }
})

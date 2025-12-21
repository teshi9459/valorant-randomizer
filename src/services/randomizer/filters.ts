import { Agent, Weapon, GameMap, STARTER_AGENTS, SPECIAL_WEAPONS } from '@/types/models'
import { AgentFilters, WeaponFilters, MapFilters } from '@/types/filters'

/**
 * Apply filters to agents array
 * @param agents - Array of all agents
 * @param filters - Agent filters to apply
 * @returns Filtered array of agents
 */
export function applyAgentFilters(agents: Agent[], filters: AgentFilters): Agent[] {
  let filtered = [...agents]

  // Filter by starter agents only
  if (filters.starterOnly) {
    filtered = filtered.filter(a => STARTER_AGENTS.includes(a.displayName))
  }

  // Filter by roles
  if (filters.roles && filters.roles.length > 0) {
    filtered = filtered.filter(a => filters.roles!.includes(a.role.displayName as any))
  }

  return filtered
}

/**
 * Apply filters to weapons array
 * @param weapons - Array of all weapons
 * @param filters - Weapon filters to apply
 * @returns Filtered array of weapons
 */
export function applyWeaponFilters(weapons: Weapon[], filters: WeaponFilters): Weapon[] {
  let filtered = [...weapons]

  // Always exclude special weapons
  filtered = filtered.filter(w => !SPECIAL_WEAPONS.some(special => w.displayName.includes(special)))

  // Filter by weapon categories
  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(w => filters.categories!.includes(w.category as any))
  }

  return filtered
}

/**
 * Apply filters to maps array
 * @param maps - Array of all maps
 * @param filters - Map filters to apply
 * @returns Filtered array of maps
 */
export function applyMapFilters(maps: GameMap[], filters: MapFilters): GameMap[] {
  let filtered = [...maps]

  // Filter by site count
  if (filters.siteCount !== null) {
    filtered = filtered.filter(m => m.siteCount === filters.siteCount)
  }

  return filtered
}

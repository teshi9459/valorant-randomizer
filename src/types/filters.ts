export type CategoryType = 'agents' | 'weapons' | 'maps' | 'shields' | 'abilities'

export interface FilterState {
  categories: CategoryType[]
  agentFilters: AgentFilters
  weaponFilters: WeaponFilters
  mapFilters: MapFilters
  abilitiesEnabled: boolean
}

export interface AgentFilters {
  roles: Array<'Controller' | 'Duelist' | 'Initiator' | 'Sentinel'> | null
  starterOnly: boolean
}

export interface WeaponFilters {
  categories: Array<'Sidearm' | 'SMG' | 'Shotgun' | 'Rifle' | 'Sniper' | 'Heavy' | 'Melee'> | null
}

export interface MapFilters {
  siteCount: 2 | 3 | null
}

export const DEFAULT_FILTERS: FilterState = {
  categories: ['agents', 'weapons'],
  agentFilters: {
    roles: null,
    starterOnly: false
  },
  weaponFilters: {
    categories: null
  },
  mapFilters: {
    siteCount: null
  },
  abilitiesEnabled: false
}

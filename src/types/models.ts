export interface Agent {
  uuid: string
  displayName: string
  description: string
  developerName: string
  displayIcon: string
  displayIconSmall: string
  bustPortrait: string
  fullPortrait: string
  abilities: Ability[]
  role: AgentRole
  isPlayableCharacter: boolean
}

export interface AgentRole {
  uuid: string
  displayName: 'Controller' | 'Duelist' | 'Initiator' | 'Sentinel'
  description: string
  displayIcon: string
}

export interface Ability {
  slot: 'Passive' | 'Ability1' | 'Ability2' | 'Grenade' | 'Ultimate'
  displayName: string
  description: string
  displayIcon: string | null
}

export interface Weapon {
  uuid: string
  displayName: string
  category: 'Sidearm' | 'SMG' | 'Shotgun' | 'Rifle' | 'Sniper' | 'Heavy' | 'Melee'
  displayIcon: string
  shopData?: {
    cost: number
    category: string
  }
}

export interface GameMap {
  uuid: string
  displayName: string
  coordinates: string
  displayIcon: string
  listViewIcon: string
  splash: string
  callouts?: any[]
  siteCount: 2 | 3
}

export interface Shield {
  type: 'Light' | 'Heavy' | 'None'
  cost: number
  displayName: string
}

export interface Player {
  id: string
  name: string
  team: 'A' | 'B'
  assignments?: PlayerAssignment
}

export interface PlayerAssignment {
  agent?: Agent
  abilities?: Ability[]
  weapon?: Weapon
  map?: GameMap
  shield?: Shield
}

export interface Round {
  roundNumber: number
  completed: boolean
  assignments: RoundAssignment
}

export interface RoundAssignment {
  agent?: Agent
  abilities?: Ability[]
  weapon?: Weapon
  map?: GameMap
  shield?: Shield
}

// Constants
export const STARTER_AGENTS = [
  'Brimstone',
  'Jett',
  'Phoenix',
  'Sage',
  'Sova'
]

export const SHIELDS: Shield[] = [
  { type: 'None', cost: 0, displayName: 'Keine Rüstung' },
  { type: 'Light', cost: 400, displayName: 'Leichte Rüstung' },
  { type: 'Heavy', cost: 1000, displayName: 'Schwere Rüstung' }
]

// Special weapons to exclude
export const SPECIAL_WEAPONS = [
  'Golden Gun',
  'Snowball Launcher',
  'Melee'
]

import { Agent, Weapon, GameMap } from './models'

export interface ApiResponse<T> {
  status: number
  data: T
}

export interface CacheEntry<T> {
  data: T
  timestamp: number
  version: string
}

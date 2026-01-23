import { CacheEntry } from '@/types/api'

const CACHE_DURATION = Number(import.meta.env.VITE_CACHE_DURATION) || 24 * 60 * 60 * 1000 // 24 hours
const CACHE_VERSION = import.meta.env.VITE_CACHE_VERSION || '2.0.0' // Updated for English API language

export class ApiCache {
  private getKey(endpoint: string): string {
    return `valorant_api_${endpoint}`
  }

  public get<T>(endpoint: string): T | null {
    try {
      const key = this.getKey(endpoint)
      const cached = localStorage.getItem(key)

      if (!cached) return null

      const entry: CacheEntry<T> = JSON.parse(cached)

      // Check version
      if (entry.version !== CACHE_VERSION) {
        this.clear(endpoint)
        return null
      }

      // Check expiration
      if (Date.now() - entry.timestamp > CACHE_DURATION) {
        this.clear(endpoint)
        return null
      }

      return entry.data
    } catch (error) {
      console.error('Cache read error:', error)
      return null
    }
  }

  public set<T>(endpoint: string, data: T): void {
    try {
      const key = this.getKey(endpoint)
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
        version: CACHE_VERSION
      }
      localStorage.setItem(key, JSON.stringify(entry))
    } catch (error) {
      console.error('Cache write error:', error)
    }
  }

  public clear(endpoint: string): void {
    const key = this.getKey(endpoint)
    localStorage.removeItem(key)
  }

  public clearAll(): void {
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith('valorant_api_')) {
        localStorage.removeItem(key)
      }
    })
  }
}

export const cache = new ApiCache()

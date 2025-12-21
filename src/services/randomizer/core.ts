import { Agent, Weapon, GameMap, Shield, Ability } from '@/types/models'

/**
 * Get random items from an array
 * @param items - Array of items to choose from
 * @param count - Number of items to return
 * @param allowDuplicates - Whether to allow duplicate items
 * @returns Array of random items
 */
export function getRandomItems<T>(
  items: T[],
  count: number,
  allowDuplicates = false
): T[] {
  if (!items.length) return []

  if (allowDuplicates || count > items.length) {
    // Allow duplicates when needed or when count exceeds pool size
    return Array.from({ length: count }, () => items[Math.floor(Math.random() * items.length)])
  }

  // Fisher-Yates shuffle for unique items
  const shuffled = [...items]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled.slice(0, count)
}

/**
 * Get a single random item from an array
 * @param items - Array of items to choose from
 * @returns A random item or null if array is empty
 */
export function getRandomItem<T>(items: T[]): T | null {
  if (!items.length) return null
  return items[Math.floor(Math.random() * items.length)]
}

/**
 * Get random abilities from an agent
 * @param agent - The agent to get abilities from
 * @param count - Number of abilities to return (default: all)
 * @returns Array of random abilities
 */
export function getRandomAbilities(agent: Agent, count?: number): Ability[] {
  const abilityCount = count ?? agent.abilities.length
  return getRandomItems(agent.abilities, abilityCount, false)
}

/**
 * Shuffle an array in place
 * @param array - Array to shuffle
 * @returns The shuffled array
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

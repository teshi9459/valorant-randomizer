import { fetchWithCache } from './valorant-api'
import { Weapon } from '@/types/models'

export async function fetchWeapons(): Promise<Weapon[]> {
  const weapons = await fetchWithCache<any[]>('/weapons')

  // Transform and filter weapons
  return weapons
    .filter(weapon => weapon.displayName && weapon.category)
    .map(weapon => ({
      ...weapon,
      // Remove EEquippableCategory:: prefix from category
      category: weapon.category.replace('EEquippableCategory::', '') as Weapon['category']
    }))
}

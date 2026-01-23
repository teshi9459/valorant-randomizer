import { fetchWithCache } from './valorant-api'
import { GameMap } from '@/types/models'

// Maps with 3 bomb sites
const THREE_SITE_MAPS = ['Bind', 'Haven', 'Lotus']

// Maps that are playable in Unrated/Competitive (exclude training, team deathmatch, etc.)
const PLAYABLE_MAPS = [
  'Ascent', 'Bind', 'Breeze', 'Fracture', 'Haven', 'Icebox',
  'Lotus', 'Pearl', 'Split', 'Sunset', 'Abyss'
]

function calculateSiteCount(map: any): 2 | 3 {
  // Check if map is in the known 3-site list
  if (THREE_SITE_MAPS.includes(map.displayName)) {
    return 3
  }

  // Try to determine from callouts if available
  if (map.callouts && Array.isArray(map.callouts)) {
    const siteCallouts = map.callouts.filter((c: any) =>
      c.regionName?.match(/^[ABC]\s+(Site|Main)/i)
    )
    return siteCallouts.length >= 3 ? 3 : 2
  }

  // Default to 2 sites
  return 2
}

export async function fetchMaps(): Promise<GameMap[]> {
  const maps = await fetchWithCache<any[]>('/maps')

  // Transform maps and add site count, filter to only playable maps
  return maps
    .filter(map => map.displayName && map.uuid && PLAYABLE_MAPS.includes(map.displayName))
    .map(map => ({
      ...map,
      siteCount: calculateSiteCount(map)
    }))
}

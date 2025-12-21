import { fetchWithCache } from './valorant-api'
import { Agent } from '@/types/models'

export async function fetchAgents(): Promise<Agent[]> {
  const agents = await fetchWithCache<Agent[]>('/agents')
  // Filter out non-playable characters
  return agents.filter(agent => agent.isPlayableCharacter)
}

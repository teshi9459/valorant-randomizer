import axios from 'axios'
import { cache } from './cache'
import { ApiResponse } from '@/types/api'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://valorant-api.com/v1'
// Use English for API requests to ensure consistency
const API_LANGUAGE = import.meta.env.VITE_API_LANGUAGE || 'en-US'

export const valorantApi = axios.create({
  baseURL: API_BASE_URL,
  params: {
    language: API_LANGUAGE
  }
})

export async function fetchWithCache<T>(
  endpoint: string,
  forceRefresh = false
): Promise<T> {
  // Check cache first
  if (!forceRefresh) {
    const cached = cache.get<T>(endpoint)
    if (cached) {
      console.log(`Cache hit for ${endpoint}`)
      return cached
    }
  }

  console.log(`Fetching from API: ${endpoint}`)

  try {
    const response = await valorantApi.get<ApiResponse<T>>(endpoint)

    if (response.data.status === 200) {
      cache.set(endpoint, response.data.data)
      return response.data.data
    }

    throw new Error(`API request failed with status ${response.data.status}`)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`API Error: ${error.message}`)
    }
    throw error
  }
}

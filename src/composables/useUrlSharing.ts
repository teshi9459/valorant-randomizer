import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useUrlSharing<T>() {
  const route = useRoute()
  const router = useRouter()
  const shareUrl = ref<string>('')
  const copySuccess = ref(false)

  /**
   * Encode state to base64 URL parameter
   */
  function encodeState(state: T): string {
    try {
      const json = JSON.stringify(state)
      return btoa(encodeURIComponent(json))
    } catch (error) {
      console.error('Failed to encode state:', error)
      return ''
    }
  }

  /**
   * Decode state from base64 URL parameter
   */
  function decodeState(encoded: string): T | null {
    try {
      const json = decodeURIComponent(atob(encoded))
      return JSON.parse(json)
    } catch (error) {
      console.error('Failed to decode state:', error)
      return null
    }
  }

  /**
   * Generate shareable URL with current state
   */
  function generateShareUrl(state: T): string {
    const encoded = encodeState(state)
    if (!encoded) return ''

    const baseUrl = window.location.origin
    const path = route.path
    return `${baseUrl}${path}?state=${encoded}`
  }

  /**
   * Copy share URL to clipboard
   */
  async function copyShareUrl(state: T): Promise<boolean> {
    const url = generateShareUrl(state)
    if (!url) return false

    try {
      await navigator.clipboard.writeText(url)
      shareUrl.value = url
      copySuccess.value = true

      // Reset success state after 3 seconds
      setTimeout(() => {
        copySuccess.value = false
      }, 3000)

      return true
    } catch (error) {
      console.error('Failed to copy URL:', error)
      return false
    }
  }

  /**
   * Load state from URL parameter
   */
  function loadStateFromUrl(): T | null {
    const stateParam = route.query.state as string
    if (!stateParam) return null

    const state = decodeState(stateParam)

    // Remove state parameter from URL after loading
    if (state) {
      router.replace({ query: {} })
    }

    return state
  }

  /**
   * Update URL with new state (without navigation)
   */
  function updateUrl(state: T): void {
    const encoded = encodeState(state)
    if (!encoded) return

    router.replace({
      query: { state: encoded }
    })
  }

  return {
    shareUrl,
    copySuccess,
    generateShareUrl,
    copyShareUrl,
    loadStateFromUrl,
    updateUrl
  }
}

import axios, { type AxiosError } from "axios"
import { toast } from "sonner"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

// Helper function to extract CSRF token from cookies
const getCsrfToken = (): string | null => {
  const cookies = document.cookie.split('; ')
  const csrfCookie = cookies.find(row => row.startsWith('csrftoken='))
  return csrfCookie ? csrfCookie.split('=')[1] : null
}

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add CSRF token to non-GET requests
    if (config.method && config.method.toLowerCase() !== 'get') {
      const csrfToken = getCsrfToken()
      if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Retry configuration
const MAX_RETRIES = 3
const RETRY_DELAYS = [1000, 2000, 4000] // Exponential backoff: 1s, 2s, 4s

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as any
    
    // Handle network errors with retry logic
    if (!error.response) {
      // Network error - check if we should retry
      config.retryCount = config.retryCount || 0
      
      if (config.retryCount < MAX_RETRIES) {
        config.retryCount += 1
        const delay = RETRY_DELAYS[config.retryCount - 1]
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay))
        
        // Retry the request
        return api(config)
      }
      
      // Max retries reached - show offline indicator
      toast.error("Network error. Please check your connection.")
      return Promise.reject(error)
    }

    const message =
      (error.response?.data as any)?.detail || 
      (error.response?.data as any)?.message || 
      "An error occurred"

    const status = error.response?.status

    if (status === 401) {
      // Unauthorized - redirect to login
      window.location.href = "/login"
    } else if (status === 403) {
      // Forbidden - permission denied
      toast.error("You do not have permission to perform this action")
    } else if (status && status >= 500) {
      // Server error
      toast.error("Server error. Please try again later.")
    } else if (status && status >= 400) {
      // Client error - show specific message
      toast.error(message)
    }

    return Promise.reject(error)
  },
)

export default api

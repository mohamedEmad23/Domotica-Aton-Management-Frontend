import axios, { type AxiosError } from "axios"
import { toast } from "sonner"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message =
      (error.response?.data as any)?.detail || (error.response?.data as any)?.message || "An error occurred"

    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      window.location.href = "/login"
    } else if (error.response?.status === 403) {
      toast.error("You do not have permission to perform this action")
    } else if (error.response?.status >= 500) {
      toast.error("Server error. Please try again later.")
    } else {
      toast.error(message)
    }

    return Promise.reject(error)
  },
)

export default api

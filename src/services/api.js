import axios from 'axios'

/**
 * Central Axios instance.
 * Base URL is read from the VITE_API_URL environment variable.
 * All API calls should go through this instance — never import axios directly in components.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/',
  timeout: 90_000, // 90 s — resume analysis can take up to 60 s
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Request interceptor — attaches the JWT token from localStorage if present.
 *
 * NOTE (security): Token is stored in localStorage as a known tradeoff.
 * Prefer httpOnly cookies when the backend supports them (see VITE_API_URL docs).
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/**
 * Response interceptor — strips the data wrapper so callers get `response.data` directly.
 * Also handles 401s by clearing stale tokens.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { login as loginService, signup as signupService, logout as logoutService } from '../services/authService'

const AuthContext = createContext(null)

/**
 * AuthProvider — holds user identity and JWT token.
 *
 * Token storage: localStorage (known security tradeoff).
 * Prefer httpOnly cookies once the backend supports Set-Cookie on login responses.
 * Reference: https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('token') || null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // On mount, re-hydrate user from localStorage if a token exists
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        // Corrupt data — clear it
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setToken(null)
      }
    }
  }, [])

  const _persist = useCallback((u, t) => {
    setUser(u)
    setToken(t)
    localStorage.setItem('token', t)
    localStorage.setItem('user', JSON.stringify(u))
  }, [])

  const login = useCallback(async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const { user: u, token: t } = await loginService(email, password)
      _persist(u, t)
      return { success: true }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Login failed'
      setError(msg)
      return { success: false, error: msg }
    } finally {
      setLoading(false)
    }
  }, [_persist])

  const signup = useCallback(async (name, email, password) => {
    setLoading(true)
    setError(null)
    try {
      const { user: u, token: t } = await signupService(name, email, password)
      _persist(u, t)
      return { success: true }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Signup failed'
      setError(msg)
      return { success: false, error: msg }
    } finally {
      setLoading(false)
    }
  }, [_persist])

  const logout = useCallback(async () => {
    try {
      if (token) {
        await logoutService();
      }
    } finally {
      setUser(null)
      setToken(null)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }, [token])

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    loading,
    error,
    login,
    signup,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

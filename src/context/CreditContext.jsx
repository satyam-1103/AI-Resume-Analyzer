import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import api from '../services/api'

import { useAuth } from './AuthContext'

const CreditContext = createContext(null)

/**
 * CreditProvider — fetches and caches the user's credit balance.
 *
 * IMPORTANT: Credits are NEVER decremented on the frontend.
 * Only the backend is authoritative. Call `refetch()` after any action
 * that may consume credits (e.g., after a resume analysis completes).
 */
export function CreditProvider({ children }) {
  const { token } = useAuth()
  const [credits, setCredits] = useState(null)   // null = not loaded yet
  const [resetDate, setResetDate] = useState(null)
  const [loading, setLoading] = useState(false)

  const refetch = useCallback(async () => {
    setLoading(true)
    try {
      const response = await api.get('/credits')
      const data = response.data?.data || response.data
      setCredits(data.creditsBalance)
      setResetDate(data.creditsResetAt)
    } catch (err) {
      console.error('Failed to fetch credits:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (token) {
      refetch()
    } else {
      setCredits(null)
      setResetDate(null)
    }
  }, [token, refetch])

  return (
    <CreditContext.Provider value={{ credits, resetDate, loading, refetch }}>
      {children}
    </CreditContext.Provider>
  )
}

export function useCredits() {
  const ctx = useContext(CreditContext)
  if (!ctx) throw new Error('useCredits must be used within CreditProvider')
  return ctx
}

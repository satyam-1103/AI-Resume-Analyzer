import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import api from '../services/api'

const CreditContext = createContext(null)

// TODO: replace mock — remove MOCK_CREDITS and fetch from GET /api/user/credits
const MOCK_CREDITS = {
  remaining: 6,
  resetDate: '2026-08-01T00:00:00Z',
}

/**
 * CreditProvider — fetches and caches the user's credit balance.
 *
 * IMPORTANT: Credits are NEVER decremented on the frontend.
 * Only the backend is authoritative. Call `refetch()` after any action
 * that may consume credits (e.g., after a resume analysis completes).
 */
export function CreditProvider({ children }) {
  const [credits, setCredits] = useState(null)   // null = not loaded yet
  const [resetDate, setResetDate] = useState(null)
  const [loading, setLoading] = useState(false)

  const refetch = useCallback(async () => {
    setLoading(true)
    try {
      // TODO: replace mock
      await delay(300)
      setCredits(MOCK_CREDITS.remaining)
      setResetDate(MOCK_CREDITS.resetDate)

      // Real call:
      // const { data } = await api.get('/user/credits')
      // setCredits(data.remaining)
      // setResetDate(data.resetDate)
    } catch (err) {
      console.error('Failed to fetch credits:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Fetch credits on first render; skip if not authenticated (api interceptor handles 401)
    refetch()
  }, [refetch])

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

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

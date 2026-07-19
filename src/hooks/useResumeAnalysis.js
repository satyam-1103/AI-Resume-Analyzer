import { useCallback, useState } from 'react'
import { analyzeResume } from '../services/resumeService'
import { useCredits } from './useCredits'

/**
 * useResumeAnalysis — orchestrates the full resume analysis flow.
 *
 * After a successful analysis, automatically refetches the credit balance
 * from the backend (never decrements client-side).
 */
export function useResumeAnalysis() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { refetch: refetchCredits } = useCredits()

  const analyze = useCallback(async (file, jobDescription) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const data = await analyzeResume(file, jobDescription)
      setResult(data)
      // Refetch credit balance — backend is the source of truth
      await refetchCredits()
      return data
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Analysis failed'
      setError(msg)
      return null
    } finally {
      setLoading(false)
    }
  }, [refetchCredits])

  const reset = useCallback(() => {
    setResult(null)
    setError(null)
    setLoading(false)
  }, [])

  return { analyze, result, loading, error, reset }
}

import { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useCredits } from '../../hooks/useCredits'
import { addCreditsToSelf } from '../../services/creditService'
import Button from '../common/Button'

export default function AdminCreditGenerator() {
  const { user } = useAuth()
  const { refetch } = useCredits()
  const [amount, setAmount] = useState('')
  const [reason, setReason] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState(null)

  // Keep this feature out of the DOM for every non-admin role.
  if (user?.role !== 'admin') return null

  async function handleSubmit(event) {
    event.preventDefault()
    const parsedAmount = Number(amount)

    if (!Number.isInteger(parsedAmount) || parsedAmount < 1 || parsedAmount > 1000) {
      setMessage({ type: 'error', text: 'Enter a whole number from 1 to 1,000.' })
      return
    }

    if (!reason.trim()) {
      setMessage({ type: 'error', text: 'Enter a reason for this credit grant.' })
      return
    }

    setSubmitting(true)
    setMessage(null)
    try {
      await addCreditsToSelf(parsedAmount, reason.trim())
      await refetch()
      setAmount('')
      setReason('')
      setMessage({ type: 'success', text: 'Credits generated successfully.' })
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Unable to generate credits. Please try again.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="card p-6" aria-labelledby="admin-credit-generator-title">
      <div className="flex items-center gap-2">
        <PlusCircle size={18} className="text-violet-600 dark:text-violet-400" />
        <div>
          <h2 id="admin-credit-generator-title" className="text-sm font-semibold text-[color:var(--text-primary)]">
            Admin credit generator
          </h2>
          <p className="mt-1 text-xs text-[color:var(--text-muted)]">Add credits to your own account.</p>
        </div>
      </div>

      <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
        <label className="block text-xs font-medium text-[color:var(--text-secondary)]">
          Credits
          <input
            type="number"
            min="1"
            max="1000"
            step="1"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="mt-1.5 w-full rounded-lg border border-[color:var(--border-base)] bg-[color:var(--bg-base)] px-3 py-2 text-sm text-[color:var(--text-primary)] outline-none focus:border-violet-500"
            required
          />
        </label>
        <label className="block text-xs font-medium text-[color:var(--text-secondary)]">
          Reason
          <input
            type="text"
            maxLength="500"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            className="mt-1.5 w-full rounded-lg border border-[color:var(--border-base)] bg-[color:var(--bg-base)] px-3 py-2 text-sm text-[color:var(--text-primary)] outline-none focus:border-violet-500"
            required
          />
        </label>
        {message && (
          <p className={`text-xs ${message.type === 'success' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`} role="status">
            {message.text}
          </p>
        )}
        <Button type="submit" size="sm" fullWidth disabled={submitting}>
          {submitting ? 'Generating…' : 'Generate credits'}
        </Button>
      </form>
    </section>
  )
}

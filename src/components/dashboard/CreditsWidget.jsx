import { Link } from 'react-router-dom'
import { Zap, ArrowRight, RefreshCw } from 'lucide-react'
import { useCredits } from '../../hooks/useCredits'
import Button from '../common/Button'

export default function CreditsWidget() {
  const { credits, resetDate, loading, refetch } = useCredits()

  const TOTAL = 10
  const used = typeof credits === 'number' ? TOTAL - credits : null
  const pct = credits !== null ? Math.min(100, (credits / TOTAL) * 100) : 0

  const resetLabel = resetDate
    ? new Date(resetDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : '—'

  const isLow = typeof credits === 'number' && credits < 4

  return (
    <div className={`card p-6 ${isLow ? 'border-amber-300 dark:border-amber-700' : ''}`}>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400">
            <Zap size={18} />
          </span>
          <div>
            <p className="text-sm font-semibold text-[color:var(--text-primary)]">Monthly Credits</p>
            <p className="text-xs text-[color:var(--text-muted)]">Resets {resetLabel}</p>
          </div>
        </div>
        <button
          onClick={refetch}
          disabled={loading}
          aria-label="Refresh credits"
          className="rounded-lg p-1.5 text-[color:var(--text-muted)] hover:bg-[color:var(--bg-subtle)] transition-colors disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Balance */}
      <div className="mb-4">
        <div className="flex items-end gap-1">
          <span className="text-4xl font-bold text-[color:var(--text-primary)]">
            {credits ?? '—'}
          </span>
          <span className="mb-1 text-lg text-[color:var(--text-muted)]">/ {TOTAL}</span>
        </div>
        <p className="text-xs text-[color:var(--text-muted)]">
          {used !== null ? `${used} used · ` : ''}
          {credits} remaining
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-5 h-2 rounded-full bg-[color:var(--bg-muted)] overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${isLow ? 'bg-amber-500' : 'bg-violet-600'
            }`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Low-credit warning */}
      {isLow && (
        <p className="mb-4 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 px-3 py-2 text-xs text-amber-700 dark:text-amber-300">
          You need at least 4 credits to run an analysis.
          {credits === 0 && ` You're out of credits for this month.`}
        </p>
      )}

      <Button as={Link} to="/dashboard/ats" size="sm" fullWidth variant={isLow ? 'secondary' : 'primary'} disabled={credits === 0}>
        Run ATS Analysis <ArrowRight size={15} />
      </Button>
    </div>
  )
}

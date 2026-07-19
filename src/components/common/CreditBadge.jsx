import { Zap } from 'lucide-react'
import { useCredits } from '../../hooks/useCredits'

/**
 * CreditBadge — displays the user's current credit balance and reset date.
 * Reads from CreditContext — no props needed.
 */
export default function CreditBadge({ className = '' }) {
  const { credits, resetDate, loading } = useCredits()

  const resetLabel = resetDate
    ? new Date(resetDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : '—'

  if (loading && credits === null) {
    return (
      <div className={`h-8 w-44 animate-pulse rounded-full bg-[color:var(--bg-muted)] ${className}`} />
    )
  }

  const isLow = typeof credits === 'number' && credits < 4

  return (
    <div
      className={`
        inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium
        border transition-colors
        ${
          isLow
            ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
            : 'bg-[color:var(--bg-subtle)] border-[color:var(--border-base)] text-[color:var(--text-secondary)]'
        }
        ${className}
      `}
      title={`Resets ${resetLabel}`}
    >
      <Zap
        size={14}
        className={isLow ? 'text-amber-500' : 'text-violet-500 dark:text-violet-400'}
        fill={isLow ? 'currentColor' : 'none'}
      />
      <span>
        <span className="font-semibold text-[color:var(--text-primary)]">
          {credits ?? '—'}
        </span>
        <span className="text-[color:var(--text-muted)]"> / 10 credits</span>
      </span>
      <span className="hidden sm:inline text-[color:var(--text-muted)]">·</span>
      <span className="hidden sm:inline text-[color:var(--text-muted)]">resets {resetLabel}</span>
    </div>
  )
}

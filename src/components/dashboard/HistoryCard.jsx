import { Link } from 'react-router-dom'
import { FileText, ExternalLink } from 'lucide-react'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/**
 * HistoryCard — mobile card view for a single history item.
 */
export default function HistoryCard({ item }) {
  const scoreColor =
    item.atsScore >= 75
      ? 'text-green-600 dark:text-green-400'
      : item.atsScore >= 50
      ? 'text-amber-600 dark:text-amber-400'
      : 'text-red-600 dark:text-red-400'

  return (
    <div className="card-sm p-4 flex items-center gap-4">
      {/* Score circle */}
      <div className={`shrink-0 text-2xl font-bold ${scoreColor} w-14 text-center`}>
        {item.atsScore}
        <span className="text-xs font-normal text-[color:var(--text-muted)] block">/ 100</span>
      </div>

      {/* Details */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 truncate">
          <FileText size={13} className="shrink-0 text-[color:var(--text-muted)]" />
          <p className="truncate text-sm font-medium text-[color:var(--text-primary)]">
            {item.filename}
          </p>
        </div>
        <p className="mt-0.5 text-xs text-[color:var(--text-muted)]">
          {formatDate(item.date)} · {item.creditsUsed} credits used
        </p>
      </div>

      {/* Link */}
      <Link
        to={`/dashboard/history/${item.id}`}
        aria-label={`View details for ${item.filename}`}
        className="shrink-0 rounded-lg p-2 text-[color:var(--text-muted)] hover:bg-[color:var(--bg-subtle)] hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
      >
        <ExternalLink size={15} />
      </Link>
    </div>
  )
}

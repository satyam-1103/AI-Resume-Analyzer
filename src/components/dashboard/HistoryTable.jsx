import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'

function ScoreBadge({ score }) {
  const color =
    score >= 75
      ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300'
      : score >= 50
      ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
      : 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300'

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${color}`}>
      {score}
    </span>
  )
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/**
 * HistoryTable — desktop table view of past analyses.
 */
export default function HistoryTable({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="card p-12 text-center">
        <p className="text-4xl mb-3">📄</p>
        <p className="font-semibold text-[color:var(--text-primary)]">No analyses yet</p>
        <p className="mt-1 text-sm text-[color:var(--text-muted)]">
          Run your first ATS check to see results here.
        </p>
      </div>
    )
  }

  return (
    <div className="card overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[color:var(--border-base)] bg-[color:var(--bg-subtle)]">
            <th className="px-5 py-3 text-left font-semibold text-[color:var(--text-secondary)]">Date</th>
            <th className="px-5 py-3 text-left font-semibold text-[color:var(--text-secondary)]">File</th>
            <th className="px-5 py-3 text-center font-semibold text-[color:var(--text-secondary)]">ATS Score</th>
            <th className="px-5 py-3 text-center font-semibold text-[color:var(--text-secondary)]">Credits</th>
            <th className="px-5 py-3 text-right font-semibold text-[color:var(--text-secondary)]"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr
              key={item._id || item.id}
              className={`border-b border-[color:var(--border-base)] hover:bg-[color:var(--bg-subtle)] transition-colors ${
                i === items.length - 1 ? 'border-b-0' : ''
              }`}
            >
              <td className="px-5 py-4 text-[color:var(--text-secondary)] whitespace-nowrap">
                {formatDate(item.createdAt || item.date)}
              </td>
              <td className="px-5 py-4 max-w-[200px] truncate text-[color:var(--text-primary)]" title={item.filename}>
                {item.filename}
              </td>
              <td className="px-5 py-4 text-center">
                <ScoreBadge score={item.atsScore} />
              </td>
              <td className="px-5 py-4 text-center text-[color:var(--text-muted)]">
                {item.creditsUsed}
              </td>
              <td className="px-5 py-4 text-right">
                <Link
                  to={`/dashboard/history/${item._id || item.id}`}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/40 transition-colors"
                >
                  View details <ExternalLink size={12} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

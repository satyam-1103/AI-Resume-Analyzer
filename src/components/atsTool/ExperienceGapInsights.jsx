import { Briefcase, AlertTriangle } from 'lucide-react'

/**
 * ExperienceGapInsights — list of work experience gap findings.
 */
export default function ExperienceGapInsights({ items = [] }) {
  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center gap-2">
        <Briefcase size={18} className="text-amber-600 dark:text-amber-400" />
        <h3 className="font-semibold text-[color:var(--text-primary)]">Experience Gaps</h3>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-[color:var(--text-muted)]">
          No significant experience gaps found. Your work history reads clearly.
        </p>
      ) : (
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <AlertTriangle
                size={15}
                className="mt-0.5 shrink-0 text-amber-500"
              />
              <span className="text-[color:var(--text-secondary)] leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

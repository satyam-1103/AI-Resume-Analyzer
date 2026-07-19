import { GraduationCap, Info } from 'lucide-react'

/**
 * EducationInsights — list of education-related improvement notes.
 */
export default function EducationInsights({ items = [] }) {
  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center gap-2">
        <GraduationCap size={18} className="text-cyan-600 dark:text-cyan-400" />
        <h3 className="font-semibold text-[color:var(--text-primary)]">Education Insights</h3>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-[color:var(--text-muted)]">
          No education issues detected. Your education section looks solid.
        </p>
      ) : (
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <Info
                size={15}
                className="mt-0.5 shrink-0 text-cyan-600 dark:text-cyan-400"
              />
              <span className="text-[color:var(--text-secondary)] leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

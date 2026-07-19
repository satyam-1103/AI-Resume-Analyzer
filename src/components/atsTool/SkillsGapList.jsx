import { CheckCircle2, XCircle } from 'lucide-react'
import { motion } from 'framer-motion'

function SkillChip({ skill, type }) {
  const isGap = type === 'gap'
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
        isGap
          ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300'
          : 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300'
      }`}
    >
      {isGap ? <XCircle size={11} /> : <CheckCircle2 size={11} />}
      {skill}
    </motion.span>
  )
}

/**
 * SkillsGapList — two-column layout: skill gaps and skill strengths.
 */
export default function SkillsGapList({ gaps = [], strengths = [] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {/* Gaps */}
      <div className="card p-5">
        <div className="mb-4 flex items-center gap-2">
          <XCircle size={18} className="text-red-500" />
          <h3 className="font-semibold text-[color:var(--text-primary)]">Skills to Add</h3>
          <span className="ml-auto rounded-full bg-red-100 dark:bg-red-950 px-2 py-0.5 text-xs font-semibold text-red-600 dark:text-red-400">
            {gaps.length}
          </span>
        </div>
        {gaps.length === 0 ? (
          <p className="text-sm text-[color:var(--text-muted)]">No skill gaps detected — great job!</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {gaps.map((s, i) => (
              <SkillChip key={`${s}-${i}`} skill={s} type="gap" />
            ))}
          </div>
        )}
      </div>

      {/* Strengths */}
      <div className="card p-5">
        <div className="mb-4 flex items-center gap-2">
          <CheckCircle2 size={18} className="text-green-500" />
          <h3 className="font-semibold text-[color:var(--text-primary)]">Skill Strengths</h3>
          <span className="ml-auto rounded-full bg-green-100 dark:bg-green-950 px-2 py-0.5 text-xs font-semibold text-green-600 dark:text-green-400">
            {strengths.length}
          </span>
        </div>
        {strengths.length === 0 ? (
          <p className="text-sm text-[color:var(--text-muted)]">No matching skills found.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {strengths.map((s, i) => (
              <SkillChip key={`${s}-${i}`} skill={s} type="strength" />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

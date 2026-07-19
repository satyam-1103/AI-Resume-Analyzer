import { motion } from 'framer-motion'

function scoreColor(score) {
  if (score >= 75) return { stroke: '#10b981', text: 'text-green-600 dark:text-green-400', label: 'Excellent' }
  if (score >= 50) return { stroke: '#f59e0b', text: 'text-amber-600 dark:text-amber-400', label: 'Good' }
  return { stroke: '#ef4444', text: 'text-red-600 dark:text-red-400', label: 'Needs Work' }
}

/**
 * ScoreGauge — SVG arc gauge showing the ATS score (0-100).
 */
export default function ScoreGauge({ score = 0 }) {
  const { stroke, text, label } = scoreColor(score)
  const radius = 80
  const circumference = 2 * Math.PI * radius
  // Use 75% of the circle (270 degrees) as the gauge arc
  const arcLength = circumference * 0.75
  const offset = arcLength - (arcLength * Math.min(100, Math.max(0, score))) / 100

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <svg width="200" height="160" viewBox="0 0 200 200" className="mb-10">
          {/* Background track */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="var(--bg-muted)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={0}
            transform="rotate(135 100 100)"
          />
          {/* Animated score arc */}
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={stroke}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${arcLength} ${circumference}`}
            initial={{ strokeDashoffset: arcLength }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            transform="rotate(135 100 100)"
          />
        </svg>

        {/* Score text in centre */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pb-6">
          <motion.span
            className={`text-5xl font-bold ${text}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {Math.round(score)}
          </motion.span>
          <span className="text-xs text-[color:var(--text-muted)] font-medium">/ 100</span>
        </div>
      </div>

      {/* Label */}
      <div className="text-center">
        <p className={`text-base font-semibold ${text}`}>{label}</p>
        <p className="text-sm text-[color:var(--text-secondary)] max-w-xs">
          {score >= 75
            ? 'Your resume is well-optimized for ATS filters.'
            : score >= 50
              ? 'A few targeted changes can significantly boost your score.'
              : 'Your resume needs stronger ATS alignment. Focus on keywords and structure.'}
        </p>
      </div>
    </div>
  )
}

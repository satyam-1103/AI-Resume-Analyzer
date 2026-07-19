import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

/**
 * Loader — versatile loading indicator.
 *
 * Variants:
 *   page     — full-viewport centered spinner
 *   inline   — compact inline spinner with label
 *   analysis — large "Analyzing..." state for the ATS tool
 */
export default function Loader({ variant = 'inline', label = 'Loading...' }) {
  if (variant === 'page') {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-[color:var(--bg-base)]">
        <Spinner size={40} />
        <p className="text-sm text-[color:var(--text-secondary)]">{label}</p>
      </div>
    )
  }

  if (variant === 'analysis') {
    return (
      <div className="flex flex-col items-center gap-6 py-16 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="relative h-20 w-20"
        >
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-[color:var(--border-base)]" />
          {/* Spinning arc */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-600 dark:border-t-violet-400" />
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles size={22} className="text-violet-600 dark:text-violet-400" />
          </div>
        </motion.div>

        <div>
          <AnimatedDots label="Analyzing your resume" />
          <p className="mt-2 text-sm text-[color:var(--text-muted)] max-w-xs mx-auto">
            Our AI is reading your resume and running ATS checks. This can take up to 30–60 seconds.
          </p>
        </div>

        {/* Progress bar */}
        <ProgressBar />
      </div>
    )
  }

  // Default inline
  return (
    <span className="inline-flex items-center gap-2 text-sm text-[color:var(--text-secondary)]">
      <Spinner size={16} />
      {label}
    </span>
  )
}

function Spinner({ size = 20 }) {
  return (
    <svg
      style={{ width: size, height: size }}
      className="animate-spin text-violet-600 dark:text-violet-400"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      />
    </svg>
  )
}

function AnimatedDots({ label }) {
  return (
    <motion.p
      className="text-base font-semibold text-[color:var(--text-primary)]"
      animate={{ opacity: [1, 0.6, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      {label}
      <span className="ml-1 tracking-widest">...</span>
    </motion.p>
  )
}

function ProgressBar() {
  return (
    <div className="w-64 h-1.5 rounded-full bg-[color:var(--bg-muted)] overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-500"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

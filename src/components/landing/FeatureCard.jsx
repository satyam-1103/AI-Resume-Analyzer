import { motion } from 'framer-motion'

/**
 * FeatureCard — displays a single feature with icon, title, description, and credit cost tag.
 */
export default function FeatureCard({ icon: Icon, title, description, credits, color = 'violet' }) {
  const colorMap = {
    violet: {
      icon: 'bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400',
      tag: 'bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800',
    },
    cyan: {
      icon: 'bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400',
      tag: 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
    },
  }

  const c = colorMap[color] || colorMap.violet

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)' }}
      transition={{ duration: 0.2 }}
      className="card p-6 flex flex-col gap-4"
    >
      {/* Icon */}
      <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${c.icon}`}>
        <Icon size={22} />
      </span>

      {/* Content */}
      <div>
        <h3 className="font-semibold text-[color:var(--text-primary)]">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--text-secondary)]">
          {description}
        </p>
      </div>

      {/* Credit tag */}
      {credits && (
        <span
          className={`self-start rounded-full border px-2.5 py-0.5 text-xs font-semibold ${c.tag}`}
        >
          {credits} credits
        </span>
      )}
    </motion.div>
  )
}

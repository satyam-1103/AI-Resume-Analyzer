import { Monitor, Moon, Sun } from 'lucide-react'
import { THEMES, useTheme } from '../../context/ThemeContext'

const OPTIONS = [
  { value: THEMES.LIGHT,  icon: Sun,     label: 'Light' },
  { value: THEMES.SYSTEM, icon: Monitor, label: 'System' },
  { value: THEMES.DARK,   icon: Moon,    label: 'Dark' },
]

/**
 * ThemeToggle — 3-way pill toggle: Light / System / Dark.
 * Can be rendered in navbar or dashboard top bar.
 */
export default function ThemeToggle({ className = '' }) {
  const { theme, setTheme } = useTheme()

  return (
    <div
      role="group"
      aria-label="Color theme"
      className={`
        inline-flex items-center gap-0.5 rounded-xl p-1
        bg-[color:var(--bg-subtle)] border border-[color:var(--border-base)]
        ${className}
      `}
    >
      {OPTIONS.map(({ value, icon: Icon, label }) => {
        const active = theme === value
        return (
          <button
            key={value}
            onClick={() => setTheme(value)}
            aria-pressed={active}
            aria-label={`${label} theme`}
            title={label}
            className={`
              flex items-center justify-center rounded-lg p-1.5 transition-all duration-150
              ${
                active
                  ? 'bg-[color:var(--bg-surface)] shadow-sm text-violet-600 dark:text-violet-400'
                  : 'text-[color:var(--text-muted)] hover:text-[color:var(--text-secondary)]'
              }
            `}
          >
            <Icon size={15} />
          </button>
        )
      })}
    </div>
  )
}

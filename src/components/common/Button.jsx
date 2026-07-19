import { motion } from 'framer-motion'

/**
 * Button — variant-aware button component.
 *
 * Variants:
 *   primary   — violet filled, for primary actions
 *   secondary — outlined, for secondary actions
 *   ghost     — text-only, for tertiary actions
 *   danger    — red filled, for destructive actions
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  ...rest
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 select-none'

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  }

  const variants = {
    primary:
      'bg-violet-600 dark:bg-violet-500 text-white hover:bg-violet-700 dark:hover:bg-violet-600 focus-visible:outline-violet-600 shadow-sm hover:shadow-md active:scale-[0.98]',
    secondary:
      'border border-[color:var(--border-strong)] bg-[color:var(--bg-surface)] text-[color:var(--text-primary)] hover:bg-[color:var(--bg-subtle)] focus-visible:outline-violet-600 shadow-sm hover:shadow-md active:scale-[0.98]',
    ghost:
      'text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--bg-subtle)] focus-visible:outline-violet-600 active:scale-[0.98]',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-600 shadow-sm hover:shadow-md active:scale-[0.98]',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={disabled || loading ? {} : { y: -1 }}
      whileTap={disabled || loading ? {} : { scale: 0.98 }}
      className={`
        ${base}
        ${sizes[size]}
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
        ${className}
      `}
      {...rest}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
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
      )}
      {children}
    </motion.button>
  )
}

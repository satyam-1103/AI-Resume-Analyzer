/**
 * Input — labeled text input with validation error state.
 */
export default function Input({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  hint,
  required = false,
  disabled = false,
  className = '',
  ...rest
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-[color:var(--text-primary)]"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`
          w-full rounded-lg border px-3.5 py-2.5 text-sm
          bg-[color:var(--bg-surface)] text-[color:var(--text-primary)]
          placeholder:text-[color:var(--text-muted)]
          transition-colors duration-150
          focus:outline-none focus:ring-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${
            error
              ? 'border-red-400 focus:ring-red-300'
              : 'border-[color:var(--border-base)] focus:border-violet-400 focus:ring-violet-200 dark:focus:ring-violet-900'
          }
        `}
        {...rest}
      />

      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-xs text-[color:var(--text-muted)]">{hint}</p>
      )}
    </div>
  )
}

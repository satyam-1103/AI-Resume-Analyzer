/**
 * HowItWorksStep — a single numbered step in the how-it-works sequence.
 */
export default function HowItWorksStep({ step, icon: Icon, title, description, isLast = false }) {
  return (
    <div className="relative flex gap-5">
      {/* Step number + connector line */}
      <div className="flex flex-col items-center">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 font-bold text-sm">
          {step}
        </div>
        {!isLast && (
          <div className="mt-2 w-0.5 flex-1 bg-gradient-to-b from-violet-200 dark:from-violet-800 to-transparent min-h-10" />
        )}
      </div>

      {/* Content */}
      <div className="pb-10">
        <div className="mb-1 flex items-center gap-2">
          <Icon size={16} className="text-violet-600 dark:text-violet-400" />
          <h3 className="font-semibold text-[color:var(--text-primary)]">{title}</h3>
        </div>
        <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
          {description}
        </p>
      </div>
    </div>
  )
}

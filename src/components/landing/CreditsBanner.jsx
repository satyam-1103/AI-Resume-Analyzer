import { Zap } from 'lucide-react'

export default function CreditsBanner() {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-violet-200 dark:border-violet-800 bg-gradient-to-br from-violet-50 to-cyan-50 dark:from-violet-950/50 dark:to-cyan-950/30 px-8 py-8 text-center">
      <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 text-white">
        <Zap size={22} />
      </div>
      <p className="text-xl font-bold text-[color:var(--text-primary)]">
        10 credits free, every month
      </p>
      <p className="mt-1.5 text-sm text-[color:var(--text-secondary)]">
        No credit card required to start. Credits reset automatically on the 1st of each month.
      </p>
    </div>
  )
}

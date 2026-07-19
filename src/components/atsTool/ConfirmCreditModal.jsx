import { Zap, AlertTriangle } from 'lucide-react'
import Modal from '../common/Modal'
import Button from '../common/Button'

const COST = 4

/**
 * ConfirmCreditModal — shown before submitting a resume for analysis.
 * Disables the confirm action if credits are insufficient.
 */
export default function ConfirmCreditModal({ open, onClose, onConfirm, credits, loading }) {
  const hasEnough = typeof credits === 'number' && credits >= COST

  return (
    <Modal open={open} onClose={onClose} title="Confirm Analysis">
      {/* Cost summary */}
      <div className="mb-5 flex items-start gap-4 rounded-xl bg-[color:var(--bg-subtle)] p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400">
          <Zap size={20} />
        </div>
        <div>
          <p className="font-semibold text-[color:var(--text-primary)]">
            This analysis costs <span className="text-violet-600 dark:text-violet-400">{COST} credits</span>
          </p>
          <p className="mt-0.5 text-sm text-[color:var(--text-secondary)]">
            You currently have{' '}
            <strong className={hasEnough ? 'text-[color:var(--text-primary)]' : 'text-red-600 dark:text-red-400'}>
              {credits ?? '—'} credits
            </strong>{' '}
            remaining.
          </p>
        </div>
      </div>

      {/* Insufficient credits warning */}
      {!hasEnough && (
        <div className="mb-5 flex items-start gap-2 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 px-4 py-3">
          <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-500" />
          <p className="text-sm text-amber-700 dark:text-amber-300">
            You don't have enough credits to run this analysis.
            Your credits reset on the 1st of each month — come back then, or check back soon.
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button variant="ghost" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          disabled={!hasEnough || loading}
          loading={loading}
        >
          {loading ? 'Analyzing...' : `Confirm — Use ${COST} credits`}
        </Button>
      </div>
    </Modal>
  )
}

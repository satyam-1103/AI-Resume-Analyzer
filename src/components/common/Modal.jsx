import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

/**
 * Modal — accessible dialog wrapper.
 *
 * Props:
 *   open        — controls visibility
 *   onClose     — called when backdrop or × is clicked
 *   title       — modal heading
 *   children    — modal body
 *   maxWidth    — Tailwind max-w class (default: 'max-w-md')
 */
export default function Modal({ open, onClose, title, children, maxWidth = 'max-w-md' }) {
  // Trap focus / prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose?.() }
    if (open) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            className={`relative z-10 w-full ${maxWidth} card-lg p-6`}
          >
            {/* Header */}
            <div className="mb-5 flex items-start justify-between gap-4">
              <h2
                id="modal-title"
                className="text-lg font-semibold text-[color:var(--text-primary)]"
              >
                {title}
              </h2>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="shrink-0 rounded-lg p-1.5 text-[color:var(--text-muted)] hover:bg-[color:var(--bg-subtle)] hover:text-[color:var(--text-primary)] transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

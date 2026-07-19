import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Sparkles, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import Button from './Button'

const NAV_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'How it works', href: '/#how-it-works' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--border-base)] bg-[color:var(--bg-surface)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-[color:var(--text-primary)] hover:opacity-80 transition-opacity"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white">
            <Sparkles size={16} />
          </span>
          <span className="text-base tracking-tight">ResumeAI</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="rounded-lg px-3 py-2 text-sm text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--bg-subtle)] transition-colors"
            >
              {label}
            </a>
          ))}
          <span className="mx-1 text-[color:var(--border-strong)]">|</span>
          <Link
            to="/login"
            className="rounded-lg px-3 py-2 text-sm text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--bg-subtle)] transition-colors"
          >
            Log in
          </Link>
          <span
            aria-disabled="true"
            title="Upgrade plans coming soon"
            className="rounded-lg px-3 py-2 text-sm text-[color:var(--text-muted)] cursor-not-allowed select-none"
          >
            Upgrade
          </span>
        </nav>

        {/* Desktop right: theme + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button as={Link} to="/signup" size="sm">
            Sign up free
          </Button>
        </div>

        {/* Mobile: theme + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[color:var(--border-base)] text-[color:var(--text-secondary)] hover:bg-[color:var(--bg-subtle)] transition-colors"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-[color:var(--border-base)] bg-[color:var(--bg-surface)] overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-[color:var(--text-secondary)] hover:bg-[color:var(--bg-subtle)] transition-colors"
                >
                  {label}
                </a>
              ))}
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-[color:var(--text-secondary)] hover:bg-[color:var(--bg-subtle)] transition-colors"
              >
                Log in
              </Link>
              <div className="pt-2">
                <Button to="/signup" fullWidth size="sm" onClick={() => setMobileOpen(false)}>
                  Sign up free
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

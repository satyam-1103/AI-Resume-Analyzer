import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--border-base)] bg-[color:var(--bg-surface)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold text-[color:var(--text-primary)] hover:opacity-80 transition-opacity"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600 text-white">
            <Sparkles size={14} />
          </span>
          <span className="text-sm">ResumeAI</span>
        </Link>

        {/* Links */}
        <nav className="flex items-center gap-6 text-sm text-[color:var(--text-muted)]">
          <a href="/privacy" className="hover:text-[color:var(--text-secondary)] transition-colors">
            Privacy
          </a>
          <a href="mailto:contact@resumeai.app" className="hover:text-[color:var(--text-secondary)] transition-colors">
            Contact
          </a>
        </nav>

        {/* Copyright */}
        <p className="text-sm text-[color:var(--text-muted)]">
          © {new Date().getFullYear()} ResumeAI. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

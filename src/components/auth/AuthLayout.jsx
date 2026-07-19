import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

/**
 * AuthLayout — split-screen wrapper for Login and Signup pages.
 * Left panel: brand / feature highlights.
 * Right panel: the form passed as children.
 */
export default function AuthLayout({ children, mode = 'login' }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* ── Left brand panel ─────────────────────────────────── */}
      <aside className="hidden md:flex md:w-5/12 lg:w-2/5 flex-col justify-between bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 p-10 text-white">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
            <Sparkles size={16} />
          </span>
          ResumeAI
        </Link>

        {/* Hero copy */}
        <div>
          <h1 className="text-3xl font-bold leading-snug">
            AI-powered resume analysis that gets you hired.
          </h1>
          <p className="mt-4 text-white/80 text-sm leading-relaxed">
            Upload your resume, get an instant ATS score, skills gap report, education
            feedback, and actionable improvements — in under 60 seconds.
          </p>

          <ul className="mt-8 space-y-3 text-sm">
            {[
              'ATS Score Checker — know your pass rate before applying',
              'Skills gap analysis with matched & missing skills',
              'Education & experience gap insights',
              '10 free credits every month — no card required',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-white/90">
                <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-white/30 flex items-center justify-center text-[10px]">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-white/50">
          © {new Date().getFullYear()} ResumeAI
        </p>
      </aside>

      {/* ── Right form panel ─────────────────────────────────── */}
      <main className="flex flex-1 flex-col items-center justify-center bg-[color:var(--bg-base)] p-6 sm:p-10">
        {/* Mobile logo */}
        <Link
          to="/"
          className="mb-8 flex items-center gap-2 font-bold text-[color:var(--text-primary)] md:hidden"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white">
            <Sparkles size={16} />
          </span>
          ResumeAI
        </Link>

        <div className="w-full max-w-md">
          {children}
        </div>

        {/* Toggle between login / signup */}
        <p className="mt-6 text-sm text-[color:var(--text-muted)]">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-violet-600 dark:text-violet-400 hover:underline">
                Sign up free
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-violet-600 dark:text-violet-400 hover:underline">
                Log in
              </Link>
            </>
          )}
        </p>
      </main>
    </div>
  )
}

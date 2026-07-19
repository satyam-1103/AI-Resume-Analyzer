import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Sidebar from './Sidebar'
import CreditBadge from '../common/CreditBadge'
import ThemeToggle from '../common/ThemeToggle'
import { useAuth } from '../../hooks/useAuth'

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-[color:var(--bg-base)]">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main column — offset by sidebar width on desktop */}
      <div className="lg:pl-[240px] transition-all duration-300">
        {/* Top bar — always visible across all dashboard pages */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-[color:var(--border-base)] bg-[color:var(--bg-surface)]/90 backdrop-blur-md px-4 sm:px-6">
          {/* Mobile hamburger */}
          <button
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="flex lg:hidden h-9 w-9 items-center justify-center rounded-lg border border-[color:var(--border-base)] text-[color:var(--text-secondary)] hover:bg-[color:var(--bg-subtle)] transition-colors"
          >
            <Menu size={18} />
          </button>

          {/* Left spacer on desktop */}
          <div className="hidden lg:block" />

          {/* Right: credits + theme toggle */}
          <div className="flex items-center gap-3">
            <CreditBadge />
            <ThemeToggle />
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

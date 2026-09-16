import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Sparkles,
  X,
  Zap,
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const NAV_ITEMS = [
  { label: 'Overview',       icon: LayoutDashboard, to: '/dashboard',         end: true },
  { label: 'ATS Score Tool', icon: Sparkles,        to: '/dashboard/ats' },
  { label: 'History',        icon: History,         to: '/dashboard/history' },
  { label: 'Settings',       icon: Settings,        to: '/dashboard/settings', adminOnly: true },
]

// Disabled placeholder — no pricing page
const UPGRADE_ITEM = { label: 'Upgrade', icon: Zap, disabled: true }

function NavItem({ item, collapsed }) {
  const Icon = item.icon
  const base =
    'group relative flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-all duration-150'

  if (item.disabled) {
    return (
      <div
        title="Paid plans coming soon"
        className={`${base} cursor-not-allowed text-[color:var(--text-muted)] opacity-50 select-none`}
      >
        <Icon size={17} className="shrink-0" />
        {!collapsed && <span className="truncate">{item.label}</span>}
      </div>
    )
  }

  return (
    <NavLink to={item.to} end={item.end}>
      {({ isActive }) => (
        <div
          className={`${base} ${
            isActive
              ? 'bg-violet-600 text-white shadow-sm'
              : 'text-[color:var(--text-secondary)] hover:bg-[color:var(--bg-subtle)] hover:text-[color:var(--text-primary)]'
          }`}
        >
          <Icon size={17} className="shrink-0" />
          {!collapsed && <span className="truncate">{item.label}</span>}
        </div>
      )}
    </NavLink>
  )
}

function SidebarInner({ collapsed, onToggle, onClose }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="flex h-full flex-col">
      {/* Logo + toggle */}
      <div className={`flex h-16 items-center px-3 ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600 text-white">
              <Sparkles size={14} />
            </span>
            <span className="text-sm font-bold text-[color:var(--text-primary)]">ResumeAI</span>
          </div>
        )}
        {onToggle && (
          <button
            onClick={onToggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[color:var(--border-base)] text-[color:var(--text-muted)] hover:bg-[color:var(--bg-subtle)] transition-colors"
          >
            {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>
        )}
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[color:var(--border-base)] text-[color:var(--text-muted)] hover:bg-[color:var(--bg-subtle)] transition-colors"
          >
            <X size={15} />
          </button>
        )}
      </div>

      <div className="divider" />

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {NAV_ITEMS.filter((item) => !item.adminOnly || user?.role === 'admin').map((item) => (
          <NavItem key={item.label} item={item} collapsed={collapsed} />
        ))}
        <NavItem item={UPGRADE_ITEM} collapsed={collapsed} />
      </nav>

      <div className="divider" />

      {/* User + logout */}
      <div className="p-3">
        <div
          className={`flex items-center gap-3 rounded-xl px-2 py-2 ${collapsed ? 'justify-center' : ''}`}
        >
          {/* Avatar */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white text-xs font-bold select-none">
            {user?.avatarInitials || user?.name?.slice(0, 2).toUpperCase() || 'U'}
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-[color:var(--text-primary)]">
                {user?.name || 'User'}
              </p>
              <p className="truncate text-xs text-[color:var(--text-muted)]">{user?.email}</p>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={handleLogout}
              aria-label="Log out"
              title="Log out"
              className="shrink-0 rounded-lg p-1.5 text-[color:var(--text-muted)] hover:bg-[color:var(--bg-subtle)] hover:text-red-500 transition-colors"
            >
              <LogOut size={15} />
            </button>
          )}
        </div>
        {collapsed && (
          <button
            onClick={handleLogout}
            aria-label="Log out"
            className="mt-1 flex w-full items-center justify-center rounded-xl p-2 text-[color:var(--text-muted)] hover:bg-[color:var(--bg-subtle)] hover:text-red-500 transition-colors"
          >
            <LogOut size={15} />
          </button>
        )}
      </div>
    </div>
  )
}

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`
          hidden lg:flex flex-col
          fixed top-0 left-0 h-screen z-40
          border-r border-[color:var(--border-base)]
          bg-[color:var(--bg-surface)]
          transition-all duration-300
          ${collapsed ? 'w-[68px]' : 'w-[240px]'}
        `}
        aria-label="Sidebar"
      >
        <SidebarInner
          collapsed={collapsed}
          onToggle={() => setCollapsed((v) => !v)}
        />
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              className="absolute left-0 top-0 h-full w-[240px] border-r border-[color:var(--border-base)] bg-[color:var(--bg-surface)]"
            >
              <SidebarInner onClose={() => setMobileOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

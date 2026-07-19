import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, FileText, House, Settings, UserRound, X } from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: House, to: '/', route: true },
  { label: 'Profile', icon: UserRound, route: false },
  { label: 'Resume History', icon: FileText, route: false },
  { label: 'Settings', icon: Settings, route: false }
]

const SidebarItem = ({ item, collapsed }) => {
  const Icon = item.icon

  if (item.route) {
    return (
      <NavLink to={item.to} end>
        {({ isActive }) => (
          <motion.div
            whileHover={{ y: -2 }}
            className={`group relative flex h-12 items-center gap-3 overflow-hidden rounded-2xl border px-3 transition ${
              isActive
                ? 'border-violet-400/40 bg-violet-500/20 text-white'
                : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white'
            }`}
          >
            {isActive && <span className="absolute left-0 top-2 h-8 w-1 rounded-r-full bg-cyan-400" />}
            <Icon size={18} className="shrink-0" />
            {!collapsed && <span className="truncate text-sm font-medium">{item.label}</span>}
          </motion.div>
        )}
      </NavLink>
    )
  }

  return (
    <motion.button
      type="button"
      whileHover={{ y: -2 }}
      className="flex h-12 w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
      aria-label={item.label}
    >
      <Icon size={18} className="shrink-0" />
      {!collapsed && <span className="truncate text-left text-sm font-medium">{item.label}</span>}
    </motion.button>
  )
}

const SidebarPanel = ({ collapsed, onToggle }) => {
  return (
    <aside
      className={`glass-surface fixed bottom-4 left-4 top-22.25 z-40 hidden rounded-3xl p-3 transition-all duration-300 lg:block ${
        collapsed ? 'w-21' : 'w-63.5'
      }`}
      aria-label="Sidebar"
    >
      <div className="mb-4 flex items-center justify-between px-1">
        {!collapsed && <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Workspace</p>}
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <SidebarItem key={item.label} item={item} collapsed={collapsed} />
        ))}
      </nav>
    </aside>
  )
}

const MobileSidebar = ({ mobileOpen, handleDrawerToggle }) => {
  if (!mobileOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
      <button className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={handleDrawerToggle} aria-label="Close sidebar" />
      <motion.aside
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -30, opacity: 0 }}
        className="glass-surface relative m-4 h-[calc(100%-2rem)] w-[min(280px,84vw)] rounded-3xl p-4"
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Navigation</p>
          <button
            type="button"
            onClick={handleDrawerToggle}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5"
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <div key={item.label} onClick={handleDrawerToggle}>
              <SidebarItem item={item} collapsed={false} />
            </div>
          ))}
        </nav>
      </motion.aside>
    </div>
  )
}

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      <SidebarPanel collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />
      <MobileSidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
    </>
  )
}

export default Sidebar

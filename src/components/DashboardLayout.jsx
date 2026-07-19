import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import Sidebar from './Sidebar'

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

  return (
    <div className="min-h-screen">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-900/70 backdrop-blur-xl">
        <div className="mx-auto flex h-18.25 w-full max-w-400 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={handleDrawerToggle}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-white/10 md:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
              <Sparkles size={16} className="text-cyan-400" />
              <span className="text-sm font-semibold tracking-wide text-white">AI Resume Analyzer</span>
            </div>
          </div>

          <nav className="hidden items-center gap-2 sm:flex">
            <button className="rounded-xl px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10">Dashboard</button>
            <button className="rounded-xl px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10">History</button>
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-linear-to-br from-violet-500 to-cyan-500 text-sm font-semibold"
              aria-label="Profile avatar"
            >
              SS
            </motion.div>
          </nav>
        </div>
      </header>

      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

      <main className="mx-auto w-full max-w-400 px-4 pb-8 pt-24.25 sm:px-6 lg:pl-71.5 lg:pr-8">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout

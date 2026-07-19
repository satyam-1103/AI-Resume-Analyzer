import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'

import LandingPage    from '../pages/LandingPage'
import LoginPage      from '../pages/LoginPage'
import SignupPage     from '../pages/SignupPage'
import DashboardPage  from '../pages/DashboardPage'
import AtsToolPage    from '../pages/AtsToolPage'
import HistoryPage    from '../pages/HistoryPage'
import NotFoundPage   from '../pages/NotFoundPage'

import DashboardLayout from '../components/dashboard/DashboardLayout'

export default function AppRoutes() {
  return (
    <Routes>
      {/* ── Public routes ───────────────────────────────────────── */}
      <Route path="/"        element={<LandingPage />} />
      <Route path="/login"   element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/signup"  element={<PublicRoute><SignupPage /></PublicRoute>} />

      {/* ── Protected dashboard routes ──────────────────────────── */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index               element={<DashboardPage />} />
        <Route path="ats"          element={<AtsToolPage />} />
        <Route path="history"      element={<HistoryPage />} />
        <Route path="history/:id"  element={<HistoryPage />} />
        {/* Profile/Settings — stub */}
        <Route path="settings"     element={<div className="p-8 text-secondary">Settings coming soon.</div>} />
      </Route>

      {/* ── Fallback ─────────────────────────────────────────────── */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

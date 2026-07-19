import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import CreditsWidget from '../components/dashboard/CreditsWidget'
import HistoryCard from '../components/dashboard/HistoryCard'
import Button from '../components/common/Button'
import { getHistory } from '../services/historyService'
import { usePageTitle } from '../hooks/usePageTitle'

export default function DashboardPage() {
  usePageTitle('Dashboard')
  const { user } = useAuth()
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await getHistory()
        setRecent(data.slice(0, 3)) // top 3 only
      } catch (err) {
        console.error('Failed to load history preview:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Welcome header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[color:var(--text-primary)]">
          Welcome back, {user?.name?.split(' ')[0] || 'there'}!
        </h1>
        <p className="mt-2 text-[color:var(--text-secondary)]">
          Here's an overview of your resume optimization progress.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        {/* Main column */}
        <div className="space-y-6">
          {/* Quick action card */}
          <div className="card overflow-hidden relative">
            {/* Background accent */}
            <div className="absolute right-0 top-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />

            <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center justify-between">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2 text-[color:var(--text-primary)]">
                  <Sparkles size={20} className="text-violet-600 dark:text-violet-400" />
                  Analyze a new resume
                </h2>
                <p className="mt-2 text-sm text-[color:var(--text-secondary)] max-w-md">
                  Ready to apply? Upload your latest resume to get an instant ATS score,
                  skills gap report, and actionable improvement feedback.
                </p>
              </div>
              <Button 
                as={Link} 
                to="/dashboard/ats" 
                className="shrink-0"
              >
                Start Analysis <ArrowRight size={16} />
              </Button>
            </div>
          </div>

          {/* Recent activity */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[color:var(--text-primary)]">Recent Activity</h3>
              <Link
                to="/dashboard/history"
                className="text-sm font-medium text-violet-600 dark:text-violet-400 hover:underline"
              >
                View all
              </Link>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-[76px] rounded-xl bg-[color:var(--bg-muted)] animate-pulse" />
                ))}
              </div>
            ) : recent.length > 0 ? (
              <div className="space-y-3">
                {recent.map(item => (
                  <HistoryCard key={item._id || item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="card p-8 text-center bg-[color:var(--bg-subtle)] border-dashed">
                <p className="text-sm text-[color:var(--text-muted)]">No recent analyses found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <CreditsWidget />
        </div>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { getHistory, getHistoryItem } from '../services/historyService'

import Loader from '../components/common/Loader'
import HistoryTable from '../components/dashboard/HistoryTable'
import HistoryCard from '../components/dashboard/HistoryCard'

// Result sub-components for the detail view
import ScoreGauge from '../components/atsTool/ScoreGauge'
import SkillsGapList from '../components/atsTool/SkillsGapList'
import EducationInsights from '../components/atsTool/EducationInsights'
import ExperienceGapInsights from '../components/atsTool/ExperienceGapInsights'

export default function HistoryPage() {
  const { id } = useParams() // if present, we are in the detail view

  const [items, setItems] = useState([])
  const [detail, setDetail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch list or detail based on route param
  useEffect(() => {
    async function fetch() {
      setLoading(true)
      setError(null)
      try {
        if (id) {
          const data = await getHistoryItem(id)
          setDetail(data)
        } else {
          const data = await getHistory()
          setItems(data)
          setDetail(null)
        }
      } catch (err) {
        setError('Failed to load history data.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  if (loading) {
    return (
      <div className="pt-20">
        <Loader variant="page" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40 p-4 text-red-700 dark:text-red-300">
        {error}
      </div>
    )
  }

  // 1. Detail View Route (/dashboard/history/:id)
  if (id && detail) {
    return (
      <div className="mx-auto max-w-5xl space-y-6 pb-12">
        {/* Header bar */}
        <div className="border-b border-[color:var(--border-base)] pb-6">
          <Link
            to="/dashboard/history"
            className="mb-2 inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] transition-colors"
          >
            <ArrowLeft size={16} /> Back to history
          </Link>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[color:var(--text-primary)]">Analysis Results</h1>
              <p className="text-sm text-[color:var(--text-muted)]">File: {detail.filename}</p>
            </div>
            <p className="text-xs text-[color:var(--text-muted)]">
              Analyzed on {new Date(detail.date).toLocaleDateString()}
            </p>
          </div>
        </div>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-6"
          >
            {/* Top row */}
            <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
              <div className="card p-6 flex flex-col justify-center">
                <ScoreGauge score={detail.atsScore} />
              </div>
              <SkillsGapList gaps={detail.skills?.gaps} strengths={detail.skills?.strengths} />
            </div>

            {/* Bottom row */}
            <div className="grid gap-6 md:grid-cols-2">
              <ExperienceGapInsights items={detail.experience} />
              <EducationInsights items={detail.education} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    )
  }

  // 2. List View Route (/dashboard/history)
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[color:var(--text-primary)]">
          Resume History
        </h1>
        <p className="mt-1 text-[color:var(--text-secondary)]">
          Review your past analyses and track your improvement over time.
        </p>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block">
        <HistoryTable items={items} />
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {items.length > 0 ? (
          items.map((item) => <HistoryCard key={item.id} item={item} />)
        ) : (
          <div className="card p-8 text-center bg-[color:var(--bg-subtle)] border-dashed">
            <p className="text-sm text-[color:var(--text-muted)]">No analyses found.</p>
          </div>
        )}
      </div>
    </div>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { useCredits } from '../hooks/useCredits'
import { useResumeAnalysis } from '../hooks/useResumeAnalysis'

import ResumeUploader from '../components/atsTool/ResumeUploader'
import ConfirmCreditModal from '../components/atsTool/ConfirmCreditModal'
import Loader from '../components/common/Loader'
import Button from '../components/common/Button'

// Result sub-components
import ScoreGauge from '../components/atsTool/ScoreGauge'
import SkillsGapList from '../components/atsTool/SkillsGapList'
import EducationInsights from '../components/atsTool/EducationInsights'
import ExperienceGapInsights from '../components/atsTool/ExperienceGapInsights'

export default function AtsToolPage() {
  const { credits, loading: creditsLoading } = useCredits()
  const { analyze, result, loading: analyzeLoading, error, reset } = useResumeAnalysis()

  const [file, setFile] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  // 1. Initial State
  if (!result && !analyzeLoading) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="mx-auto mb-3 inline-flex items-center gap-1.5 rounded-full bg-violet-100 dark:bg-violet-950 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-violet-700 dark:text-violet-300">
            <Sparkles size={13} /> ATS Score Checker
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-[color:var(--text-primary)]">
            Analyze your resume
          </h1>
          <p className="mt-3 text-[color:var(--text-secondary)]">
            Upload your resume to get an instant ATS score and detailed feedback on skills, education, and experience gaps.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40 p-4 text-sm text-red-700 dark:text-red-300">
            <strong>Analysis failed:</strong> {error}
          </div>
        )}

        <div className="card p-6 sm:p-10">
          <ResumeUploader file={file} onFile={setFile} />

          <div className="mt-8 flex justify-end">
            <Button
              size="lg"
              disabled={!file}
              onClick={() => setModalOpen(true)}
            >
              Analyze Resume
            </Button>
          </div>
        </div>

        <ConfirmCreditModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          credits={credits}
          loading={creditsLoading}
          onConfirm={async () => {
            setModalOpen(false)
            await analyze(file)
            // TODO: backend integration — confirm if we need to manually POST to a save endpoint here,
            // or if the backend /analyze endpoint automatically saves it to history.
          }}
        />
      </div>
    )
  }

  // 2. Loading State
  if (analyzeLoading) {
    return (
      <div className="mx-auto max-w-3xl pt-20">
        <Loader variant="analysis" />
      </div>
    )
  }

  // 3. Result State
  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-12">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--border-base)] pb-6">
        <div>
          <button
            onClick={() => {
              setFile(null)
              reset()
            }}
            className="mb-2 inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] transition-colors"
          >
            <ArrowLeft size={16} /> Back to uploader
          </button>
          <h1 className="text-2xl font-bold text-[color:var(--text-primary)]">Analysis Results</h1>
          <p className="text-sm text-[color:var(--text-muted)]">File: {file?.name || 'resume.pdf'}</p>
        </div>
        
        <Button variant="secondary" onClick={() => { setFile(null); reset(); }}>
          Analyze another
        </Button>
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6"
        >
          {/* Top row: Score + Skills */}
          <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
            <div className="card p-6 flex flex-col justify-center">
              <ScoreGauge score={result.atsScore} />
            </div>
            <SkillsGapList gaps={result.skills?.gaps} strengths={result.skills?.strengths} />
          </div>

          {/* Bottom row: Edu + Exp */}
          <div className="grid gap-6 md:grid-cols-2">
            <ExperienceGapInsights items={result.experience} />
            <EducationInsights items={result.education} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

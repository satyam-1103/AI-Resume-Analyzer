import React, { useMemo, useRef, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  CheckCircle2,
  CircleGauge,
  CloudUpload,
  FileText,
  LoaderCircle,
  Sparkles,
  Target
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (index = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.06, duration: 0.4, ease: 'easeOut' }
  })
}

const listFrom = (value) => {
  if (Array.isArray(value)) {
    return value.filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split(/\n|,/)
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return []
}

const scoreTone = (score) => {
  if (score >= 75) return 'text-emerald-300'
  if (score >= 45) return 'text-amber-300'
  return 'text-rose-300'
}

const scoreColor = (score) => {
  if (score >= 75) return '#34d399'
  if (score >= 45) return '#fbbf24'
  return '#fb7185'
}

const Chip = ({ children, tone = 'default' }) => {
  const toneStyles = {
    default: 'border-white/10 bg-white/5 text-slate-100',
    success: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200',
    danger: 'border-rose-400/40 bg-rose-500/10 text-rose-200'
  }

  return <span className={`rounded-full border px-3 py-1 text-xs font-medium ${toneStyles[tone]}`}>{children}</span>
}

const SectionCard = ({ title, subtitle, icon: Icon, children, className = '' }) => {
  return (
    <section className={`glass-surface rounded-3xl p-6 ${className}`}>
      <div className="mb-4 flex items-start gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyan-300">
          <Icon size={18} />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  )
}

const Home = () => {
  const [resumeText, setResumeText] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [analysisResult, setAnalysisResult] = useState(null)
  const [loading, setLoading] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [selectedFileName, setSelectedFileName] = useState('')
    const fileInputRef = useRef(null)

  const handleAnalyze = async () => {
    try {
        setLoading(true)
      const apiURL = import.meta.env.VITE_API_URL
      const response = await axios.post(`${apiURL}analysis/analyze`, {
        resumeText: resumeText,
        jobDescription: jobDescription
        })
        setAnalysisResult(response.data)
    } catch (error) {
        console.error('Error analyzing resume:', error)
        alert('Failed to analyze resume. Please try again.')
    } finally {
        setLoading(false)
    }
  }

  const parseFile = (file) => {
    if (!file) {
      return
    }

    setSelectedFileName(file.name)

    const isText = file.type.startsWith('text/') || file.name.toLowerCase().endsWith('.txt')
    if (!isText) {
      alert('Upload supports TXT parsing directly. For PDF or DOCX, paste extracted text into the resume box.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : ''
      setResumeText(result)
    }
    reader.readAsText(file)
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    parseFile(file)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)
    const file = event.dataTransfer.files?.[0]
    parseFile(file)
  }

  const analysisData = useMemo(() => analysisResult?.data ?? {}, [analysisResult])
  const matchScore = Number(analysisData.matchScore ?? 0)
  const matchedSkills = listFrom(analysisData.matchedSkills)
  const missingSkills = listFrom(analysisData.missingSkills)
  const strengths = listFrom(analysisData.strengths)
  const weaknesses = listFrom(analysisData.weaknesses)
  const suggestions = listFrom(analysisData.suggestions || analysisData.improvements)
  const keywordRaw = analysisData.keywordAnalysis || analysisData.keywordBreakdown

  const keywordAnalysis = useMemo(() => {
    if (Array.isArray(keywordRaw)) {
      return keywordRaw
        .map((entry) => {
          if (typeof entry === 'string') {
            return { keyword: entry, value: 70 }
          }
          if (entry && typeof entry === 'object') {
            return {
              keyword: entry.keyword || entry.name || 'Keyword',
              value: Number(entry.value ?? entry.score ?? entry.percentage ?? 0)
            }
          }
          return null
        })
        .filter(Boolean)
    }

    if (keywordRaw && typeof keywordRaw === 'object') {
      return Object.entries(keywordRaw).map(([keyword, value]) => ({
        keyword,
        value: Number(value)
      }))
    }

    return []
  }, [keywordRaw])

  const verdict = analysisData.overallVerdict || analysisData.verdict || analysisData.summary

  return (
    <div className="mx-auto flex min-h-[calc(100vh-120px)] max-w-7xl flex-col gap-8 pb-12">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="glass-surface rounded-[28px] px-6 py-12 text-center sm:px-10"
      >
        <p className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-violet-200">
          <Sparkles size={14} />
          AI-Powered Resume Intelligence
        </p>
        <h1 className="mx-auto max-w-4xl text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Land More Interviews with AI
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-pretty text-sm leading-7 text-slate-300 sm:text-base">
          Analyze your resume against any job description and instantly receive ATS score, missing skills, keyword analysis,
          strengths and improvement suggestions.
        </p>
      </motion.section>

      <motion.section initial="hidden" animate="visible" variants={fadeUp} custom={2} className="grid gap-6 xl:grid-cols-2">
        <SectionCard
          title="Resume"
          subtitle="Drag, drop or paste your resume content"
          icon={FileText}
          className="rounded-[26px]"
        >
          <div
            className={`mb-4 rounded-3xl border border-dashed p-6 text-center transition ${
              isDragging ? 'border-cyan-300 bg-cyan-500/10' : 'border-white/15 bg-slate-900/45'
            }`}
            onDragOver={(event) => {
              event.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <CloudUpload size={28} className="mx-auto text-cyan-300" />
            <p className="mt-3 text-sm text-slate-200">Drag and drop resume file</p>
            <p className="mt-1 text-xs text-slate-400">Supported: PDF, DOCX, TXT</p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
            >
              Upload Resume
            </button>
            <input ref={fileInputRef} type="file" className="hidden" accept=".pdf,.doc,.docx,.txt" onChange={handleFileChange} />
            {selectedFileName && <p className="mt-3 truncate text-xs text-slate-400">Selected: {selectedFileName}</p>}
          </div>

          <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="resume-text">
            OR paste resume text
          </label>
          <textarea
            id="resume-text"
            placeholder="Paste your resume text here..."
            rows={12}
            value={resumeText}
            required
            onChange={(e) => setResumeText(e.target.value)}
            className="w-full resize-y rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-400/60 focus:outline-none"
          />
        </SectionCard>

        <SectionCard
          title="Job Description"
          subtitle="Paste the complete role description for better matching"
          icon={Target}
          className="rounded-[26px]"
        >
          <textarea
            placeholder="Paste the job description here. Include requirements, responsibilities, and must-have skills."
            rows={18}
            required
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full resize-y rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-400/60 focus:outline-none"
          />
          <p className="mt-2 text-right text-xs text-slate-400">{jobDescription.length} characters</p>
        </SectionCard>
      </motion.section>

      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} className="flex justify-center">
        <motion.button
          onClick={handleAnalyze}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex min-w-57.5 items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-violet-600 via-fuchsia-500 to-cyan-500 px-8 py-4 text-base font-semibold text-white shadow-[0_10px_30px_rgba(124,58,237,0.35)] transition disabled:cursor-not-allowed disabled:opacity-70"
          disabled={loading}
        >
          {loading ? (
            <>
              <LoaderCircle size={19} className="animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles size={19} />
              Analyze Resume
            </>
          )}
        </motion.button>
      </motion.div>

      {loading && (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="glass-surface animate-pulse rounded-3xl p-5">
              <div className="h-4 w-28 rounded bg-white/10" />
              <div className="mt-4 h-3 w-full rounded bg-white/10" />
              <div className="mt-2 h-3 w-4/5 rounded bg-white/10" />
              <div className="mt-2 h-3 w-3/5 rounded bg-white/10" />
            </div>
          ))}
        </div>
      )}

      {analysisResult && !loading && (
        <motion.section initial="hidden" animate="visible" variants={fadeUp} custom={4} className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr_1fr]">
            <SectionCard title="ATS Score" subtitle="Your current resume-job fit" icon={CircleGauge} className="rounded-[26px]">
              <div className="flex flex-col items-center justify-center gap-4 py-4 sm:flex-row sm:justify-start">
                <div
                  className="relative grid h-40 w-40 place-items-center rounded-full"
                  style={{
                    backgroundImage: `conic-gradient(${scoreColor(matchScore)} ${Math.max(0, Math.min(100, matchScore)) * 3.6}deg, rgba(148,163,184,0.2) 0deg)`
                  }}
                >
                  <div className="grid h-32 w-32 place-items-center rounded-full border border-white/10 bg-slate-900 text-center">
                    <p className={`text-4xl font-bold ${scoreTone(matchScore)}`}>{Math.round(matchScore)}%</p>
                  </div>
                </div>
                <p className="max-w-xs text-sm leading-6 text-slate-300">
                  {matchScore >= 75
                    ? 'Excellent alignment. Your resume is strongly tailored for this role.'
                    : matchScore >= 45
                      ? 'Good baseline. A few strategic updates can improve your shortlisting chances.'
                      : 'Your resume needs stronger role alignment. Prioritize skills, keywords, and measurable impact.'}
                </p>
              </div>
            </SectionCard>

            <SectionCard title="Matched Skills" subtitle="Skills detected in both resume and JD" icon={CheckCircle2} className="rounded-[26px]">
              <div className="flex flex-wrap gap-2">
                {(matchedSkills.length ? matchedSkills : ['No matched skills returned']).map((skill, index) => (
                  <Chip key={`${skill}-${index}`} tone="success">
                    {skill}
                  </Chip>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Missing Skills" subtitle="Skills to add or emphasize" icon={AlertTriangle} className="rounded-[26px]">
              <div className="flex flex-wrap gap-2">
                {(missingSkills.length ? missingSkills : ['No missing skills returned']).map((skill, index) => (
                  <Chip key={`${skill}-${index}`} tone="danger">
                    {skill}
                  </Chip>
                ))}
              </div>
            </SectionCard>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <SectionCard title="Strengths" subtitle="What your resume already does well" icon={CheckCircle2} className="rounded-[26px] border-emerald-400/30 bg-emerald-500/10">
              <ul className="space-y-3 text-sm text-emerald-100">
                {(strengths.length ? strengths : ['No strengths provided']).map((item, index) => (
                  <li key={`${item}-${index}`} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard title="Weaknesses" subtitle="Areas that can reduce ATS match" icon={AlertTriangle} className="rounded-[26px] border-amber-300/30 bg-amber-500/10">
              <ul className="space-y-3 text-sm text-amber-100">
                {(weaknesses.length ? weaknesses : ['No weaknesses provided']).map((item, index) => (
                  <li key={`${item}-${index}`} className="flex items-start gap-2">
                    <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <SectionCard
              title="Suggestions"
              subtitle="Actionable improvements"
              icon={Sparkles}
              className="rounded-[26px] border-cyan-300/30 bg-linear-to-br from-cyan-500/18 to-violet-500/18"
            >
              <ul className="list-disc space-y-2 pl-6 text-sm text-slate-100">
                {(suggestions.length ? suggestions : ['No suggestions provided']).map((item, index) => (
                  <li key={`${item}-${index}`}>{item}</li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard title="Keyword Analysis" subtitle="Keyword coverage and relevance" icon={Target} className="rounded-[26px]">
              <div className="space-y-4">
                {(keywordAnalysis.length
                  ? keywordAnalysis
                  : [
                      { keyword: 'Keyword insights unavailable', value: 0 }
                    ]
                ).map((item, index) => (
                  <div key={`${item.keyword}-${index}`}>
                    <div className="mb-1 flex items-center justify-between text-xs text-slate-300">
                      <span className="truncate pr-3">{item.keyword}</span>
                      <span>{Math.round(item.value)}%</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-700/80">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.max(0, Math.min(100, Number(item.value) || 0))}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.07 }}
                        className="h-full rounded-full bg-linear-to-r from-violet-500 to-cyan-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          <SectionCard title="Overall Verdict" subtitle="Final AI decision summary" icon={Sparkles} className="rounded-[26px] border-violet-300/30 bg-violet-500/10">
            <p className="text-sm leading-7 text-slate-100">{verdict || 'Verdict not available for this analysis run.'}</p>
          </SectionCard>
        </motion.section>
      )}

      <footer className="pt-2 text-center text-sm text-slate-400">Made with ❤️</footer>
    </div>
  )
}

export default Home
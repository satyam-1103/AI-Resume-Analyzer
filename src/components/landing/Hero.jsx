import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '../common/Button'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-20 sm:px-6 lg:px-8">
      {/* Background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-start justify-center"
      >
        <div className="h-[600px] w-[900px] rounded-full bg-violet-500/8 dark:bg-violet-500/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        {/* Badge */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-700 dark:text-violet-300"
        >
          <Sparkles size={13} />
          10 free credits every month
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-balance text-4xl font-bold tracking-tight text-[color:var(--text-primary)] sm:text-5xl lg:text-6xl"
        >
          Beat the ATS.{' '}
          <span className="gradient-text">Land the interview.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-[color:var(--text-secondary)] leading-relaxed"
        >
          Upload your resume and get an instant ATS score, skill gap analysis,
          education feedback, and work experience insights — powered by AI.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button size="lg" as={Link} to="/signup">
            Get started free
            <ArrowRight size={18} />
          </Button>

          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--border-strong)] bg-[color:var(--bg-surface)] px-7 py-3.5 text-base font-semibold text-[color:var(--text-primary)] shadow-sm hover:bg-[color:var(--bg-subtle)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
          >
            <ChevronDown size={18} />
            See how it works
          </a>
        </motion.div>

        {/* Social proof / trust line */}
        <motion.p
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-8 text-sm text-[color:var(--text-muted)]"
        >
          No credit card required · Free to start · Results in under 60 seconds
        </motion.p>
      </div>
    </section>
  )
}

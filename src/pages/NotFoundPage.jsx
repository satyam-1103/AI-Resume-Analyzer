import { Link } from 'react-router-dom'
import { Sparkles, ArrowLeft } from 'lucide-react'
import Button from '../components/common/Button'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[color:var(--bg-base)] px-4">
      <div className="text-center max-w-md">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400">
          <Sparkles size={32} />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-[color:var(--text-primary)]">
          Page not found
        </h1>
        <p className="mt-3 text-lg text-[color:var(--text-secondary)]">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button as={Link} to="/" variant="secondary">
            <ArrowLeft size={16} /> Back to home
          </Button>
          <Button as={Link} to="/dashboard">
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}

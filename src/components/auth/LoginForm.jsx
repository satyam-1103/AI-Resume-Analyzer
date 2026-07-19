import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import Input from '../common/Input'
import Button from '../common/Button'
import { useAuth } from '../../hooks/useAuth'

export default function LoginForm() {
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!email) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email address'
    if (!password) e.password = 'Password is required'
    return e
  }

  async function handleSubmit(evt) {
    evt.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})

    const result = await login(email, password)
    if (result.success) navigate(from, { replace: true })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[color:var(--text-primary)]">Welcome back</h2>
      <p className="mt-1 text-sm text-[color:var(--text-secondary)]">
        Sign in to your ResumeAI account
      </p>

      {/* API error */}
      {error && (
        <div className="mt-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40 px-4 py-3 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
        <Input
          id="login-email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          required
        />

        <div className="relative">
          <Input
            id="login-password"
            type={showPass ? 'text' : 'password'}
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            required
          />
          <button
            type="button"
            aria-label={showPass ? 'Hide password' : 'Show password'}
            onClick={() => setShowPass((v) => !v)}
            className="absolute right-3 top-8 text-[color:var(--text-muted)] hover:text-[color:var(--text-secondary)] transition-colors"
          >
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <Button type="submit" fullWidth loading={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
    </div>
  )
}

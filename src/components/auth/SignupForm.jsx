import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import Input from '../common/Input'
import Button from '../common/Button'
import { useAuth } from '../../hooks/useAuth'

export default function SignupForm() {
  const { signup, loading, error } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [errors, setErrors] = useState({})

  function set(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.email) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters'
    if (!form.confirm) e.confirm = 'Please confirm your password'
    else if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
    return e
  }

  async function handleSubmit(evt) {
    evt.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})

    const result = await signup(form.name.trim(), form.email, form.password)
    if (result.success) navigate('/dashboard', { replace: true })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[color:var(--text-primary)]">Create your account</h2>
      <p className="mt-1 text-sm text-[color:var(--text-secondary)]">
        Free to start — 10 credits every month
      </p>

      {/* API error */}
      {error && (
        <div className="mt-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40 px-4 py-3 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
        <Input
          id="signup-name"
          label="Full name"
          placeholder="Satyam Srivastava"
          value={form.name}
          onChange={set('name')}
          error={errors.name}
          required
        />

        <Input
          id="signup-email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          value={form.email}
          onChange={set('email')}
          error={errors.email}
          required
        />

        <div className="relative">
          <Input
            id="signup-password"
            type={showPass ? 'text' : 'password'}
            label="Password"
            placeholder="Min. 8 characters"
            value={form.password}
            onChange={set('password')}
            error={errors.password}
            hint={!errors.password ? 'At least 8 characters' : undefined}
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

        <Input
          id="signup-confirm"
          type={showPass ? 'text' : 'password'}
          label="Confirm password"
          placeholder="Repeat password"
          value={form.confirm}
          onChange={set('confirm')}
          error={errors.confirm}
          required
        />

        <Button type="submit" fullWidth loading={loading}>
          {loading ? 'Creating account...' : 'Create account'}
        </Button>
      </form>

      <p className="mt-4 text-center text-xs text-[color:var(--text-muted)]">
        By signing up you agree to our{' '}
        <a href="/privacy" className="underline hover:text-[color:var(--text-secondary)]">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  )
}

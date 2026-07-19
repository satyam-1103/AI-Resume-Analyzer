import AuthLayout from '../components/auth/AuthLayout'
import LoginForm from '../components/auth/LoginForm'
import { usePageTitle } from '../hooks/usePageTitle'

export default function LoginPage() {
  usePageTitle('Login')
  return (
    <AuthLayout mode="login">
      <LoginForm />
    </AuthLayout>
  )
}

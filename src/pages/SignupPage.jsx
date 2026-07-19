import AuthLayout from '../components/auth/AuthLayout'
import SignupForm from '../components/auth/SignupForm'
import { usePageTitle } from '../hooks/usePageTitle'

export default function SignupPage() {
  usePageTitle('Sign Up')
  return (
    <AuthLayout mode="signup">
      <SignupForm />
    </AuthLayout>
  )
}

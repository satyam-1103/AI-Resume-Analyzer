import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

/**
 * PublicRoute — wraps public routes like /login and /signup.
 * If a user is already authenticated, it redirects them to the dashboard
 * so they can't access login/signup pages while logged in.
 */
export default function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (isAuthenticated) {
    // Redirect to where they came from if available, otherwise dashboard
    const from = location.state?.from?.pathname || '/dashboard'
    return <Navigate to={from} replace />
  }

  return children
}

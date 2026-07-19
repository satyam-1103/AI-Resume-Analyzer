import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { CreditProvider } from './context/CreditContext'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CreditProvider>
          <AppRoutes />
        </CreditProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App

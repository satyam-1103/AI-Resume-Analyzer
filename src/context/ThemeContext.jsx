import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

/** Supported theme values */
export const THEMES = {
  SYSTEM: 'system',
  LIGHT: 'light',
  DARK: 'dark',
}

/**
 * ThemeProvider — manages the active theme preference.
 *
 * Applies a `dark` class to <html> so Tailwind dark: variants work.
 * Persists the preference in localStorage under the key `theme`.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || THEMES.SYSTEM
  })

  // Resolve the effective mode (system → read prefers-color-scheme)
  function resolveEffective(pref) {
    if (pref === THEMES.DARK) return 'dark'
    if (pref === THEMES.LIGHT) return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  useEffect(() => {
    const root = document.documentElement

    function applyTheme() {
      const effective = resolveEffective(theme)
      if (effective === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }

    applyTheme()
    localStorage.setItem('theme', theme)

    // If system mode, also listen for OS preference changes
    let mq = null
    if (theme === THEMES.SYSTEM) {
      mq = window.matchMedia('(prefers-color-scheme: dark)')
      mq.addEventListener('change', applyTheme)
    }

    return () => {
      if (mq) mq.removeEventListener('change', applyTheme)
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

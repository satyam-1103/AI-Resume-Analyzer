import { useEffect } from 'react'

export function usePageTitle(title) {
  useEffect(() => {
    const defaultTitle = 'AI Resume Analyzer'
    document.title = title ? `${title} - ${defaultTitle}` : defaultTitle
  }, [title])
}

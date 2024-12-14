import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'



interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

interface ThemeContextProps {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
  storageKey = 'app-theme'
}) => {
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  // Применение темы к `<html>` и сохранение её в localStorage
  useLayoutEffect(() => {
    const root = document.documentElement

    const applyTheme = (currentTheme: Theme) => {
      root.classList.remove('light', 'dark')
      const themeToApply =
        currentTheme === 'system'
          ? window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
          : currentTheme
      root.classList.add(themeToApply)
    }

    applyTheme(theme)
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  // Следим за системными изменениями и автоматически обновляем тему
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        const newSystemTheme = e.matches ? 'dark' : 'light'
        document.documentElement.classList.remove('light', 'dark')
        document.documentElement.classList.add(newSystemTheme)
      }
      mediaQuery.addEventListener('change', handleSystemThemeChange)

      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
    return () => {}
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

// Кастомный хук для удобного использования
export const useTheme = () => useThemeContext()

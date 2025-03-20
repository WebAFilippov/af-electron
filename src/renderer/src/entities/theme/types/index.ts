import { ReactNode } from 'react'

type Theme = 'system' | 'light' | 'dark'

interface ThemeOptions {
  value: Theme
  label: string
  icon: ReactNode
}

export type { Theme, ThemeOptions }

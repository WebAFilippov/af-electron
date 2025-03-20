import { useUnit } from 'effector-react'
import { Moon, Sun } from 'lucide-react'
import { FC } from 'react'

import { $theme, setTheme } from '@entities/theme/model/model'

import { Button } from '@shared/ui'

export const ThemeSwitcher: FC = () => {
  const [theme, handleSetTheme] = useUnit([$theme, setTheme])

  const Icon = theme === 'light' ? Sun : Moon

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    handleSetTheme(newTheme)
  }

  return (
    <Button variant="outline" size="icon" className="h-8 w-8" onClick={toggleTheme}>
      <Icon className="h-4 w-4" />
    </Button>
  )
}

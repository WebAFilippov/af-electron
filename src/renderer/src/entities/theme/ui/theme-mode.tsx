import { $theme, toggleTheme } from '@entities/theme/model/model'
import { Button } from '@shared/ui'
import { useUnit } from 'effector-react'
import { Moon, Sun } from 'lucide-react'
import { FC } from 'react'

export const ThemeSwitcher: FC = () => {
  const [theme, handleSetTheme] = useUnit([$theme, toggleTheme])

  return (
    <Button variant="outline" size="icon" onClick={handleSetTheme}>
      {theme === 'light' && <Sun />}
      {theme === 'dark' && <Moon />}
    </Button>
  )
}

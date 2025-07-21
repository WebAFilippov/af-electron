import { $theme, themeToggle } from '@shared/model/theme-store'
import { Button } from '@shared/ui'
import { useUnit } from 'effector-react'
import { Moon, Sun } from 'lucide-react'
import { FC } from 'react'

export const ThemeToggler: FC = () => {
  const [theme, handleSetTheme] = useUnit([$theme, themeToggle])

  return (
    <Button variant="outline" size="icon" onClick={handleSetTheme}>
      {theme === 'light' && <Sun />}
      {theme === 'dark' && <Moon />}
    </Button>
  )
}

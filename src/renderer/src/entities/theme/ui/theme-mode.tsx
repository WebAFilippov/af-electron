import { useUnit } from 'effector-react'
import { Moon, Sun } from 'lucide-react'
import { FC } from 'react'

import { $theme, toggleTheme } from '@entities/theme/model/model'

import { cn } from '@shared/lib'
import { Button } from '@shared/ui'

export const ThemeSwitcher: FC = () => {
  const [theme, handleSetTheme] = useUnit([$theme, toggleTheme])

  return (
    <Button variant="outline" size="icon" className="relative h-8 w-8" onClick={handleSetTheme}>
      <Sun
        size="1rem"
        className={cn(
          'absolute rotate-0 scale-100 text-foreground transition-all',
          theme === 'dark' && 'rotate-180 scale-0'
        )}
      />
      <Moon
        size="1rem"
        className={cn(
          'absolute rotate-0 scale-100 text-foreground transition-all',
          theme === 'light' && 'rotate-180 scale-0'
        )}
      />
    </Button>
  )
}

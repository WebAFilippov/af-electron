import { useUnit } from 'effector-react'
import { Monitor, Moon, Sun } from 'lucide-react'
import { FC } from 'react'

import { $theme, setTheme } from '@entities/theme/model/model'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@shared/ui'

import { ThemeOptions } from '../types'

export const ThemeSwitcher: FC = () => {
  const [currentTheme, handleSetTheme] = useUnit([$theme, setTheme])

  const themes: ThemeOptions[] = [
    { value: 'light', label: 'Светлая', icon: <Sun className="h-4 w-4" /> },
    { value: 'dark', label: 'Тёмная', icon: <Moon className="h-4 w-4" /> },
    { value: 'system', label: 'Системная', icon: <Monitor className="h-4 w-4" /> }
  ]

  const currentIcon = themes.find((t) => t.value === currentTheme)?.icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8">
          {currentIcon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => handleSetTheme(theme.value)}
            className="flex cursor-pointer items-center gap-2 py-1.5"
            disabled={currentTheme === theme.value}
          >
            {theme.icon}
            <span>{theme.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

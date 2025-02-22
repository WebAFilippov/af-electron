import { useUnit } from 'effector-react'
import { Monitor, Moon, Sun } from 'lucide-react'
import React from 'react'

import { $theme, setTheme } from '@entities/theme/model/model'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@shared/ui'

export const ThemeSwitcher: React.FC = () => {
  const [currentTheme, handleSetTheme] = useUnit([$theme, setTheme])

  const themes: { value: 'system' | 'light' | 'dark'; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: 'Light', icon: <Sun /> },
    { value: 'dark', label: 'Dark', icon: <Moon/> },
    { value: 'system', label: 'System', icon: <Monitor /> }
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-8 w-8">
          {themes.find((t) => t.value === currentTheme)?.icon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => handleSetTheme(theme.value)}
            className="flex items-center gap-2"
          >
            {theme.icon}
            {theme.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

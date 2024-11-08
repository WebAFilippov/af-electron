import { Moon, Sun } from 'lucide-react'

import { Button } from '../../shared/components/ui'
import { useTheme } from '../../app/providers/theme-provider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../../shared/components/ui/dropdown-menu/dropdown-menu'

export function ModeToggle({ className }: { className?: string }) {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={className} tabIndex={-1}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className="text-foreground text-xs cursor-pointer"
        >
          Всегда светлый
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className="text-foreground text-xs cursor-pointer"
        >
          Всегда темный
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className="text-foreground text-xs cursor-pointer"
        >
          Как в системе
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

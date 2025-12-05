import { Button } from './button'
import { cn } from '@shared/lib'
import { $theme, themeToggle } from '@shared/model/theme-store'
import { $sidebar } from '@widgets/sidebar/model.ts'
import { useUnit } from 'effector-react'
import { Moon, Sun } from 'lucide-react'

export const ThemeToggler = () => {
  const [theme, handleSetTheme] = useUnit([$theme, themeToggle])
  const isOpen = useUnit($sidebar)

  return (
    <Button
      variant="outline"
      size={isOpen ? 'xl' : 'icon-xl'}
      onClick={handleSetTheme}
      className={cn('select-none w-full py-2 duration-0')}
    >
      {theme === 'light' ? (
        <Sun className="size-7" />
      ) : (
        <Moon className="size-7" />
      )}
      {isOpen && (
        <span className="text-center text-balance text-base font-medium w-full">
          {theme === 'light' ? 'Светлая' : 'Темная'}
        </span>
      )}
    </Button>
  )
}

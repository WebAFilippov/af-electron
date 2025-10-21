import { $theme, themeToggle } from '@shared/model/theme-store'
import { $sidebar } from '@widgets/sidebar/model/sidebar.model'
import { useUnit } from 'effector-react'
import { Moon, Sun } from 'lucide-react'

export const ThemeToggler = () => {
  const [theme, handleSetTheme] = useUnit([$theme, themeToggle])
  const isOpen = useUnit($sidebar)

  return (
    <button
      className="flex justify-center items-center text-center text-sm font-medium whitespace-normal p-2 gap-3 w-full cursor-pointer rounded-sm text-sidebar-foreground/80 hover:text-sidebar-accent-foreground hover:bg-sidebar-border"
      onClick={handleSetTheme}
    >
      {theme === 'light' && (
        <>
          <Sun size={28} strokeWidth={1.5} />
          {isOpen && (
            <span>
              Светлая
            </span>
          )}
        </>
      )}
      {theme === 'dark' && (
        <>
          <Moon size={28} strokeWidth={1.5} />
          {isOpen && <span>Темная</span>}
        </>
      )}
    </button>
  )
}

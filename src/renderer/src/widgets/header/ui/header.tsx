import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from 'lucide-react'

import { $sidebar, toggleSidebar } from '@widgets/sidebar'

import { ThemeSwitcher } from '@features/theme-switcher/ui/ThemeSwither'

import { useDebugLayer } from '@entities/debug-mode'

import { routes } from '@shared/config/routing'
import { Button, RainbowButton } from '@shared/ui'

export const Header = () => {
  const { ref: refButton } = useDebugLayer<HTMLButtonElement>('shared')

  const isOpen = useUnit($sidebar)
  const handleToggleSidebar = useUnit(toggleSidebar)

  return (
    <div className="relative my-auto flex min-h-12 w-full items-center justify-between bg-transparent px-20">
      <Button
        ref={refButton}
        variant="outline"
        onClick={handleToggleSidebar}
        className="absolute left-1 top-1 flex h-8 w-8 items-center justify-center"
      >
        {isOpen ? <PanelLeftCloseIcon size="1rem" /> : <PanelLeftOpenIcon size="1rem" />}
      </Button>

      <Link to={routes.home}>
        <RainbowButton className="h-9 select-none px-6">
          🚀afilippov
          <span className="italic">/ui</span>
        </RainbowButton>
      </Link>

      <div>
        <ThemeSwitcher />
      </div>
    </div>
  )
}

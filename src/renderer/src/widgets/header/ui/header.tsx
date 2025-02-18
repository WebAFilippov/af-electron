import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'

import { $sidebar, toggleSidebar } from '@widgets/sidebar'

import { useDebugLayer } from '@entities/debug-mode'

import { PanelLeftCloseIcon, PanelLeftOpenIcon } from '@shared/assets/svg-icons'
import { routes } from '@shared/config/routing'
import { cn } from '@shared/lib'
import { Button, RainbowButton } from '@shared/ui'

export const Header = () => {
  const { ref: refButton } = useDebugLayer<HTMLButtonElement>('shared')

  const isOpen = useUnit($sidebar)
  const handleToggleSidebar = useUnit(toggleSidebar)

  return (
    <div className="relative my-auto flex min-h-12 w-full items-center justify-around bg-transparent">
      <Button
        ref={refButton}
        variant="outline"
        size="icon"
        onClick={handleToggleSidebar}
        className="absolute left-1 top-1 flex h-8 w-8 items-center justify-center"
      >
        {isOpen ? <PanelLeftCloseIcon size="1rem" /> : <PanelLeftOpenIcon size="1rem" />}
      </Button>

      <Link to={routes.home}>
        <RainbowButton className="h-9 px-6 select-none">
          afilippov
          <span className="italic">/ui</span>
        </RainbowButton>
      </Link>
      <Link to={routes.settings}>
        <div className="pointer-events-none select-none">Control</div>
      </Link>
    </div>
  )
}

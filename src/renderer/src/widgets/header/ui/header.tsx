import { useUnit } from 'effector-react'
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

import { $sidebar, toggleSidebar } from '@widgets/sidebar'

import { useDebugLayer } from '@entities/debug-mode'
import { DeviceIndicator } from '@entities/device'
import { NetworkIndicator } from '@entities/network'
import { ThemeSwitcher } from '@entities/theme'

import { Button, RainbowButton } from '@shared/ui'

export const Header = () => {
  const { ref: refButton } = useDebugLayer<HTMLButtonElement>('shared')

  const isOpen = useUnit($sidebar)
  const handleToggleSidebar = useUnit(toggleSidebar)

  return (
    <div className="relative my-auto flex min-h-12 w-full items-center justify-between bg-transparent px-20">
      <div className="absolute left-2 top-0 flex h-12 w-8 items-center justify-center">
        <Button ref={refButton} variant="outline" onClick={handleToggleSidebar} className="h-8 w-8">
          {isOpen ? <PanelLeftCloseIcon size="1rem" /> : <PanelLeftOpenIcon size="1rem" />}
        </Button>
      </div>

      <Link to="../">
        <RainbowButton className="h-9 select-none px-6">
          🚀a.filippov
          <span className="italic">/ui</span>
        </RainbowButton>
      </Link>

      <div className="flex items-center gap-4">
        <DeviceIndicator />
        <NetworkIndicator />
        <ThemeSwitcher />
      </div>
    </div>
  )
}

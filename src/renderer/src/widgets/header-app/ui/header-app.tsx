import { Link } from 'react-router-dom'

import { ToggleSidebar } from '@features/sidebar'

import { DeviceIndicator } from '@entities/device'
import { NetworkIndicator } from '@entities/network'
import { ThemeSwitcher } from '@entities/theme'

import { RainbowButton } from '@shared/ui'
import { EffectorIcon } from '@shared/ui/assets/svg-icons'

export const HeaderApp = () => {
  return (
    <div className="relative my-auto flex min-h-12 w-full items-center justify-between bg-transparent px-20">
      <div className="absolute left-2 top-0 flex h-12 w-8 items-center justify-center">
        <ToggleSidebar />
      </div>

      <Link to="/" tabIndex={-1}>
        <RainbowButton className="h-9 select-none space-x-2 px-3">
          <EffectorIcon size="1rem" />
          <span>effectory</span>
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

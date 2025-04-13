import { Link } from 'react-router-dom'

import { ToggleSidebar } from '@features/sidebar'

import { Changelog } from '@entities/changelog'
import { DeviceIndicator } from '@entities/device'
import { NetworkIndicator } from '@entities/network'
import { ThemeSwitcher } from '@entities/theme'
import { SuccessNotification, Updater } from '@entities/updater'

import { RainbowButton } from '@shared/ui'
import { EffectorIcon } from '@shared/ui/assets/svg-icons'

export const HeaderApp = () => {
  return (
    <div className="relative my-auto flex w-full items-center justify-start gap-6 bg-transparent pb-2 pl-2 pr-20 pt-2">
      <div className="flex w-8 items-center justify-center">
        <ToggleSidebar />
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-center gap-4">
          <Link to="/" tabIndex={-1}>
            <RainbowButton className="h-9 select-none space-x-2 px-3">
              <EffectorIcon size="1rem" />
              <span>effectory</span>
            </RainbowButton>
          </Link>

          <Changelog autoUpdater={<Updater />} />
          <SuccessNotification />
        </div>

        <div className="flex items-center gap-4">
          <DeviceIndicator />
          <NetworkIndicator />
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  )
}

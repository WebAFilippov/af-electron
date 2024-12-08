import { Binary, Wifi } from 'lucide-react'
import { FC } from 'react'

import { ModeToggle } from '@features/theme-mode'
import { WindowControls } from '@features/window-control/ui'

import { SidebarTrigger, StatusBadge, useSidebar } from '@shared/components/ui'
import { useOnline } from '@shared/hooks'
import { cn } from '@shared/lib/utils'

type Props = {
  className?: string
}

export const WindowHeader: FC<Props> = ({ className }) => {
  const { isOnline, loading } = useOnline(10000)
  const { state, isMobile } = useSidebar()

  return (
    <div
      className={cn(
        'absolute inset-0 flex h-8 items-center justify-between gap-4 overflow-hidden border-b border-sidebar-border bg-sidebar text-sidebar-foreground area-drag user-select-none',
        className
      )}
    >
      <div
        className={cn(
          'relative h-8 transition-[width] duration-200 ease-linear',
          state === 'collapsed' ? 'w-[--sidebar-width-icon]' : 'w-[--sidebar-width]',
          isMobile && 'w-0'
        )}
      >
        <SidebarTrigger className="absolute -right-8 top-0 area-no-drag" />
      </div>

      {/* <SidebarTrigger className="area-no-drag" /> */}
      <div className="flex items-center gap-6">
        <div>
          <ModeToggle className="area-no-drag" />
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge icon={<Wifi size={14} />} isActive={isOnline} loading={loading} />
          <StatusBadge icon={<Binary size={14} />} isActive={false} loading={true} />
        </div>

        {/* Кнопки свернуть/развернуть/закрыть */}
        <WindowControls />
      </div>
    </div>
  )
}

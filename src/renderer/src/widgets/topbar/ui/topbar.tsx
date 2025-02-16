import { useUnit } from 'effector-react'

import { $sidebar, toggleSidebar } from '@widgets/sidebar'

import { useDebugLayer } from '@entities/debug-mode/ui/use-debug-layer'

import {
  CloseIcon,
  MaximizeIcon,
  MinimizeIcon,
  MinusIcon,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon
} from '@shared/assets/svg-icons'
import { HeaderButton } from '@shared/ui'

export const Topbar = () => {
  const { ref } = useDebugLayer<HTMLDivElement>('widgets')
  const isOpen = useUnit($sidebar)
  const handleToggleSidebar = useUnit(toggleSidebar)

  const handleMinimize = () => {
    window.api.setMinimazeWindow()
  }
  const handleMaximize = () => {
    window.api.setMaximazeWindow()
  }
  const handleClose = () => {
    window.api.setCloseWindow()
  }

  return (
    <div
      className="relative z-10 flex h-[2.1rem] w-full justify-between border-b border-dashed border-primary bg-background area-drag"
      ref={ref}
    >
      <div className="flex items-center justify-center">
        <HeaderButton
          className='after:absolute after:left-full after:ml-[0.3rem] after:-rotate-6 after:whitespace-nowrap after:font-pacifico after:text-sm after:content-["Ctrl_+_B"]'
          icon={isOpen ? <PanelLeftCloseIcon size="1rem" /> : <PanelLeftOpenIcon size="1rem" />}
          onClick={handleToggleSidebar}
        />
      </div>

      <div className="flex items-center justify-center">
        <HeaderButton
          className="border-l border-dashed border-primary"
          icon={<MinusIcon size="1rem" />}
          onClick={() => handleMinimize()}
        />
        <HeaderButton
          className="border-l border-dashed border-primary"
          icon={true ? <MaximizeIcon size="1rem" /> : <MinimizeIcon size="1rem" />}
          onClick={() => handleMaximize()}
        />
        <HeaderButton
          className="border-l border-dashed border-primary hover:bg-destructive hover:text-primary-foreground"
          icon={<CloseIcon size="1.3rem" />}
          onClick={() => handleClose()}
        />
      </div>
    </div>
  )
}

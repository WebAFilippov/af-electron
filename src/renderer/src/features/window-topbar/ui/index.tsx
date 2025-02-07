import { useUnit } from 'effector-react'

import { $sidebar, toggleSidebar } from '@features/sidebar'

import { DebugWrapper } from '@entities/debug-mode/ui/DebugWrapper'

import {
  CloseIcon,
  MaximizeIcon,
  MinimizeIcon,
  MinusIcon,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon
} from '@shared/assets/svg-icons'
import { cn } from '@shared/lib'

export const WindowHeader = () => {
  const isOpenSidebar = useUnit($sidebar)
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
    <header className="relative z-10 flex h-[2rem] w-full justify-between border-b border-dashed border-primary bg-background area-drag">
      <DebugWrapper layer="features" />

      <div className="mb-[1px] flex items-center justify-center">
        <button
          className={cn(
            'relative z-20 flex h-[2rem] w-[2.5rem] items-center justify-center bg-background text-primary outline-none transition-[background,color,width,height] duration-300 area-no-drag hover:bg-foreground hover:text-primary-foreground focus-visible:-outline-offset-[0.2rem] focus-visible:outline-blue-500',
            'after:absolute after:left-full after:ml-[0.3rem] after:-rotate-6 after:whitespace-nowrap after:font-pacifico after:text-sm after:content-["Ctrl_+_B"]'
          )}
          onClick={handleToggleSidebar}
        >
          {isOpenSidebar ? <PanelLeftCloseIcon size="1rem" /> : <PanelLeftOpenIcon size="1rem" />}
        </button>
      </div>

      <div className="mb-[1px] flex items-center justify-center">
        <button
          className="transition-[background, color, width, height] z-20 flex h-[2rem] w-[2.5rem] items-center justify-center rounded-none border-l border-dashed border-primary bg-background text-primary outline-none duration-300 area-no-drag hover:bg-foreground hover:text-primary-foreground"
          aria-label="Свернуть"
          tabIndex={-1}
          onClick={() => handleMinimize()}
        >
          <MinusIcon size="1rem" />
        </button>
        <button
          className="transition-[background, color, width, height] relative z-20 m-0 flex h-[2rem] w-[2.5rem] items-center justify-center rounded-none border-l border-dashed border-primary bg-background text-primary duration-300 area-no-drag hover:bg-foreground hover:text-primary-foreground"
          aria-label="Развернуть"
          tabIndex={-1}
          onClick={() => handleMaximize()}
        >
          {true ? <MaximizeIcon size="1rem" /> : <MinimizeIcon size="1rem" />}
        </button>
        <button
          className="transition-[background, color, width, height] relative z-20 m-0 flex h-[2rem] w-[2.5rem] items-center justify-center rounded-none border-l border-dashed border-primary bg-background text-primary duration-300 area-no-drag hover:bg-destructive hover:text-primary-foreground"
          tabIndex={-1}
          aria-label="Закрыть"
          onClick={() => handleClose()}
        >
          <CloseIcon size="1.3rem" />
        </button>
      </div>
    </header>
  )
}

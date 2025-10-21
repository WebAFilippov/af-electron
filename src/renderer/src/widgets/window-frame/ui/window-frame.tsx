import { NavItems } from '@shared/config/constants'
import { cn } from '@shared/lib'
import {
  $windowFullscreen,
  $windowMaximize,
  GateWindow,
  setWindowClose,
  setWindowMaximize,
  setWindowMinimize
} from '@shared/model'
import { Separator } from '@shared/ui'
import { useGate, useUnit } from 'effector-react'
import { Maximize, Minimize, Minus, Webhook, X } from 'lucide-react'
import { useLocation } from 'react-router-dom'

export const WindowFrame = () => {
  useGate(GateWindow)

  const location = useLocation()

  const [
    windowFullscreen,
    windowMaximize,
    handleMinimize,
    handleMaximize,
    handleClose
  ] = useUnit([
    $windowFullscreen,
    $windowMaximize,
    setWindowMinimize,
    setWindowMaximize,
    setWindowClose
  ])
  
  return (
    <header
      className={cn(
        'flex-shrink-0 bg-sidebar h-8 p-1 pl-3 flex items-center justify-between border-b area-drag backdrop-blur-sm',
        windowFullscreen && 'hidden'
      )}
    >
      <div className="flex items-center truncate gap-2 h-full">
        <Webhook size={17} className="text-accent" />
        <span className="text-sm font-bold text-accent">AFLED</span>
        {NavItems.find((item) => item.path === location.pathname) && (
          <>
            <Separator
              decorative={true}
              orientation="vertical"
              className="!h-6 mx-1"
            />
            <span className="text-sidebar-foreground/80 font-medium">
              {NavItems.find((item) => item.path === location.pathname)?.title}
            </span>
          </>
        )}
      </div>

      <div className="flex items-center gap-[5px] justify-center">
        <button
          className="bg-transparent p-[5px] text-sidebar-foreground hover:bg-neutral-400/20 rounded-md area-no-drag"
          onClick={handleMinimize}
        >
          <Minus size={17} />
        </button>
        <button
          className="bg-transparent p-[5px] text-sidebar-foreground hover:bg-neutral-400/20 rounded-md area-no-drag"
          onClick={handleMaximize}
        >
          {!windowMaximize ? <Maximize size={17} /> : <Minimize size={17} />}
        </button>
        <button
          className="bg-transparent p-[5px] text-sidebar-foreground hover:bg-destructive hover:text-white rounded-md area-no-drag"
          onClick={handleClose}
        >
          <X size={17} />
        </button>
      </div>
    </header>
  )
}

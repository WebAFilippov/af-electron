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
import { Button, Separator } from '@shared/ui'
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
        'bg-sidebar text-sidebar-foreground drag sticky top-0 z-50 flex h-9 w-full shrink-0 items-center justify-end overflow-hidden border-b',
        windowFullscreen && 'hidden'
      )}
    >
      <div className="flex items-center justify-center gap-[5px]">
        <Button
          variant="ghost"
          className="no-drag rounded-none"
          onClick={handleMinimize}
        >
          <Minus className="size-5" />
        </Button>
        <Button
          variant="ghost"
          className="no-drag rounded-none"
          onClick={handleMaximize}
        >
          {!windowMaximize ? (
            <Maximize className="size-4" />
          ) : (
            <Minimize className="size-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          className="no-drag !bg-sidebar text-sidebar-foreground hover:!bg-destructive hover:text-background dark:hover:!text-sidebar-foreground focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 rounded-none"
          onClick={handleClose}
        >
          <X className="size-5" />
        </Button>
      </div>
    </header>
  )
}

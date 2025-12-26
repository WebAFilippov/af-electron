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
        'drag bg-sidebar text-sidebar-foreground sticky top-0 z-50 flex h-9 w-full shrink-0 items-center justify-end overflow-hidden border-b',
        windowFullscreen && 'hidden'
      )}
    >
      <div className="flex items-center justify-center">
        <Button tabIndex={-1} variant="windowApp" onClick={handleMinimize}>
          <Minus className="size-5" />
        </Button>
        <Button tabIndex={-1} variant="windowApp" onClick={handleMaximize}>
          {!windowMaximize ? (
            <Maximize className="size-4" />
          ) : (
            <Minimize className="size-4" />
          )}
        </Button>
        <Button
          tabIndex={-1}
          variant="windowAppDesctructive"
          onClick={handleClose}
        >
          <X className="size-5" />
        </Button>
      </div>
    </header>
  )
}

import { cn } from '@shared/lib'
import {
  $windowFullscreen,
  $windowMaximize,
  GateWindow,
  setWindowClose,
  setWindowMaximize,
  setWindowMinimize
} from '@shared/model'
import { Button } from '@shared/ui'
import { useGate, useUnit } from 'effector-react'
import { Maximize, Minimize, Minus, X } from 'lucide-react'

export const WindowFrame = () => {
  useGate(GateWindow)

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
        'drag bg-sidebar text-sidebar-foreground z-50 flex h-9 w-full shrink-0 items-center justify-end border-b',
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

import { useUnit } from 'effector-react'
import { MaximizeIcon, MinimizeIcon, MinusIcon, X } from 'lucide-react'

import { useDebugLayer } from '@entities/debug-mode'
import {
  $windowFullscreen,
  $windowMaximize,
  setWindowClose,
  setWindowMaximize,
  setWindowMinimoize
} from '@entities/window'

import { cn } from '@shared/lib'
import { Button } from '@shared/ui'

export const Topbar = () => {
  const { ref } = useDebugLayer<HTMLDivElement>('widgets')
  const [windowFullscreen, windowMaximize, handleMinimize, handleMaximize, handleClose] = useUnit([
    $windowFullscreen,
    $windowMaximize,
    setWindowMinimoize,
    setWindowMaximize,
    setWindowClose
  ])

  return (
    <div
      className={cn(
        'relative z-10 flex h-8 w-full items-center justify-end bg-gray-300/20 area-drag',
        windowFullscreen && 'hidden'
      )}
      ref={ref}
    >
      <div className="flex space-x-0 area-no-drag">
        <Button
          variant="outline"
          className="h-8 w-8"
          tabIndex={-1}
          onClick={() => handleMinimize()}
        >
          <MinusIcon strokeWidth={1} className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8"
          tabIndex={-1}
          onClick={() => handleMaximize()}
        >
          {windowMaximize ? (
            <MinimizeIcon strokeWidth={1} className="h-4 w-4" />
          ) : (
            <MaximizeIcon strokeWidth={1} className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 hover:bg-destructive hover:text-destructive-foreground"
          tabIndex={-1}
          onClick={() => handleClose()}
        >
          <X strokeWidth={1} className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

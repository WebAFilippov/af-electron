import { useUnit } from 'effector-react'
import { MaximizeIcon, MinimizeIcon, MinusIcon, X } from 'lucide-react'

import {
  $windowFullscreen,
  $windowMaximize,
  setWindowClose,
  setWindowMaximize,
  setWindowMinimize
} from '@entities/window'

import { cn } from '@shared/lib'
import { Button } from '@shared/ui'

export const TopbarApp = () => {
  const [windowFullscreen, windowMaximize, handleMinimize, handleMaximize, handleClose] = useUnit([
    $windowFullscreen,
    $windowMaximize,
    setWindowMinimize,
    setWindowMaximize,
    setWindowClose
  ])

  return (
    <>
      <div
        className={cn(
          'absolute inset-0 z-10 flex h-[33px] w-full items-center justify-end border-b border-border bg-background area-drag',
          windowFullscreen && 'hidden'
        )}
      >
        <div className="flex space-x-0 area-no-drag">
          <Button
            variant="outline"
            className="h-8 w-8 cursor-default border-none rounded-none"
            tabIndex={-1}
            onClick={() => handleMinimize()}
          >
            <MinusIcon size="1rem" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 cursor-default border-none rounded-none"
            tabIndex={-1}
            onClick={() => handleMaximize()}
          >
            {windowMaximize ? <MinimizeIcon size="1rem" /> : <MaximizeIcon size="1rem" />}
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 cursor-default border-none rounded-none hover:bg-destructive hover:text-destructive-foreground"
            tabIndex={-1}
            onClick={() => handleClose()}
          >
            <X size="1rem" />
          </Button>
        </div>
      </div>
    </>
  )
}

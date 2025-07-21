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
import { MaximizeIcon, MinimizeIcon, MinusIcon, X } from 'lucide-react'

export const TopbarApp = () => {
  useGate(GateWindow)

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
          'absolute inset-0 flex h-[33px] w-full items-center justify-end border-b border-border bg-background area-drag',
          windowFullscreen && 'hidden'
        )}
      >
        <div className="flex space-x-0 area-no-drag">
          <Button
            variant="outline"
            className="h-8 w-10 cursor-default border-none rounded-none shadow-none duration-0 dark:text-foreground dark:bg-background"
            tabIndex={-1}
            onClick={() => handleMinimize()}
          >
            <MinusIcon />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-10 cursor-default border-none rounded-none dark:bg-background shadow-none duration-0 dark:text-foreground"
            tabIndex={-1}
            onClick={() => handleMaximize()}
          >
            {windowMaximize ? <MinimizeIcon /> : <MaximizeIcon />}
          </Button>
          <Button
            variant="outline"
            className="h-8 w-10 cursor-default border-none rounded-none dark:bg-background hover:bg-destructive hover:text-destructive-foreground dark:text-foreground bg-background shadow-none duration-0 dark:hover:bg-destructive"
            tabIndex={-1}
            onClick={() => handleClose()}
          >
            <X />
          </Button>
        </div>
      </div>
    </>
  )
}

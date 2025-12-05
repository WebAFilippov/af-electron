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
        'bg-sidebar text-sidebar-foreground area-drag flex h-8 shrink-0 items-center justify-between border-b p-1 pl-3',
        windowFullscreen && 'hidden'
      )}
    >
      <div className="flex h-full items-center gap-2 truncate">
        <Webhook size={17} className="text-sidebar-primary" />
        <span className="text-sidebar-primary text-sm font-bold">AFLED</span>
        {NavItems.find((item) => item.path === location.pathname) && (
          <>
            <Separator
              decorative={true}
              orientation="vertical"
              className="mx-1 !h-6"
            />
            <span className="font-medium">
              {NavItems.find((item) => item.path === location.pathname)?.title}
            </span>
          </>
        )}
      </div>

      <div className="flex items-center justify-center gap-[5px]">
        <Button
          variant="ghost"
          size="icon-xs"
          className="area-no-drag rounded-md"
          onClick={handleMinimize}
        >
          <Minus className="size-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon-xs"
          className="area-no-drag rounded-md"
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
          size="icon-xs"
          className="area-no-drag !bg-sidebar text-sidebar-foreground hover:!bg-destructive hover:text-background dark:hover:!text-sidebar-foreground focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 rounded-md"
          onClick={handleClose}
        >
          <X className="size-5" />
        </Button>
      </div>
    </header>
  )
}

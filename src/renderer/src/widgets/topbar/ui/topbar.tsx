import { useDebugLayer } from '@entities/debug-mode/ui/use-debug-layer'

import { CloseIcon, MaximizeIcon, MinimizeIcon, MinusIcon } from '@shared/assets/svg-icons'
import { Button } from '@shared/ui'

export const Topbar = () => {
  const { ref } = useDebugLayer<HTMLDivElement>('widgets')

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
      className="relative z-10 flex h-8 w-full items-center justify-end bg-gray-300/20 area-drag"
      ref={ref}
    >
      <div className="flex gap-[.1rem] area-no-drag">
        <Button
          variant="outline"
          className="h-8 w-8"
          tabIndex={-1}
          onClick={() => handleMinimize()}
        >
          <MinusIcon size="2rem" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8"
          tabIndex={-1}
          onClick={() => handleMaximize()}
        >
          {true ? <MaximizeIcon size="2rem" /> : <MinimizeIcon size="1rem" />}
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 hover:bg-destructive hover:text-primary-foreground"
          tabIndex={-1}
          onClick={() => handleClose()}
        >
          <CloseIcon size="2rem" />
        </Button>
      </div>
    </div>
  )
}

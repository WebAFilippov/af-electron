import { Maximize, Minimize, Minus, X } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@shared/components/ui'

export const WindowControls = () => {
  const [isMaximized, setIsMaximized] = useState(false)

  const handleMinimize = () => {
    window.window_control.minimizeWindow()
  }
  const handleMaximize = () => {
    window.window_control.maximizeWindow()
  }
  const handleClose = () => {
    window.window_control.closeWindow()
  }

  return (
    <div className="flex items-center justify-center">
      <Button
        variant="ghost"
        size="icon"
        className="area-no-drag [&_svg]:size-4 [&_svg]:shrink-0 rounded-none h-8 w-10"
        tabIndex={-1}
        onClick={handleMinimize}
      >
        <Minus />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="area-no-drag [&_svg]:size-4 [&_svg]:shrink-0 rounded-none h-8 w-10"
        tabIndex={-1}
        onClick={handleMaximize}
      >
        {isMaximized ? <Minimize /> : <Maximize />}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="area-no-drag text-red-500 hover:text-red-500 [&_svg]:size-5 [&_svg]:shrink-0 rounded-none h-8 w-10"
        tabIndex={-1}
        onClick={handleClose}
      >
        <X data-testid="close-button" onClick={handleClose} />
      </Button>
    </div>
  )
}

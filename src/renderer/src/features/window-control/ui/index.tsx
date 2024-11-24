import { Maximize, Minimize, Minus, X } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@shared/components/ui'

export const WindowControls = () => {
  const [isMaximized] = useState(false)

  const handleMinimize = () => {
    window.api.minimizeWindow()
  }
  const handleMaximize = () => {
    window.api.maximizeWindow()
  }
  const handleClose = () => {
    window.api.closeWindow()
  }

  return (
    <div className="flex items-center justify-center">
      <Button
        variant="ghost"
        size="icon"
        className="area-no-drag [&_svg]:size-4 [&_svg]:shrink-0 rounded-none h-8 w-10 transition-colors duration-200"
        tabIndex={-1}
        onClick={handleMinimize}
      >
        <Minus />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="area-no-drag [&_svg]:size-4 [&_svg]:shrink-0 rounded-none h-8 w-10 transition-colors duration-200"
        tabIndex={-1}
        onClick={handleMaximize}
      >
        {isMaximized ? <Minimize /> : <Maximize />}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="area-no-drag hover:bg-red-500 [&_svg]:size-4 [&_svg]:shrink-0 rounded-none h-8 w-10 transition-colors duration-200"
        tabIndex={-1}
        onClick={handleClose}
      >
        <X data-testid="close-button" onClick={handleClose} />
      </Button>
    </div>
  )
}

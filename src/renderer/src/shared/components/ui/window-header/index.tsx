import {
  VscChromeMaximize,
  VscChromeMinimize,
  VscChromeClose
  // VscChromeRestore
} from 'react-icons/vsc'

import { Button } from '../button/button'
import { ModeToggle } from './../../../../entities/mode-toggle/mode-toggle'

export const WindowHeader = () => {
  const handleClickControlMinimize = () => {
    window.title_control.minimizeWindow()
  }
  const handleClickControlMaximize = () => {
    window.title_control.maximizeWindow()
  }
  const handleClickControlClose = () => {
    window.title_control.closeWindow()
  }

  return (
    <div className="h-8 absolute top-0 left-0 w-full flex gap-8 justify-end items-center overflow-hidden area-drag user-select-none">
      <div className="flex items-center justify-center gap-4">
        <div className="flex justify-center items-center">
          <span className="font-ym_text font-bold text-[11px] text-green-400">Online</span>
        </div>
        <div className="flex justify-center items-center">
          <span className="font-ym_text font-bold text-[11px] text-red-400">MQTT</span>
        </div>
      </div>
      <div>
        <ModeToggle className="w-[42px] area-no-drag text-control_window-foreground bg-transparent hover:bg-control_window" />
      </div>
      <div className="flex items-center justify-center">
        <Button
          id="minimize-window"
          type="button"
          aria-label="Свернуть"
          variant="ghost"
          tabIndex={-1}
          className="w-[42px] area-no-drag text-control_window-foreground bg-transparent hover:bg-control_window"
          onClick={() => handleClickControlMinimize()}
        >
          {<VscChromeMinimize />}
        </Button>
        <Button
          id="maximize-window"
          type="button"
          aria-label="Развернуть"
          variant="ghost"
          tabIndex={-1}
          className="w-[42px] area-no-drag text-control_window-foreground bg-transparent hover:bg-control_window"
          onClick={() => handleClickControlMaximize()}
        >
          {<VscChromeMaximize />}
        </Button>
        <Button
          id="close-window"
          type="button"
          aria-label="Закрыть"
          variant="ghost"
          tabIndex={-1}
          className="w-[42px] area-no-drag text-control_window-foreground bg-transparent hover:bg-control_window-close"
          onClick={() => handleClickControlClose()}
        >
          {<VscChromeClose />}
        </Button>
      </div>
    </div>
  )
}

import {
  VscChromeClose, // VscChromeRestore
  VscChromeMaximize,
  VscChromeMinimize
} from 'react-icons/vsc'

import { ModeToggle } from '@features/theme-mode'

import { Button } from '@shared/components/ui'
import { useOnline } from '@shared/hooks'
import { cn } from '@shared/lib/utils'

export const WindowHeader = () => {
  const statusOnline = useOnline(10000)
  const handleClickControlMinimize = () => {
    window.window_control.minimizeWindow()
  }
  const handleClickControlMaximize = () => {
    window.window_control.maximizeWindow()
  }
  const handleClickControlClose = () => {
    window.window_control.closeWindow()
  }

  return (
    <div className="area-drag user-select-none absolute left-0 top-0 flex h-8 w-full items-center justify-end gap-8 overflow-hidden">
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center justify-center">
          <span
            className={cn(
              'font-ym_text text-[11px] font-bold text-red-400',
              statusOnline && 'text-green-400'
            )}
          >
            WEB
          </span>
        </div>
        <div className="flex items-center justify-center">
          <span className="font-ym_text text-[11px] font-bold text-red-400">MQTT</span>
        </div>
      </div>
      <div>
        <ModeToggle className="area-no-drag text-control_window-foreground hover:bg-control_window w-[42px] bg-transparent" />
      </div>
      <div className="flex items-center justify-center">
        <Button
          id="minimize-window"
          type="button"
          aria-label="Свернуть"
          variant="ghost"
          tabIndex={-1}
          className="area-no-drag text-control_window-foreground hover:bg-control_window w-[42px] bg-transparent"
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
          className="area-no-drag text-control_window-foreground hover:bg-control_window w-[42px] bg-transparent"
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
          className="area-no-drag text-control_window-foreground hover:bg-control_window-close w-[42px] bg-transparent"
          onClick={() => handleClickControlClose()}
        >
          {<VscChromeClose />}
        </Button>
      </div>
    </div>
  )
}

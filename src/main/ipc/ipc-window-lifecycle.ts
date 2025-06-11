import { WindowState } from '@shared/types'
import { BrowserWindow } from 'electron'

export const ipcWindowLifecycle = (window: BrowserWindow) => {
  const updateWindowState = (key: string) => {
    const windowState: WindowState = {
      minimize: window.isMinimized(),
      maximize: window.isMaximized(),
      fullscreen:
        key === 'enter-full-screen'
          ? true
          : key === 'leave-full-screen'
            ? false
            : window.isFullScreen(),
      show: window.isVisible()
    }

    window.webContents.send('window_state', windowState)
  }

  window.on('maximize', () => updateWindowState('maximize'))
  window.on('minimize', () => updateWindowState('minimize'))
  window.on('restore', () => updateWindowState('restore'))
  window.on('unmaximize', () => updateWindowState('unmaximize'))
  window.on('enter-full-screen', () => updateWindowState('enter-full-screen'))
  window.on('leave-full-screen', () => updateWindowState('leave-full-screen'))
  window.on('hide', () => updateWindowState('hide'))
  window.on('show', () => updateWindowState('show'))
  window.on('close', () => updateWindowState('close'))
}

import { BrowserWindow, ipcMain } from 'electron'

import { Logger } from '@utils/logger'

const log = new Logger('control-window')

export const IPCHandlers = (window: BrowserWindow, isAutoLaunch: boolean) => {
  ipcMain.on('start-window', async () => {
    if (!isAutoLaunch) {
      window.show()
      log.info('Window is shown')
    } else {
      log.info('Window is not shown')
    }
  })

  ipcMain.on('minimize-window', () => {
    if (window) window.minimize()
  })

  ipcMain.on('maximize-window', () => {
    if (window) {
      if (window.isMaximized()) {
        window.unmaximize()
      } else {
        window.maximize()
      }
    }
  })

  ipcMain.on('close-window', async () => {
    if (window) {
      window.hide()
    }
  })
}

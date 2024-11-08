import { BrowserWindow, ipcMain } from 'electron'

import { Logger } from '../../libs/logger'

const log = new Logger('control-window')

export const handlerControlWindow = (window: BrowserWindow, isAutoLaunch: boolean) => {
  ipcMain.handleOnce('start-window', () => {
    if (!isAutoLaunch) {
      window.show()
      log.info('Window is shown')
      return 'Window is shown'
    } else {
      log.info('Window is not shown')
      return 'Window is not shown'
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

  ipcMain.on('close-window', () => {
    if (window) window.hide()
  })
}

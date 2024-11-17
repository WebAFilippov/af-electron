import { BrowserWindow, ipcMain } from 'electron'

import { Logger } from '../../libs/logger'
import { Low } from 'lowdb/lib'
import { IState } from '../../types'

const log = new Logger('control-window')

export const handlerControlWindow = (
  window: BrowserWindow,
  isAutoLaunch: boolean,
  store: Low<IState>
) => {
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

  ipcMain.on('close-window', async () => {
    if (window) {
      window.hide()

      store.data.isHide = true
      await store.write()
    }
  })
}

import { app, BrowserWindow, Menu } from 'electron'

import { Logger } from './libs/logger'
import { createWindow } from './libs/create-window'
import { autoLaunch } from './libs/auto-launch'

import { createTray } from './libs/tray'

import { initDb } from './libs/database/store'
import { setupBackground } from './libs/create-bg-main'
import { handlerControlWindow } from './handlers/control-window/control-window'
import { is } from '@electron-toolkit/utils'

Logger.setupLogger()
const log = new Logger('main')

autoLaunch(true)
!is.dev && Menu.setApplicationMenu(null)

const isAutoLaunch = process.argv.includes('--auto-launch')
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    const [window] = BrowserWindow.getAllWindows()
    if (window) {
      if (window.isMinimized()) {
        window.restore()
      }
      if (!window.isVisible()) {
        window.show()
      }
      window.focus()
    }
  })

  app.whenReady().then(async () => {
    try {
      const window = createWindow()
      createTray(window)

      const store = await initDb(isAutoLaunch)
      setupBackground(store, window)

      handlerControlWindow(window, isAutoLaunch)

      log.info('Application ready')
    } catch (error) {
      log.error(error)
    }
  })
}

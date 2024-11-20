import { app, BrowserWindow, Menu } from 'electron'

import { Logger } from './libs/logger'
import { createWindow } from './libs/create-window'
import { autoLaunch } from './libs/auto-launch'

import { createTray } from './libs/tray'

import { initDb } from './libs/database/store'
import { setupBackground } from './libs/create-bg-main'

import { is } from '@electron-toolkit/utils'
import { handlerControlWindow } from './handlers/control-window'
import { handlerWindow } from './handlers/app-handlers'
import { dbHandlers } from './handlers/db-handlers'
import { initializeDatabase } from './libs/database/db'

Logger.setupLogger()
const log = new Logger('main')

autoLaunch(true)
!is.dev && Menu.setApplicationMenu(null)

const isAutoLaunch = process.argv.includes('--auto-launch')
const gotTheLock = app.requestSingleInstanceLock() // Проверка на запущенное окно -> true if once window

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
      await initializeDatabase()

      const store = await initDb(isAutoLaunch)

      const window = createWindow()
      const tray = createTray(window, store)
      console.log(tray)

      setupBackground(store, window)

      // HANDLERS
      handlerWindow(window, store)
      handlerControlWindow(window, store, isAutoLaunch)
      dbHandlers()

      app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createWindow()
        }
      })

      log.info('Application ready')
    } catch (error) {
      log.error(error)
    }
  })
}

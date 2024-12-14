import { is } from '@electron-toolkit/utils'

import { app, BrowserWindow, Menu } from 'electron'

import { createWindow } from '@ui/create-window'
import { createTray } from '@ui/tray'


import { Logger } from '@utils/logger'
import { windowLifecycle } from '@utils/window-lifecycle'

import { initDatabase } from '@database/database'
import { seedDatabase } from '@database/seed'

import { setAutoLaunch } from '@services/auto-launch'

import { ipcHandlers } from './ipc'

Logger.setupLogger()
const log = new Logger('main')

setAutoLaunch(is.dev ? false : true)
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
      await initDatabase()
      await seedDatabase()

      const window = createWindow()
      createTray(window)

      // HANDLERS
      ipcHandlers(window, isAutoLaunch)

      windowLifecycle(window)

      

      // app.on('activate', () => {
      //   if (BrowserWindow.getAllWindows().length === 0) {
      //     createWindow()
      //   }
      // })

      log.info('Application ready')
    } catch (error) {
      log.error(error)
    }
  })
}

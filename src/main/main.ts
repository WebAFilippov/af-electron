import { is } from '@electron-toolkit/utils'

import { app, BrowserWindow, Menu } from 'electron'

import { createTray } from '@ui/create-tray'
import { createWindow } from '@ui/create-window'

import { autoUpdater } from '@utils/autoUpdater'
import { Logger } from '@utils/logger'

import { initDatabase } from '@database/database'
import { seedDatabase } from '@database/seed'

import { applicationService } from '@services/application.service'

import { ipcHandlers } from './ipc'
import { setAutoLaunch } from './utils/auto-launch'

Logger.setupLogger()
const log = new Logger('main')

setAutoLaunch(!is.dev)
!is.dev && Menu.setApplicationMenu(null)

// const isAutoLaunch = process.argv.includes('--auto-launch')
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

      const { theme } = await applicationService.getApplication()

      const window = createWindow(theme)
      createTray(window)

      // HANDLERS
      ipcHandlers(window)

      // Updater
      autoUpdater(window)

      log.info('Application ready')
    } catch (error) {
      log.error(error)
    }
  })
}

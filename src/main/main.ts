import { createTray } from '@app/create-tray'
import { createWindow } from '@app/create-window'
import { initDatabase } from '@database/database'
import { seedDatabase } from '@database/seed'
import { is } from '@electron-toolkit/utils'
import { ipcHandlers } from '@ipc/index'
import { Monitors } from '@lib/monitors/monitors'
import { autoUpdater } from '@lib/updater'
import { setAutoLaunch } from '@utils/auto-launch'
import { Logger } from '@utils/logger'
import { app, BrowserWindow } from 'electron'
import si from 'systeminformation'
import { startEspServer } from './server'

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

Logger.setupLogger()
const log = new Logger('main')

setAutoLaunch(!is.dev)
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

      const window = await createWindow()
      const updater = autoUpdater(window)

      createTray(window, updater)
      ipcHandlers(window, updater)

      const monitors = new Monitors(window)

      startEspServer();

    } catch (error) {
      log.error(error)
    }
  })
}

import { is } from '@electron-toolkit/utils'

import { app, BrowserWindow, Menu, session } from 'electron'

import { createWindow } from '@ui/create-window'
import { createTray } from '@ui/tray'

import { getLatestReduxDevToolsPath } from '@utils/latestReduxDevToolsPath'
import { Logger } from '@utils/logger'
import { windowLifecycle } from '@utils/window-lifecycle'

import { initDatabase } from '@database/database'
import { seedDatabase } from '@database/seed'



import { setAutoLaunch } from './utils/auto-launch'

import { ipcHandlers } from './ipc'
import { cityRepository } from '@repositories/City.repository'


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
      if (is.dev) {
        const latestPath = await getLatestReduxDevToolsPath()
        if (latestPath) {
          try {
            await session.defaultSession.loadExtension(latestPath)
            log.log('Redux DevTools загружен!')
          } catch (err) {
            log.error('Ошибка загрузки Redux DevTools:', err)
          }
        }
      }

      await initDatabase()
      await seedDatabase()

      const window = createWindow()
      createTray(window)



      // HANDLERS
      ipcHandlers(window, isAutoLaunch)

      windowLifecycle(window)

      try {
        // for (let i = 0; i < 10; i++) {
        //   await cityRepository.createCity(Math.floor(Math.random() * 1000) + 1)
        // }

        // await cityRepository.deleteCity(27)
        // await cityRepository.updateCityOrder(25, 1)
      } catch (error) {
        console.log(error)
      }

      log.info('Application ready')
    } catch (error) {
      log.error(error)
    }
  })
}

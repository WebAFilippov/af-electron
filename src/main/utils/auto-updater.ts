import { app, BrowserWindow, ipcMain } from 'electron'
import Logger from 'electron-log'
import electronUpdater from 'electron-updater'

import { applicationService } from '@services/application.service'

export const autoUpdater = (window: BrowserWindow) => {
  if (!app.isPackaged) {
    return
  }

  const { autoUpdater } = electronUpdater

  autoUpdater.logger = Logger
  autoUpdater.logger.info = Logger.info

  autoUpdater.autoDownload = false
  autoUpdater.autoInstallOnAppQuit = false

  // Установлено новое обновление?
  app.on('will-finish-launching', async () => {
    const { version: oldVersion } = await applicationService.getApplication()
    const version = app.getVersion()

    if (oldVersion !== version) {
      window.webContents.send('v1/autoUpdater/success_update', version)
      await applicationService.updateApplicationField('version', version)
    }
  })

  // Обработка ошибок
  autoUpdater.on('error', (error, message) => {
    const data = {
      status: 'error',
      data: { error, message }
    }
  })

  // Проверка обновлений
  autoUpdater.on('checking-for-update', () => {
    const data = {
      status: 'checking-for-update'
    }

    window.webContents.send('v1/autoUpdater/update_data', data)
  })

  // Обновление доступно
  autoUpdater.on('update-available', (info) => {
    const data = {
      status: 'update-available',
      data: info
    }

    window.webContents.send('v1/autoUpdater/update_data', data)
  })

  //  Обновление отсутствует
  autoUpdater.on('update-not-available', (info) => {
    const data = {
      status: 'update-not-available',
      data: info
    }

    window.webContents.send('v1/autoUpdater/update_data', data)
  })

  // Обновление загружено
  autoUpdater.on('update-downloaded', (info) => {
    const data = {
      status: 'update-downloaded',
      data: info
    }

    window.webContents.send('v1/autoUpdater/update_data', data)
  })

  // Прогресс загрузки
  autoUpdater.on('download-progress', (info) => {
    const data = {
      status: 'download-progress',
      data: {
        total: info.total,
        delta: info.delta,
        transferred: info.transferred,
        percent: info.percent,
        bytesPerSecond: info.bytesPerSecond
      }
    }

    window.webContents.send('v1/autoUpdater/update_data', data)
  })

  ipcMain.on('v1/autoUpdater/start_download', () => {
    autoUpdater.downloadUpdate()
  })

  ipcMain.on('v1/autoUpdater/install-now', () => {
    autoUpdater.quitAndInstall()
  })

  ipcMain.on('v1/autoUpdater/install-on-quit', () => {
    autoUpdater.autoInstallOnAppQuit = true
  })

  autoUpdater.checkForUpdates()

  return autoUpdater
}

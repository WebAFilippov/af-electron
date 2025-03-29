import { app, BrowserWindow, ipcMain } from 'electron'
import Logger from 'electron-log'
import electronUpdater, {
  type AppUpdater,
  type ProgressInfo,
  type UpdateDownloadedEvent,
  type UpdateInfo
} from 'electron-updater'

export const autoUpdater = (window: BrowserWindow) => {
  if (!app.isPackaged) {
    Logger.info('Development mode, skipping update check.')
    return
  }

  const { autoUpdater } = electronUpdater

  autoUpdater.logger = Logger
  autoUpdater.logger.info = Logger.info

  autoUpdater.autoDownload = false
  autoUpdater.autoInstallOnAppQuit = false

  autoUpdater.setFeedURL({
    provider: 'github',
    owner: 'WebAFilippov',
    repo: 'af-electron'
  })

  app.on('will-finish-launching', () => {
    if (process.argv.includes('--updated')) {
      const version = app.getVersion()

      window.webContents.send('v1/autoUpdater/success_update', version)
    }
  })

  autoUpdater.on('error', (error, message) => {
    const data = {
      status: 'error',
      data: { error, message }
    }

    window.webContents.send('v1/autoUpdater/success_update', data)
  })

  autoUpdater.on('checking-for-update', () => {
    const data = {
      status: 'checking-for-update'
    }

    window.webContents.send('v1/autoUpdater/update_data', data)
  })

  autoUpdater.on('update-available', (info: UpdateInfo) => {
    const data = {
      status: 'update-available',
      data: info
    }

    window.webContents.send('v1/autoUpdater/update_data', data)
  })

  autoUpdater.on('update-not-available', (info) => {
    const data = {
      status: 'update-not-available',
      data: info
    }

    window.webContents.send('v1/autoUpdater/update_data', data)
  })

  autoUpdater.on('update-downloaded', (info) => {
    const data = {
      status: 'update-downloaded',
      data: info
    }

    window.webContents.send('v1/autoUpdater/update_data', data)
  })

  ipcMain.on('v1/autoUpdater/start_update', () => {
    autoUpdater.downloadUpdate()
  })

  ipcMain.on('install-now', () => {
    autoUpdater.quitAndInstall()
  })

  ipcMain.on('install-on-quit', () => {
    autoUpdater.autoInstallOnAppQuit = true
  })
}

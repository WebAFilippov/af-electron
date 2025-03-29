import Logger from 'electron-log'
import electronUpdater, {
  type AppUpdater,
  type ProgressInfo,
  type UpdateDownloadedEvent,
  type UpdateInfo
} from 'electron-updater'

export const getAutoUpdater = (): AppUpdater => {
  const { autoUpdater } = electronUpdater

  autoUpdater.autoDownload = false
  autoUpdater.autoInstallOnAppQuit = false

  autoUpdater.logger = Logger
  autoUpdater.logger.info = Logger.info

  autoUpdater.on('checking-for-update', () => {
    
  })
  autoUpdater.on('download-progress', (info: ProgressInfo) => {
    console.log(info)
  })
  autoUpdater.on('error', (error, message) => {
    console.log(error)
    message && console.log(message)
  })
  autoUpdater.on('update-available', (info: UpdateInfo) => {
    console.log(info)
  })
  autoUpdater.on('update-cancelled', (info: UpdateInfo) => {
    console.log(info)
  })
  autoUpdater.on('update-downloaded', (event: UpdateDownloadedEvent) => {
    console.log(event)
  })
  autoUpdater.on('update-not-available', (info: UpdateInfo) => {
    console.log(info)
  })

  return autoUpdater
}

import { programService } from '@services/program.service'
import { app, ipcMain } from 'electron'
import { AppUpdater } from 'electron-updater'

export const ipcUpdater = (autoUpdater: AppUpdater) => {
  ipcMain.handle('successful_update', async () => {
    const { version: oldVersion } = await programService.getProgram()
    const version = app.getVersion()
    const updated = version !== oldVersion

    if (updated) {
      await programService.updateProgramField('version', version)
    }

    return {
      version,
      updated
    }
  })

  ipcMain.handle('checking_for_update', async () => {
    try {
      return await autoUpdater.checkForUpdates()
    } catch (error) {
      return error
    }
  })

  ipcMain.on('retry_checking_for_update', async () => {
    return await autoUpdater.checkForUpdates()
  })

  ipcMain.on('start_download', () => {
    autoUpdater.downloadUpdate()
  })

  ipcMain.on('install_now', () => {
    autoUpdater.quitAndInstall()
  })

  ipcMain.on('install_on_quit', () => {
    autoUpdater.autoInstallOnAppQuit = true
  })
}

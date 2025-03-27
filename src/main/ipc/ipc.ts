import { BrowserWindow, ipcMain, shell } from 'electron'
import cron from 'node-cron'

import { getAutoUpdater } from '@utils/test'
import { configureTheme } from '@utils/window-theme'

import { applicationService } from '@services/application.service'

import { Theme } from '@main/shared/types'

export const IPCHandlers = (window: BrowserWindow) => {
  //Programm
  cron.schedule('*/5 * * * * *', async () => {
    const isOnline = await applicationService.isHostReachable('8.8.8.8')

    window.webContents.send('v1/programm/check_network', isOnline)
  })

  ipcMain.on('v1/programm/check_for_updates', () => {
    const autoUpdater = getAutoUpdater()
    autoUpdater.checkForUpdatesAndNotify()
  })

  //Window
  ipcMain.on('v1/window/theme', async (_event, theme: Theme) => {
    if (!window) return
    await applicationService.updateApplicationField('theme', theme)
    configureTheme(window, theme)
  })

  ipcMain.handle('v1/window/get_theme', async () => {
    const { theme } = await applicationService.getApplication()
    return theme as Theme
  })

  ipcMain.on('v1/window/toggle_fullscreen', () => {
    if (window) {
      window.setFullScreen(!window.isFullScreen())
    }
  })

  ipcMain.on('v1/window/minimaze', () => {
    if (window) window.minimize()
  })

  ipcMain.on('v1/window/maximize', () => {
    if (window) {
      if (window.isMaximized()) {
        window.unmaximize()
      } else {
        window.maximize()
      }
    }
  })

  ipcMain.on('v1/window/close', () => {
    if (window) {
      window.hide()
    }
  })

  //External
  ipcMain.on('v1/external/open', (_event, url: string) => {
    shell.openExternal(url)
  })
}

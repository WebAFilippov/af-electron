import { BrowserWindow, ipcMain, shell } from 'electron'

import { configureTheme } from '@utils/window-theme'

import { applicationService } from '@services/application.service'

import { Theme } from '@main/shared/types'

export const IPCHandlers = (window: BrowserWindow) => {
  ipcMain.on('v1/window/theme', async (_event, theme: Theme) => {
    if (!window) return
    await applicationService.updateApplicationField('theme', theme)
    configureTheme(window, theme)
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

  ipcMain.on('v1/external/open', (_event, url: string) => {
    shell.openExternal(url)
  })
}

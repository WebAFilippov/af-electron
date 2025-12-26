import { programService } from '@database/services/program.service'
import { Theme } from '@shared/types'
import { configureTheme } from '@utils/window-theme'
import { BrowserWindow, ipcMain } from 'electron'

export const ipcWindow = (window: BrowserWindow) => {
  ipcMain.on('update_theme', async (_event, theme: Theme) => {
    if (!window) return
    await programService.updateProgramField('theme', theme)
    configureTheme(window, theme)
  })

  ipcMain.handle('get_theme', async () => {
    const { theme } = await programService.getProgram()
    console.log(theme);
    return theme as Theme
  })

  ipcMain.on('toggle_fullscreen', () => {
    if (window) {
      window.setFullScreen(!window.isFullScreen())
    }
  })

  ipcMain.on('minimaze', () => {
    if (window) window.minimize()
  })

  ipcMain.on('maximize', () => {
    if (window) {
      if (window.isMaximized()) {
        window.unmaximize()
      } else {
        window.maximize()
      }
    }
  })

  ipcMain.on('close', () => {
    if (window) {
      window.hide()
    }
  })

  
}

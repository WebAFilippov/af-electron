import { BrowserWindow, ipcMain, nativeTheme } from 'electron'

import { applicationService } from '@services/Application.service'

import { ThemeColorBackground } from '@main/shared/constants'


export const ApplicationController = (window: BrowserWindow) => {
  ipcMain.handle('v1/application/get_theme', async () => {
    const { theme } = await applicationService.getApplication()

    switch (theme) {
      case 'light':
        window.setBackgroundColor(ThemeColorBackground.LIGHT)
        nativeTheme.themeSource = 'light'
        break
      case 'dark':
        window.setBackgroundColor(ThemeColorBackground.DARK)
        nativeTheme.themeSource = 'dark'
        break
      default:
        const theme = nativeTheme.shouldUseDarkColors ? 'dark' : 'light'
        nativeTheme.themeSource = theme
        window.setBackgroundColor(
          theme === 'dark'
            ? ThemeColorBackground.DARK
            : ThemeColorBackground.LIGHT
        )
        break
    }

    return theme
  })

}

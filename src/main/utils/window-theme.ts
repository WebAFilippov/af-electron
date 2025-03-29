import { nativeTheme } from 'electron'
import { BrowserWindow } from 'electron'

import { ThemeColorBackground } from '@main/shared/constants'
import { Theme } from '@main/shared/types'

export const configureTheme = (window: BrowserWindow, theme: Theme) => {
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
      theme === 'dark' ? (nativeTheme.themeSource = 'dark') : (nativeTheme.themeSource = 'light')
      window.setBackgroundColor(
        theme === 'dark' ? ThemeColorBackground.DARK : ThemeColorBackground.LIGHT
      )
      break
  }
}

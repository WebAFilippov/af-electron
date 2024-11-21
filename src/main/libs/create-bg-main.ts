import { BrowserWindow, nativeTheme } from 'electron'
import { Low } from 'lowdb/lib'

import { IState, ThemeColorBackground } from '@types_app/state'

export const setupBackground = (store: Low<IState>, window: BrowserWindow) => {
  switch (store.data.theme) {
    case 'light':
      window.setBackgroundColor(ThemeColorBackground.LIGHT)
      nativeTheme.themeSource = 'light'
      break
    case 'dark':
      window.setBackgroundColor(ThemeColorBackground.DARK)
      nativeTheme.themeSource = 'light'
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

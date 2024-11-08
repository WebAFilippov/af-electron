import { Low } from 'lowdb/lib'
import { AppDataDatabase } from './database/store'
import { BrowserWindow, nativeTheme } from 'electron'

export const setupBackground = (store: Low<AppDataDatabase>, window: BrowserWindow) => {
  switch (store.data.theme) {
    case 'light':
      window.setBackgroundColor('#de4343')
      nativeTheme.themeSource = 'light'
      break
    case 'dark':
      window.setBackgroundColor('#1e8c16')
      nativeTheme.themeSource = 'light'
      break
    default:
      const theme = nativeTheme.shouldUseDarkColors ? 'dark' : 'light'
      theme === 'dark' ? nativeTheme.themeSource = 'dark' : nativeTheme.themeSource = 'light'
      window.setBackgroundColor(theme === 'dark' ? '#1e8c16' : '#de4343')
      break
  }
}

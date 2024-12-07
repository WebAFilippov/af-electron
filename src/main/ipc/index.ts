import { BrowserWindow } from 'electron'

import { cityHandlers } from './city-handlers'
import { windowHandlers } from './ipc-window'

export const ipcHandlers = (window: BrowserWindow, isAutoLaunch: boolean) => {
  windowHandlers(window, isAutoLaunch)
  cityHandlers()
}

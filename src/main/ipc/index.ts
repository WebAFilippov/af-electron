import { BrowserWindow } from 'electron'

import { dataHandlers } from './data-handlers'
import { IPCHandlers } from './ipc'

export const ipcHandlers = (window: BrowserWindow, isAutoLaunch: boolean) => {
  IPCHandlers(window)
  dataHandlers(window, isAutoLaunch)
}

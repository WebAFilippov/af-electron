import { ipcExternalLink } from './ipc-external-link'
import { ipcSystemMonitor } from './ipc-systemmonitor'
import { ipcUpdater } from './ipc-updater'
import { ipcWindow } from './ipc-window'
import { ipcWindowLifecycle } from './ipc-window-lifecycle'
import { BrowserWindow } from 'electron'
import { AppUpdater } from 'electron-updater'

export const ipcHandlers = (window: BrowserWindow, autoUpdater: AppUpdater) => {
  ipcWindow(window)
  ipcWindowLifecycle(window)

  ipcUpdater(autoUpdater)
  ipcExternalLink()
  ipcSystemMonitor()
}

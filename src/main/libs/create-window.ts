import { BrowserWindow, shell } from 'electron'
import { join } from 'node:path'
import icon from '../../../resources/icon512.png?asset'
import { is } from '@electron-toolkit/utils'

import { state } from './state'

export const createWindow = (isAutoLaunch: boolean = false): BrowserWindow => {
  const window = new BrowserWindow({
    center: true,
    // titleBarStyle: 'hidden',
    trafficLightPosition: {
      x: 16,
      y: 10
    },
    minWidth: 768,
    minHeight: 650,
    width: 1280,
    height: 800,
    show: !isAutoLaunch,
    autoHideMenuBar: true,
    icon: join(icon),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      allowRunningInsecureContent: false,
      plugins: false,
      devTools: process.env.NODE_ENV !== 'production' ? true : false
    }
  })

  window.setMenu(null)
  window.setMenuBarVisibility(false)

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    window.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    window.loadFile(join(__dirname, '../renderer/index.html'))
  }

  window.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  window.once('ready-to-show', () => {
    toggleWindowVisibility(window, true)
  })

  return window
}

export const toggleWindowVisibility = (window: BrowserWindow, isVisible: boolean) => {
  if (isVisible) {
    window.show()
    window.setSkipTaskbar(false)
    state.isWindowHidden = false
  } else {
    window.hide()
    window.setSkipTaskbar(true)
    state.isWindowHidden = true
  }
  // ;(0, tray_js_1.updateTrayMenu)(window)
}

import { BrowserWindow } from 'electron'
import { join } from 'node:path'
import icon from '../../../resources/icon512.png?asset'
import { is } from '@electron-toolkit/utils'

import { state } from './state'

export const createWindow = (isAutoLaunch: boolean = false): BrowserWindow => {
  const window = new BrowserWindow({
    trafficLightPosition: {
      x: 16,
      y: 10
    },
    minWidth: 768,
    minHeight: 650,
    width: 1280,
    height: 800,
    center: true,
    show: !isAutoLaunch,
    titleBarStyle: is.dev ? 'default' : 'hidden',
    autoHideMenuBar: is.dev ? false : true,
    icon: join(icon),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      allowRunningInsecureContent: false,
      plugins: false,
      // devTools: is.dev ? true : false
    }
  })

  window.loadFile(join(__dirname, '../renderer/index.html'))

  // window.setMenu(null)
  // window.setMenuBarVisibility(false)

  window.on('ready-to-show', () => {    
    !isAutoLaunch && toggleWindowVisibility(window, true)
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
}

export const toggleWindowState = (window: BrowserWindow) => {
  if (state.isWindowHidden) {
    toggleWindowVisibility(window, true)
  } else if (window.isMinimized()) {
    window.restore()
  } else {
    window.minimize()
  }
}

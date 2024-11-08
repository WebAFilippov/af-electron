const { ipcMain } = require('electron')
import { app, BrowserWindow, nativeImage } from 'electron'
import { join } from 'node:path'
import icon from '../../../build/icon512.png?asset'
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
    // titleBarStyle: is.dev ? 'default' : 'hidden',
    titleBarStyle: 'hidden',
    autoHideMenuBar: is.dev ? false : true,
    icon: nativeImage.createFromPath(icon),
    webPreferences: {
      preload: join(__dirname, '..', 'preload', 'index.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      allowRunningInsecureContent: false,
      plugins: false,
      devTools: is.dev ? true : false
    }
  })

  if (!is.dev) {
    window.setMenu(null)
    window.setMenuBarVisibility(false)
  }

  if (!app.isPackaged && process.env['ELECTRON_RENDERER_URL']) {
    window.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    window.loadFile(join(__dirname, '../renderer/index.html'))
  }

  window.on('ready-to-show', () => {
    !isAutoLaunch && toggleWindowVisibility(window, true)
  })

  ipcMain.on('minimize-window', () => {
    const win = BrowserWindow.getFocusedWindow()
    if (win) win.minimize()
  })

  ipcMain.on('maximize-window', () => {
    const win = BrowserWindow.getFocusedWindow()
    if (win) {
      if (win.isMaximized()) {
        win.unmaximize()
      } else {
        win.maximize()
      }
    }
  })

  ipcMain.on('close-window', () => {
    const win = BrowserWindow.getFocusedWindow()
    if (win) win.hide()
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

import { is } from '@electron-toolkit/utils'


import { app, BrowserWindow, nativeImage } from 'electron'
import { join } from 'node:path'

import icon from '../../../build/icon512.png?asset'

export const createWindow = (): BrowserWindow => {
  const window = new BrowserWindow({
    minWidth: 767,
    minHeight: 650,
    width: 1280,
    height: 800,
    center: true,
    show: false,
    titleBarStyle: 'hidden',
    autoHideMenuBar: is.dev ? false : true,
    minimizable: true,
    maximizable: true,
    transparent: true,
    frame: false,
    hasShadow: false,
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
    window.setSkipTaskbar(false)
  }

  if (!app.isPackaged && process.env['ELECTRON_RENDERER_URL']) {
    window.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    window.loadFile(join(__dirname, '../renderer/index.html'))
  }

  

  return window
}

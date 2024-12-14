import { is } from '@electron-toolkit/utils'

import { app, BrowserWindow, nativeImage } from 'electron'
import { join } from 'node:path'

import icon from '../../../build/window-256x256.ico?asset'

export const createWindow = (): BrowserWindow => {
  const window = new BrowserWindow({
    icon: nativeImage.createFromPath(icon),
    minWidth: 768,
    minHeight: 650,
    width: 1280,
    height: 800,
    center: true,
    show: false,
    titleBarStyle: 'hidden',
    autoHideMenuBar: is.dev ? false : true,
    minimizable: true,
    maximizable: true,
    frame: false,
    trafficLightPosition: {
      x: 16,
      y: 10
    },
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

  window.flashFrame(true)
  // window.setOverlayIcon(nativeImage.createFromPath(icon16), 'Harmonify')

  // if (!is.dev) {
  //   window.setMenu(null)
  //   window.setMenuBarVisibility(false)
  //   window.setSkipTaskbar(false)
  // }

  

  if (!app.isPackaged && process.env['ELECTRON_RENDERER_URL']) {
    window.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    window.loadFile(join(__dirname, '../renderer/index.html'))
  }

  return window
}

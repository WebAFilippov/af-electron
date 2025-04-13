import { is } from '@electron-toolkit/utils'

import { app, BrowserWindow, Menu, nativeImage } from 'electron'
import { join } from 'node:path'

import { configureTheme } from '@utils/window-theme'

import { Theme } from '@shared/types'

import appIcon from '../../../build/icon.ico?asset'

export const createWindow = (theme: Theme): BrowserWindow => {
  const window = new BrowserWindow({
    icon: nativeImage.createFromPath(appIcon),
    minWidth: 768,
    minHeight: 650,
    width: 1280,
    height: 800,
    center: true,
    show: false,
    resizable: true,
    focusable: true,
    fullscreen: false,
    title: 'Effectory',
    titleBarStyle: 'hidden',
    autoHideMenuBar: false,
    minimizable: true,
    maximizable: true,
    fullscreenable: true,
    frame: false,
    trafficLightPosition: {
      x: 5,
      y: 5
    },
    webPreferences: {
      preload: join(__dirname, '..', 'preload', 'index.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      plugins: false,
      devTools: is.dev
    }
  })

  window.flashFrame(false)
  window.setOverlayIcon(nativeImage.createFromPath(appIcon), 'Effectory')

  configureTheme(window, theme)

  if (is.dev) window.webContents.openDevTools()
  if (!is.dev) {
    Menu.setApplicationMenu(null)
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

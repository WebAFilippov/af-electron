import { is } from '@electron-toolkit/utils'

import { app, BrowserWindow, nativeImage } from 'electron'
import { join } from 'node:path'

import { configureTheme } from '@utils/window-theme'

import { Theme } from '@main/shared/types'

import appIcon from '../../../build/icon.ico?asset'
import { ThemeColorBackground } from '../shared'

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
    backgroundColor: theme === 'dark' ? ThemeColorBackground.DARK : ThemeColorBackground.LIGHT,
    titleBarStyle: 'hidden',
    autoHideMenuBar: true,
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
      backgroundThrottling: false,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      allowRunningInsecureContent: false,
      plugins: false,
      webgl: true,
      enablePreferredSizeMode: true, 
      devTools: is.dev
    }
  })

  window.setOverlayIcon(nativeImage.createFromPath(appIcon), 'Effectory')
  window.flashFrame(false)

  app.commandLine.appendSwitch('enable-gpu-rasterization')
  app.commandLine.appendSwitch('enable-accelerated-2d-canvas')
  app.commandLine.appendSwitch('enable-zero-copy')
  // app.commandLine.appendSwitch('disable-renderer-backgrounding')
  app.commandLine.appendSwitch('disable-features', 'CrossSiteDocumentBlockingIfIsolating')
  app.commandLine.appendSwitch('disable-pinch')
  app.commandLine.appendSwitch('enable-overlay-scrollbars')

  configureTheme(window, theme)

  if (is.dev) window.webContents.openDevTools()
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

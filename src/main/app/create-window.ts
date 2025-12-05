import appIcon from '../../../build/icon.ico?asset'
import { programService } from '@database/services/program.service'
import { is } from '@electron-toolkit/utils'
import { configureTheme } from '@utils/window-theme'
import { app, BrowserWindow, Menu, nativeImage, screen } from 'electron'
import { join } from 'node:path'

export const createWindow = async (): Promise<BrowserWindow> => {
  const {
    bounds: { width, height }
  } = screen.getPrimaryDisplay()

  const window = new BrowserWindow({
    icon: nativeImage.createFromPath(appIcon),
    minWidth: width / 2,
    minHeight: height / 2,
    width:  width * 0.75,
    height: height * 0.75,
    center: true,
    show: false,
    resizable: true,
    focusable: true,
    fullscreen: false,
    title: 'AFLED Controller',
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
      devTools: true
    }
  })

  window.flashFrame(false)
  window.setOverlayIcon(nativeImage.createFromPath(appIcon), 'AFLED Controller')

  // Настройка темы окна приложения
  const { theme } = await programService.getProgram()
  configureTheme(window, theme)

  if (is.dev) window.webContents.openDevTools()
  // window.webContents.openDevTools()

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

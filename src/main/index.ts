import { app, shell, BrowserWindow, Tray, Menu } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { join } from 'path'
import icon from '../../resources/icon512.png?asset'
import { Logger } from '@libs/logger'

Logger.setupLogger()
const log = new Logger('main')
log.info('======= Electron application starting =======')

const gotTheLock = app.requestSingleInstanceLock()
let tray: Tray | null = null
let mainWindow: BrowserWindow | null

function createWindow(isAutoLaunch = false): void {
  mainWindow = new BrowserWindow({
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
    show: !isAutoLaunch, // Скрыть окно, если автозапуск
    autoHideMenuBar: true,
    icon: join(icon),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      allowRunningInsecureContent: false,
      plugins: false,
      devTools: is.dev
    }
  })

  if (!is.dev) {
    mainWindow.setMenu(null)
    mainWindow.setMenuBarVisibility(false)
  }

  mainWindow.on('ready-to-show', () => {
    if (mainWindow && !isAutoLaunch) {
      mainWindow.show()
    }
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  log.info('App started!')
}

function enableAutoLaunch(enable: boolean) {
  app.setLoginItemSettings({
    openAtLogin: enable,
    args: enable ? ['--auto-launch'] : [] // Добавить аргумент для автозапуска
  })
}

app.whenReady().then(() => {
  enableAutoLaunch(true)
  electronApp.setAppUserModelId('com.harmonify.app')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // Создаем трей (значок в панели задач)
  tray = new Tray(join(icon))
  tray.setToolTip('Harmonify')
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: 'Показать/Скрыть',
        click: () => {
          if (mainWindow) {
            mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
          }
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'future funcion',
        enabled: false,
        click() {}
      },
      {
        label: 'New Window',
        accelerator: 'CmdOrCtrl+N',
        click: () => {
          const win = new BrowserWindow({ width: 800, height: 600 })
          win.loadURL('https://github.com/WebAFilippov')
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Выход',
        role: 'quit',
        click: () => app.quit()
      }
    ])
  )
  tray.on('click', () => {
    toggleWindowState(mainWindow)
  })
  tray.on('double-click', () => {
    toggleWindowState(mainWindow)
  })

  const isAutoLaunch = process.argv.includes('--auto-launch')
  createWindow(isAutoLaunch)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow(false)
    } else if (mainWindow) {
      mainWindow.show()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

if (gotTheLock) {
  app.on('second-instance', () => {
    const [window] = BrowserWindow.getAllWindows()
    if (window) {
      window.show()
      window.restore()
      log.info('Restore window')
      log.info('Show window')
    }
  })
} else {
  app.quit()
}

const toggleWindowState = (window) => {
  if (window.isMinimized()) {
    window.restore()
  } else {
    window.minimize()
  }
}

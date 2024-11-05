import { app, BrowserWindow, Menu, nativeImage, Tray } from 'electron'

import { Logger } from './libs/logger'
import { createWindow, toggleWindowState, toggleWindowVisibility } from './libs/create-window'
import { autoLaunch } from './libs/auto-launch'
import icon from '../../build/icon512.png?asset'

Logger.setupLogger()
autoLaunch(true)
const isAutoLaunch = process.argv.includes('--auto-launch')

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    const [window] = BrowserWindow.getAllWindows()
    if (window) {
      if (window.isMinimized()) {
        window.restore()
      }
      if (!window.isVisible()) {
        toggleWindowVisibility(window, true)
      }
      window.focus()
    }
  })

  app.whenReady().then(() => {
    const window = createWindow(isAutoLaunch)

    const tray = new Tray(nativeImage.createFromPath(icon))
    tray.setToolTip('Harmonify')
    tray.setContextMenu(
      Menu.buildFromTemplate([
        {
          label: 'Показать/Скрыть',
          click: () => {
            if (window) {
              window.isVisible() ? window.hide() : window.show()
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
          role: 'quit'
        }
      ])
    )
    tray.on('click', () => {
      toggleWindowState(window)
    })
    tray.on('double-click', () => {
      toggleWindowState(window)
    })
  })
}

// ipcMain.handle('theme:apply', (_, theme) => {
//   console.log(theme)
//   if (theme === 'system') {
//     nativeTheme.themeSource = 'system'
//   } else {
//     nativeTheme.themeSource = theme
//   }
//   return nativeTheme.shouldUseDarkColors
// })

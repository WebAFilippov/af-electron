import { app, BrowserWindow, Menu, Tray } from 'electron'

import { Logger } from './libs/logger'
import { createWindow, toggleWindowState, toggleWindowVisibility } from './libs/create-window'
import { autoLaunch } from './libs/auto-launch'
import { join } from 'node:path'
import icon from '../../resources/icon512.png?asset'
import { optimizer } from '@electron-toolkit/utils'

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
      toggleWindowVisibility(window, true)
    }
  })

  app.whenReady().then(() => {
    const window = createWindow(isAutoLaunch)
    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })

    const tray = new Tray(join(icon))
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

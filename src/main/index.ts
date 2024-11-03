import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'

import { Logger } from './libs/logger'
import { createWindow, toggleWindowVisibility } from './libs/create-window'
import { checkSingleInstance } from './libs/single-incstance'
import { autoLaunch } from './libs/auto-launch'

const isAutoLaunch = process.argv.includes('--auto-launch')
Logger.setupLogger()
checkSingleInstance()
autoLaunch(true)

app.whenReady().then(() => {
  const window = createWindow(isAutoLaunch)
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow(false)
    } else if (window) {
      window.show()
    }
  })
})



// app.whenReady().then(() => {
// electronApp.setAppUserModelId('com.harmonify.app')
// app.on('browser-window-created', (_, window) => {
//   optimizer.watchWindowShortcuts(window)
// })
// // Создаем трей (значок в панели задач)
// tray = new Tray(join(icon))
// tray.setToolTip('Harmonify')
// tray.setContextMenu(
//   Menu.buildFromTemplate([
//     {
//       label: 'Показать/Скрыть',
//       click: () => {
//         if (mainWindow) {
//           mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
//         }
//       }
//     },
//     {
//       type: 'separator'
//     },
//     {
//       label: 'future funcion',
//       enabled: false,
//       click() {}
//     },
//     {
//       label: 'New Window',
//       accelerator: 'CmdOrCtrl+N',
//       click: () => {
//         const win = new BrowserWindow({ width: 800, height: 600 })
//         win.loadURL('https://github.com/WebAFilippov')
//       }
//     },
//     {
//       type: 'separator'
//     },
//     {
//       label: 'Выход',
//       role: 'quit',
//       click: () => app.quit()
//     }
//   ])
// )
// tray.on('click', () => {
//   toggleWindowState(mainWindow)
// })
// tray.on('double-click', () => {
//   toggleWindowState(mainWindow)
// })
// createWindow(isAutoLaunch)
// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow(false)
//   } else if (mainWindow) {
//     mainWindow.show()
//   }
// })
// })

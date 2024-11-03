// import { BrowserWindow } from 'electron'
// import { join } from 'node:path'

// export const createWindow = (): BrowserWindow => {
//   const window = new BrowserWindow({
//     backgroundColor: '#00000000',
//     width: 900,
//     height: 670,
//     show: false,
//     // frame: false,
//     autoHideMenuBar: true,
//     hasShadow: true,
//     thickFrame: true,
//     roundedCorners: true,
//     icon: join(),
//     webPreferences: {
//       preload: join(__dirname, '../preload/index.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//       sandbox: false,
//       allowRunningInsecureContent: false,
//       plugins: false,
//       devTools: process.env.NODE_ENV !== 'production' ? true : false
//     }
//   })

//   // Отключаю полностью MenuBar
//   mainWindow.setMenu(null)
//   mainWindow.setMenuBarVisibility(false)

//   mainWindow.on('ready-to-show', () => {
//     if (mainWindow) {
//       mainWindow.show()
//     }
//   })

//   mainWindow.webContents.setWindowOpenHandler((details) => {
//     shell.openExternal(details.url)
//     return { action: 'deny' }
//   })

//   if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
//     mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
//   } else {
//     mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
//   }
//   log.info('App started!')

//   return window
// }

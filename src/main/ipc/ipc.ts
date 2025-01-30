import { BrowserWindow, ipcMain, shell } from 'electron'

export const IPCHandlers = (window: BrowserWindow) => {
  ipcMain.on('v1/window/minimaze', () => {
    if (window) window.minimize()
  })

  ipcMain.on('v1/window/maximize', () => {
    if (window) {
      if (window.isMaximized()) {
        window.unmaximize()
      } else {
        window.maximize()
      }
    }
  })

  ipcMain.on('v1/window/close', () => {
    if (window) {
      window.hide()
    }
  })

  ipcMain.on('v1/external/open', (_event, url: string) => {
    shell.openExternal(url)
  })

  ipcMain.handle('v1/window/get_width', () => {
    const { width } = window.getBounds()

    return width
  })

  window.on('resize', () => {
    const { width } = window.getBounds()

    window.webContents.send('v1/window/window_resize', width)
  })
}

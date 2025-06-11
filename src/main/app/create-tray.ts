import appIcon from '../../../build/icon.ico?asset'
import { app, BrowserWindow, Menu, nativeImage, Tray } from 'electron'
import { type AppUpdater } from 'electron-updater'

const toggleWindowVisibility = (window: BrowserWindow | null) => {
  if (!window) return

  if (window.isVisible()) {
    window.hide()
  } else {
    if (window.isMinimized()) {
      window.restore()
    }
    window.show()
  }
}

export const createTray = (window: BrowserWindow, updater: AppUpdater) => {
  const tray = new Tray(nativeImage.createFromPath(appIcon))

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Развернуть/свернуть',
      click: () => toggleWindowVisibility(window)
    },
    { type: 'separator' },
    {
      label: 'Выход',
      click: () => {
        if (updater && updater.autoInstallOnAppQuit) {
          updater.quitAndInstall()
        } else {
          app.quit()
        }
      }
    }
  ])

  tray.setToolTip('Effectory')
  tray.setTitle('Effectory')
  tray.setContextMenu(contextMenu)

  tray.on('click', () => {
    toggleWindowVisibility(window)
  })

  tray.on('double-click', () => {
    toggleWindowVisibility(window)
  })

  tray.on('right-click', () => {
    tray.popUpContextMenu(contextMenu)
  })

  return tray
}

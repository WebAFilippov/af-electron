import { BrowserWindow, Menu, nativeImage, Tray } from 'electron'

import icon from '../../../build/tray-48x48.png?asset'

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

export const createTray = (window: BrowserWindow) => {
  const tray = new Tray(nativeImage.createFromPath(icon))

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Развернуть/свернуть',
      click: () => toggleWindowVisibility(window)
    },
    { type: 'separator' },
    {
      label: 'Выход',
      role: 'quit'
    }
  ])

  tray.setToolTip('Harmonify')
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

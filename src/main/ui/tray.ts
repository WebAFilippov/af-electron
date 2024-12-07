import { BrowserWindow, Menu, nativeImage, Tray } from 'electron'

import { toggleWindowState } from '@utils/window-utils'

import icon from '../../../build/tray-48x48.png?asset'

export const createTray = (window: BrowserWindow) => {
  const tray = new Tray(nativeImage.createFromPath(icon))
  tray.setToolTip('Harmonify')
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: 'Развернуть/свернуть',
        click: () => {
          if (window) {
            if (window.isVisible()) window.hide()
            else window.show()
          }
        }
      },
      { type: 'separator' },
      {
        label: 'Выход',
        role: 'quit'
      }
    ])
  )
  tray.on('click', () => {
    // toggleWindowVisibility(window, store, true)
    toggleWindowState(window)
  })
  tray.on('double-click', () => {
    toggleWindowState(window)
    // toggleWindowVisibility(window, store, true)
  })

  return tray
}

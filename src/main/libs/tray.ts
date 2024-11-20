import { BrowserWindow, Menu, nativeImage, Tray } from 'electron'
import icon from '../../../build/icon512.png?asset'

import { IState } from '../types'
import { Low } from 'lowdb/lib'
import { toggleWindowState } from './helpers/window-control-helpers'

export const createTray = (window: BrowserWindow, _store: Low<IState>) => {
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

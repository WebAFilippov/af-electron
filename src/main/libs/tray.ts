import { BrowserWindow, Menu, nativeImage, Tray } from 'electron'
import icon from '../../../build/icon512.png?asset'
import { toggleWindowState } from './helpers/window-control-helpers'

export const createTray = (window: BrowserWindow) => {
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
      { type: 'separator' },
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
}

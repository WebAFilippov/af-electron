import { BrowserWindow } from "electron"

export const toggleWindowVisibility = (window: BrowserWindow, isVisible: boolean) => {
  if (isVisible) {
    window.show()
  } else {
    window.hide()
  }
}

export const toggleWindowState = (window: BrowserWindow) => {
  if (window.isMinimized()) {
    window.restore()
  } else {
    window.minimize()
  }
}

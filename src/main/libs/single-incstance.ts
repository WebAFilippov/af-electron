import { app, BrowserWindow } from 'electron'
import { Logger } from './logger'
import { toggleWindowVisibility } from './create-window'

const log = new Logger('single-instance')

const isFirstInstance = app.requestSingleInstanceLock()
export const checkSingleInstance = () => {
  if (isFirstInstance) {
    app.on('second-instance', () => {
      const [window] = BrowserWindow.getAllWindows()
      if (window) {
        if (window.isMinimized()) {
          window.restore()
          log.log('Restore window')
        }

        toggleWindowVisibility(window, true)
        log.log('Show window')
      }
    })
  } else {
    app.quit()
  }
}

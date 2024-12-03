// import { AudioDeviceMonitor, AudioMonitorOptions } from 'af-win-audio'
import { BrowserWindow, ipcMain } from 'electron'

import { Logger } from '@utils/logger'

// import { AudioDeviceMonitor, AudioMonitorOptions } from '@libs/audio-monitor'

const log = new Logger('control-window')

export const windowHandlers = (window: BrowserWindow, isAutoLaunch: boolean) => {
  // const options: AudioMonitorOptions = {
  //   autoStart: false,
  //   delay: 100,
  //   step: 1
  // }
  // const AudioMonitor = new AudioDeviceMonitor(options)

  // AudioMonitor.on('change', (device) => {
  //   window.webContents.send('send-device-data', device)
  // })

  ipcMain.handleOnce('start-window', () => {
    // AudioMonitor.start()
    if (!isAutoLaunch) {
      window.show()
      log.info('Window is shown')
      return 'Window is shown'
    } else {
      log.info('Window is not shown')
      return 'Window is not shown'
    }
  })

  ipcMain.on('minimize-window', () => {
    if (window) window.minimize()
  })

  ipcMain.on('maximize-window', () => {
    if (window) {
      if (window.isMaximized()) {
        window.unmaximize()
      } else {
        window.maximize()
      }
    }
  })

  ipcMain.on('close-window', async () => {
    if (window) {
      window.hide()
    }
  })
}

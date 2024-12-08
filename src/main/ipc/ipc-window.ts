import { BrowserWindow, ipcMain } from 'electron'

import { Logger } from '@utils/logger'

import { citiesForWeatherService } from '@services/cities-for-weather.service'

const log = new Logger('control-window')

export const windowHandlers = (window: BrowserWindow, isAutoLaunch: boolean) => {
  ipcMain.handleOnce('start-window', async () => {
    const cities = await citiesForWeatherService.getAllCitiesForWeatherWithCity()

    console.log(cities)

    if (!isAutoLaunch) {
      window.show()
      log.info('Window is shown')
      return cities
    } else {
      log.info('Window is not shown')
      return cities
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

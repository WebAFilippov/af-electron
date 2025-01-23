import { BrowserWindow, ipcMain } from 'electron'

import { Logger } from '@utils/logger'

import { applicationService } from '@services/Application.service'
import { cityService } from '@services/City.service'
import { cityInfoService } from '@services/CityInfo.service'

const log = new Logger('data-handlers')

export const dataHandlers = (window: BrowserWindow, isAutoLaunch: boolean) => {
  // Application
  ipcMain.handle('v1/startApp', async () => {
    const responseForApplication = await applicationService.getApplication()
    const responseForCityForWeather = await cityService.getCitiesWithInfo()

    const response = {
      storeCity: responseForCityForWeather,
      storeApplication: responseForApplication
    }

    if (!isAutoLaunch) {
      window.show()
      log.info('Application started. Window showed')
      return response
    } else {
      log.info('Application started. Window is not shown')
      return response
    }
  })

  ipcMain.handle('v1/application/getall', async () => {
    const response = await applicationService.getApplication()
    return response
  })

  ipcMain.handle('v1/application/update_application', async (_event, field, value) => {
    const response = await applicationService.updateApplicationField(field, value)
    return response
  })

  ipcMain.handle('v1/application/check_connection', async () => {
    const response = await applicationService.isHostReachable()
    return response
  })

  // City
  ipcMain.handle('v1/cityInfo/search', async (_event, optionsQuery) => {
    const cities = await cityInfoService.getCitiesBySearchParams(optionsQuery)
    return cities
  })

  ipcMain.handle('v1/city/default', async (_event, id) => {
    const response = await cityService.setDefaultCity(id)
    return response
  })

  ipcMain.handle('v1/city/create', async (_event, cityId) => {
    const response = await cityService.createCityWithInfo(cityId)
    return response
  })
}

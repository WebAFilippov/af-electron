import { BrowserWindow, ipcMain } from 'electron'

import { Logger } from '@utils/logger'

import { applicationService } from '@services/application.service'
import { cityService } from '@services/city.service'
import { cityInfoService } from '@services/cityInfo.service'

const log = new Logger('data-handlers')

export const dataHandlers = (window: BrowserWindow, isAutoLaunch: boolean) => {
  // Application
  ipcMain.handle('v1/application/start', async () => {
    const responseForApplication = await applicationService.getApplication()
    const responseForCityForWeather = await cityService.getCitiesWithInfo()

    const response = {
      storeCityForWeather: responseForCityForWeather,
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

  ipcMain.handle('v1/application/update_openweathermap_apikey', async (_event, field, value) => {
    const response = await applicationService.updateApplication(field, value)
    return response
  })

  // City
  ipcMain.handle('city::searchCityLimitOrder', async (_event, optionsQuery) => {
    const cities = await cityInfoService.findCitiesByQuery(optionsQuery)
    return cities
  })

  // CityForWeather
  // ipcMain.handle('v1/city_for_weather/getAll', async () => {
  //   const response = await cityForWeatherService.getAllCityForWeather()
  //   return response
  // })

  ipcMain.handle('v1/city_for_weather/default', async (_event, id) => {
    const response = await cityService.setDefaultCity(id)
    return response
  })

  ipcMain.handle('v1/city_for_weather/create', async (_event, cityId) => {
    const response = await cityService.createCityWithInfo(cityId)
    return response
  })

  // ipcMain.handle('v1/city_for_weather/get_weather', async () => {
  //   const response = await cityForWeatherService.getWeathersForCitites()
  //   return response
  // })
}

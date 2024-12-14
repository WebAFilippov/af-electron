import { BrowserWindow, ipcMain } from 'electron'

import { getWeatherForAllCities } from '@utils/fetch-openweathermap'
import { Logger } from '@utils/logger'

import { applicationService } from '@services/application.service'
import { cityForWeatherService } from '@services/cities-for-weather.service'
import { cityService } from '@services/city.service'

const log = new Logger('data-handlers')

export const dataHandlers = (window: BrowserWindow, isAutoLaunch: boolean) => {
  // Application
  ipcMain.handle('v1/application/start', async () => {
    const responseForApplication = await applicationService.getApplicationSettings()
    const responseForCityForWeather = await cityForWeatherService.getAllCityForWeather()

    const resp = await getWeatherForAllCities()

    const response = {
      storeCityForWeather: responseForCityForWeather,
      storeApplication: responseForApplication,
      resp
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
    const response = await applicationService.getApplicationSettings()
    return response
  })

  ipcMain.handle('v1/application/update_openweathermap_apikey', async (_event, value) => {
    const response = await applicationService.updateOpenWeatherMapApiKey(value)
    return response
  })

  // City
  ipcMain.handle('city::searchCityLimitOrder', async (_event, optionsQuery) => {
    const cities = await cityService.searchCitiesLimitOrder(optionsQuery)
    return cities
  })

  // CityForWeather
  ipcMain.handle('v1/city_for_weather/getAll', async () => {
    const response = await cityForWeatherService.getAllCityForWeather()
    return response
  })

  ipcMain.handle('v1/city_for_weather/default', async (_event, args) => {
    const response = await cityForWeatherService.updateCityForWeatherByIsDefault(args)
    return response
  })

  ipcMain.handle('v1/city_for_weather/get_weather', async () => {
    const { openweathermap_apikey } = await applicationService.getApplicationSettings()
    const responseForCityForWeather = await cityForWeatherService.getAllCityForWeather()
  })
}

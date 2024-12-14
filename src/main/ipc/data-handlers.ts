import { ipcMain } from 'electron'

import { applicationService } from '@services/application.service'
import { cityForWeatherService } from '@services/cities-for-weather.service'
import { cityService } from '@services/city.service'

export const dataHandlers = () => {
  // Application
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
}

import { ipcMain } from 'electron'

import { cityForWeatherService } from '@services/cities-for-weather.service'
import { cityService } from '@services/city.service'

export const dataHandlers = () => {
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

  ipcMain.handle('v1/city_for_weather/update', async (_event, args) => {
    const response = await cityForWeatherService.updateCityForWeatherByIsSelected(args)
    return response
  })
}

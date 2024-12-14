import { TCityForWeatherWithCityInfo } from '@models/city-for-weather.model'

import { cityForWeatherRepository } from '@repositories/city-for-weather.repository'
import { cityRepository } from '@repositories/city.repository'

class CityForWeatherService {
  // async getAllCityForWeather() {
  //   const cities = await cityForWeatherRepository.findAll()

  //   return cities
  // }

  async updateCityForWeatherByIsDefault(id: number) {
    const response = await cityForWeatherRepository.updateIsDefaultForId(id)

    return response
  }

  async getAllCityForWeatherWithCityInfo(): Promise<TCityForWeatherWithCityInfo[]> {
    const cities = await cityForWeatherRepository.getAll()
    const CityWithCityInfo = await Promise.allSettled(
      cities.map(async (item) => {
        const City = await cityRepository.findById(item.id)
        return {
          ...item,
          cityInfo: City
        }
      })
    )

    const fulfilledResults = CityWithCityInfo.filter((result) => result.status === 'fulfilled').map(
      (result) => result.value
    )

    return fulfilledResults
  }
  // const weatherResults = await Promise.all(
  //   response.map(async (city) => {

  //     if (!city || !longitude || !apikey) throw new Error('Неверный параметры')
  //     const weather = await getWeatherByCoordinates(latitude, longitude, apikey)
  //     return {

  //     }
  //   })
  // )

  // return weatherResults

  // async addCityForWeather(cityId: number) {
  //   const response = await cityForWeatherRepository.addCity(cityId)

  //   return response
  // }
}

export const cityForWeatherService = new CityForWeatherService()

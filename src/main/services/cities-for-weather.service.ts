import { TCityForWeatherWithCityInfo } from '@models/city'

import { cityForWeatherRepository } from '@repositories/city-for-weather.repository'

class CityForWeatherService {
  async updateCityForWeatherByIsDefault(id: number) {
    const response = await cityForWeatherRepository.updateIsDefaultForId(id)

    return response
  }

  async getAllCityForWeatherWithCityInfo(): Promise<TCityForWeatherWithCityInfo[]> {
    const response = await cityForWeatherRepository.getAllWithCityInfo()
    return response
  }

  async createCityForWeatherWithCityInfo(cityId: number): Promise<TCityForWeatherWithCityInfo> {
    const response = await cityForWeatherRepository.createCityForWeatherByCityId(cityId)
    return response
  }
}

export const cityForWeatherService = new CityForWeatherService()

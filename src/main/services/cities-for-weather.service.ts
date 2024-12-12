import { cityForWeatherRepository } from '@repositories/city-for-weather.repository'

class CityForWeatherService {
  async getAllCityForWeather() {
    const cities = await cityForWeatherRepository.findAll()

    return cities
  }

  async updateCityForWeatherByIsSelected(id: number) {
    const response = await cityForWeatherRepository.updateSelectedForId(id)

    return response
  }

  // async addCityForWeather(cityId: number) {
  //   const response = await cityForWeatherRepository.addCity(cityId)

  //   return response
  // }
}

export const cityForWeatherService = new CityForWeatherService()

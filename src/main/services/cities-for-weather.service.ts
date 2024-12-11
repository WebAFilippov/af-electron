import { cityForWeatherRepository } from '@repositories/cities-for-weather.repository'

class CitiesForWeatherService {
  async getAllCitiesForWeatherWithCity() {
    const cities = await cityForWeatherRepository.findAll()

    return cities
  }
}

export const citiesForWeatherService = new CitiesForWeatherService()

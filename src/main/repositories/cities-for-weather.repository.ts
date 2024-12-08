import CitiesForWeather from '@models/cities-for-weather.model'

class CitiesForWeatherRepository {
  async findAll(): Promise<CitiesForWeather[]> {
    return await CitiesForWeather.findAll()
  }
}

export const cityForWeatherRepository = new CitiesForWeatherRepository()

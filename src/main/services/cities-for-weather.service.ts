import CitiesForWeather from '@models/cities-for-weather.model'
import City from '@models/city.model'

class CitiesForWeatherService {
  async getAllCitiesForWeatherWithCity() {
    const cities = await CitiesForWeather.findAll({
      include: {
        model: City,
        as: 'city'
      },
      raw: true,
      nest: true
    })

    return cities
  }
}

export const citiesForWeatherService = new CitiesForWeatherService()

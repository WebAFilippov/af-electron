import { cityRepository } from '@repositories/city-repository'

class CityService {
  async getCityById(id: string) {
    const city = await cityRepository.findById(id)
    if (!city) throw new Error('Город не найден')
    return city
  }

  async searchCitiesLimitOrder(lower_city: string, limit?: number, order?: 'DESC' | 'ASC') {
    const cities = await cityRepository.findByCityLimitOrder(lower_city, limit, order)
    if (cities.length === 0) throw new Error('Город не найден')
    return cities.map((city) => city.dataValues)
  }
}

export const cityService = new CityService()

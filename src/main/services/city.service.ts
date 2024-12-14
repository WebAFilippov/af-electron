import City from '@models/city.model'

import { cityRepository } from '@repositories/city.repository'

class CityService {
  async getCityById(id: string) {
    const city = await cityRepository.findById(id)
    if (!city) throw new Error('Город не найден')
    return city
  }

  async searchCitiesLimitOrder(optionsQuery: {
    query: string
    limit?: number
    ordering?: 'DESC' | 'ASC'
  }): Promise<City[]> {
    const cities = await cityRepository.findByCityLimitOrder(
      optionsQuery.query,
      optionsQuery.limit,
      optionsQuery.ordering
    )

    return cities
  }
}

export const cityService = new CityService()

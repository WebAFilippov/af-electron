import { TCity } from '@models/cityInfo'

import { cityRepository } from '@repositories/city.repository'

class CityService {
  async getCityById(id: number) {
    const city = await cityRepository.findById(id)
    return city
  }

  async searchCitiesLimitOrder(optionsQuery: {
    query: string
    limit?: number
    ordering?: 'DESC' | 'ASC'
  }): Promise<TCity[]> {
    const cities = await cityRepository.findByCityWithParams(
      optionsQuery.query,
      optionsQuery.limit,
      optionsQuery.ordering
    )

    return cities
  }
}

export const cityService = new CityService()

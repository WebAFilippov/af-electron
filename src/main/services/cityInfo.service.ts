import { ICityInfo } from '@models/cityInfo'

import { cityInfoRepository } from '@repositories/cityInfo.repository'

class CityInfoService {
  async findCityById(id: number): Promise<ICityInfo | null> {
    const city = await cityInfoRepository.findById(id)
    return city
  }

  async findCitiesByQuery({
    query,
    limit,
    ordering
  }: {
    query: string
    limit?: number
    ordering?: 'DESC' | 'ASC'
  }): Promise<ICityInfo[]> {
    const cities = await cityInfoRepository.findCitiesByQueryWithParams({
      query,
      limit,
      ordering
    })

    return cities
  }
}

export const cityInfoService = new CityInfoService()

import { ICityInfo } from '@models/CityInfo.model'

import { cityInfoRepository } from '@repositories/CityInfo.repository'

class CityInfoService {
  async findCityById(id: number): Promise<ICityInfo | null> {
    const city = await cityInfoRepository.getCityById(id)
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
    const cities = await cityInfoRepository.getCitiesBySearchParams({
      query,
      limit,
      ordering
    })

    return cities
  }
}

export const cityInfoService = new CityInfoService()

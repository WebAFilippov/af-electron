import { ICityInfo } from '@models/CityInfo.model'

import { cityInfoRepository } from '@repositories/CityInfo.repository'

class CityInfoService {
  async getCitiesQueryParams(queryParams: {
    query: string
    limit?: number
    ordering?: 'DESC' | 'ASC'
  }): Promise<ICityInfo[]> {
    const { query, limit, ordering } = queryParams

    const cities = await cityInfoRepository.getCitiesQueryParams({
      query,
      limit,
      ordering
    })

    return cities
  }
}

export const cityInfoService = new CityInfoService()

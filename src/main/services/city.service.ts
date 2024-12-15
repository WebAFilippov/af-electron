import { ICityWithCityInfo } from '@models/city'

import { cityRepository } from '@repositories/city.repository'

class CityService {
  async setDefaultCity(id: number) {
    const response = await cityRepository.setDefaultCityById(id)

    return response
  }

  async getCitiesWithInfo(): Promise<ICityWithCityInfo[]> {
    const response = await cityRepository.getCitiesWithInfo()
    return response
  }

  async createCityWithInfo(cityId: number): Promise<ICityWithCityInfo> {
    const response = await cityRepository.createCityByCityId(cityId)
    return response
  }
}

export const cityService = new CityService()

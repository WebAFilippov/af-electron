import { ICity, ICityFull } from '@models/City.model'

import { cityRepository } from '@repositories/City.repository'

class CityService {
  async setDefaultCity(id: number) {
    const response = await cityRepository.setDefaultCity(id)

    return response
  }

  async getCities(): Promise<ICityFull[]> {
    const response = await cityRepository.getCities()
    return response
  }

  async createCity(cityId: number): Promise<ICity> {
    const response = await cityRepository.createCity(cityId)
    return response
  }
}

export const cityService = new CityService()

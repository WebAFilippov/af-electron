import { cityRepository } from '@repositories/city-repository'

class CityService {
  async getCityById(id: string) {
    const city = await cityRepository.findById(id)
    if (!city) throw new Error('Город не найден')
    return city
  }
}

export const cityService = new CityService()

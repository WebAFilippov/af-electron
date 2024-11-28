import City from '@models/city-model'

class CityRepository {
  async findById(id: string): Promise<City | null> {
    return await City.findOne({
      where: {
        id
      }
    })
  }

  async findByCityLimit5OrderPopulation(lower_city_query: string): Promise<City[] | null> {
    return await City.findAll({
      where: {
        lower_city: lower_city_query.toLowerCase()
      },
      limit: 5,
      order: [['lower_city', 'DESC']]
    })
  }
}

export const cityRepository = new CityRepository()

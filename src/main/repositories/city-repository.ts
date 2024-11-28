import { Op } from 'sequelize'

import City from '@models/city-model'

class CityRepository {
  async findById(id: string): Promise<City | null> {
    return await City.findOne({
      where: {
        id
      }
    })
  }

  async findByCityLimitOrder(
    query: string,
    limit: number = 5,
    order: 'DESC' | 'ASC' = 'DESC'
  ): Promise<City[]> {
    return await City.findAll({
      where: {
        lower_city: {
          [Op.like]: `%${query.toLowerCase()}%`
        }
      },
      limit,
      order: [['population', order]]
    })
  }
}

export const cityRepository = new CityRepository()

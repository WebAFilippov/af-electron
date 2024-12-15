import { Op } from 'sequelize'

import City, { TCity } from '@models/cityInfo'

class CityRepository {
  async findById(id: number): Promise<TCity> {
    try {
      const city = await City.findOne({
        where: {
          id
        },
        raw: true
      })

      if (city) {
        return city
      } else {
        throw new Error('City not found')
      }
    } catch (error) {
      throw error
    }
  }

  async findByCityWithParams(
    query: string,
    limit: number = 8,
    ordering: 'DESC' | 'ASC' = 'DESC'
  ): Promise<TCity[]> {
    return await City.findAll({
      where: {
        lower_city: {
          [Op.like]: `%${query.toLowerCase()}%`
        }
      },
      limit,
      order: [['population', ordering]],
      raw: true
    })
  }
}

export const cityRepository = new CityRepository()

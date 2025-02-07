import { Op } from 'sequelize'

import CityInfo, { ICityInfo } from '@models/CityInfo.model'

class CityInfoRepository {
  async getCitiesQueryParams(queryParams: {
    query: string
    limit?: number
    ordering?: 'DESC' | 'ASC'
  }): Promise<ICityInfo[]> {
    const { query, limit = 8, ordering = 'DESC' } = queryParams

    try {
      const cities = await CityInfo.findAll({
        where: {
          lower_city: {
            [Op.like]: `%${query.toLowerCase()}%`
          }
        },
        order: [['population', ordering]],
        limit,
        raw: true
      })

      if (!cities.length)
        throw new Error(
          `Города с названием, содержащим "${query}", не найдены.`
        )

      return cities
    } catch (error) {
      throw error
    }
  }
}

export const cityInfoRepository = new CityInfoRepository()

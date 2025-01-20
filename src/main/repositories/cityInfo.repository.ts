import { Op } from 'sequelize'

import CityInfo, { ICityInfo } from '@models/CityInfo.model'

class CityInfoRepository {
  async getCityById(id: number): Promise<ICityInfo> {
    try {
      const city = await CityInfo.findByPk(id, { raw: true })

      if (!city) {
        throw new Error(`Город с id ${id} не найден.`)
      }

      return city
    } catch (error) {
      throw error
    }
  }

  async getCitiesBySearchParams(searchParams: {
    query: string
    limit?: number
    ordering?: 'DESC' | 'ASC'
  }): Promise<ICityInfo[]> {
    const { query, limit = 8, ordering = 'DESC' } = searchParams

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

      if (!cities.length) {
        throw new Error(`Города с названием, содержащим "${query}", не найдены.`)
      }

      return cities
    } catch (error) {
      throw error
    }
  }
}

export const cityInfoRepository = new CityInfoRepository()

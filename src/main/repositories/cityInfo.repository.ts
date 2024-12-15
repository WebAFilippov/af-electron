import { Op } from 'sequelize'

import { Logger } from '@utils/logger'

import City, { ICityInfo } from '@models/cityInfo'

const log = new Logger('cityInfo.repository')

class CityInfoRepository {
  async findById(id: number): Promise<ICityInfo> {
    try {
      const city = await City.findByPk(id, { raw: true })

      if (!city) {
        log.error(`Город с id ${id} не найден.`)
        throw new Error('Произошла ошибка при получении данных о городе.')
      }

      return city
    } catch (error) {
      log.error(`Ошибка при поиске города с id ${id}: `, error)
      throw new Error('Произошла ошибка при получении данных о городе.')
    }
  }

  async findCitiesByQueryWithParams(optionsQuery: {
    query: string
    limit?: number
    ordering?: 'DESC' | 'ASC'
  }): Promise<ICityInfo[]> {
    const { query, limit = 8, ordering = 'DESC' } = optionsQuery
    try {
      const cities = await City.findAll({
        where: {
          lower_city: {
            [Op.like]: `%${query.toLowerCase()}%`
          }
        },
        limit,
        order: [['population', ordering]],
        raw: true
      })

      if (!cities.length) {
        log.error(`Города, соответствующие запросу "${query}", не найдены.`)
        throw new Error(`Города с названием, содержащим "${query}", не найдены.`)
      }

      return cities
    } catch (error) {
      log.error(`Ошибка при поиске городов по запросу "${query}": `, error)
      throw new Error('Произошла ошибка при поиске городов с указанными параметрами.')
    }
  }
}

export const cityInfoRepository = new CityInfoRepository()

import { Transaction } from 'sequelize'

import { Logger } from '@utils/logger'

import City, { ICityWithCityInfo } from '@models/city'
import CityInfo from '@models/cityInfo'

const log = new Logger('city.repository')

class CityRepository {
  async getCitiesWithInfo(): Promise<ICityWithCityInfo[]> {
    try {
      const citiesWithInfo = (await City.findAll({
        include: {
          model: CityInfo,
          as: 'cityInfo'
        },
        raw: true,
        nest: true
      })) as unknown as ICityWithCityInfo[]

      log.log(
        `Запрос на получение всех городов с информацией о них завершен. Количество записей: ${citiesWithInfo.length}`
      )

      return citiesWithInfo
    } catch (error) {
      log.error('Ошибка при выполнении запроса findAll для городов с информацией:', error)
      throw new Error('Ошибка при получении данных о городах с информацией')
    }
  }

  async setDefaultCityById(targetId: number): Promise<number | null> {
    const transaction: Transaction = await City.sequelize!.transaction()

    try {
      const currentSelected = await City.findOne({
        where: { isDefault: true },
        transaction
      })

      const city = await City.findOne({
        where: { id: targetId },
        transaction
      })

      if (!city) {
        log.error(`Город с ID ${targetId} не найден.`)
        throw new Error(`Город с ID ${targetId} не найден.`)
      }

      if (currentSelected) {
        await currentSelected.update({ isDefault: false }, { transaction })
      }

      await city.update({ isDefault: true }, { transaction })

      const updatedCity = await City.findOne({
        where: { isDefault: true },
        transaction
      })

      await transaction.commit()

      if (updatedCity) {
        log.log(`Выбранная запись после обновления: ID ${updatedCity.id}.`)
        return updatedCity.id
      } else {
        log.log(`Выбор снят.`)
        return null
      }
    } catch (error) {
      await transaction.rollback()
      log.error(`Ошибка при обновлении выбранного города с ID ${targetId}: `, error)
      throw new Error('Ошибка при обновлении города с флагом isDefault.')
    }
  }

  async createCityByCityId(cityId: number): Promise<ICityWithCityInfo> {
    const transaction: Transaction = await City.sequelize!.transaction()

    try {
      const existingCity = await City.findOne({
        where: { cityId },
        transaction
      })

      if (existingCity) {
        log.error(`Город с cityId=${cityId} уже существует.`)
        throw new Error(`Город с cityId=${cityId} уже существует.`)
      }

      const newCity = await City.create(
        {
          cityId,
          isDefault: false
        },
        { transaction }
      )

      const cityWithInfo = await City.findByPk(newCity.id, {
        include: [
          {
            model: CityInfo,
            as: 'cityInfo'
          }
        ],
        transaction
      })

      if (!cityWithInfo) {
        log.error(`Не удалось загрузить созданный город с id=${newCity.id}`)
        throw new Error(`Не удалось загрузить созданный город с id=${newCity.id}`)
      }

      await transaction.commit()

      return cityWithInfo as unknown as ICityWithCityInfo
    } catch (error) {
      await transaction.rollback()
      log.error(`Ошибка при создании города с cityId=${cityId}: `, error)
      throw new Error('Ошибка при создании города с указанным cityId.')
    }
  }
}

export const cityRepository = new CityRepository()

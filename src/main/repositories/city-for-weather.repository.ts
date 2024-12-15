import { Transaction } from 'sequelize'

import { Logger } from '@utils/logger'

import { sequelize } from '@database/database'

import CityForWeather, { TCityForWeatherWithCityInfo } from '@models/city'
import City from '@models/cityInfo'

const log = new Logger('city-for-weather.repository')

class CityForWeatherRepository {
  async getAllWithCityInfo(): Promise<TCityForWeatherWithCityInfo[]> {
    try {
      const AllCityForWeather = (await CityForWeather.findAll({
        include: {
          model: City,
          as: 'cityInfo'
        },
        raw: true,
        nest: true
      })) as unknown as TCityForWeatherWithCityInfo[]

      log.log(
        `Запрос на получение всех записей CityForWeather завершен. Количество записей: ${AllCityForWeather.length}`
      )

      return AllCityForWeather
    } catch (error) {
      log.error('Ошибка при выполнении запроса findAll:', error)
      throw error
    }
  }

  async updateIsDefaultForId(targetId: number): Promise<number | null> {
    const transaction: Transaction = await CityForWeather.sequelize!.transaction()

    try {
      const currentSelected = await CityForWeather.findOne({
        where: { isDefault: true },
        transaction
      })

      const cityForWeather = await CityForWeather.findOne({
        where: { id: targetId },
        transaction
      })

      if (!cityForWeather) {
        log.error(`Запись с ID ${targetId} не найдена.`)
        throw new Error(`CityForWeather with ID ${targetId} not found.`)
      }

      if (currentSelected) {
        await currentSelected.update({ isDefault: false }, { transaction })
      }

      await cityForWeather.update({ isDefault: true }, { transaction })

      const result = await CityForWeather.findOne({
        where: { isDefault: true },
        transaction
      })

      await transaction.commit()

      if (result) {
        log.log(`Выбранная запись после обновления: ID ${result.id}.`)
        return result.id
      } else {
        log.log(`Выбор снят.`)
        return null
      }
    } catch (error) {
      await transaction.rollback()
      log.error(`Ошибка при обновлении выбранной записи`)
      throw error
    }
  }

  async createCityForWeatherByCityId(cityId: number): Promise<TCityForWeatherWithCityInfo> {
    const transaction: Transaction = await CityForWeather.sequelize!.transaction()

    try {
      const existingCityForWeather = await CityForWeather.findOne({
        where: { cityId },
        transaction
      })

      if (existingCityForWeather) {
        log.error(`Запись с cityId=${cityId} уже существует`)
        throw new Error(`Запись с cityId=${cityId} уже существует`)
      }

      const newCityForWeather = await CityForWeather.create(
        {
          cityId,
          isDefault: false
        },
        { transaction }
      )

      const cityForWeatherWithRelations = await CityForWeather.findByPk(newCityForWeather.id, {
        include: [
          {
            model: City,
            as: 'cityInfo'
          }
        ],
        transaction
      })

      if (!cityForWeatherWithRelations) {
        log.error(`Не удалось загрузить созданную запись с id=${newCityForWeather.id}`)
        throw new Error(`Не удалось загрузить созданную запись с id=${newCityForWeather.id}`)
      }

      await transaction.commit()

      return cityForWeatherWithRelations as unknown as TCityForWeatherWithCityInfo
    } catch (error) {
      await transaction.rollback()
      log.error(`Ошибка при создании записи с cityId=${cityId}`, error)
      throw error
    }
  }
}

export const cityForWeatherRepository = new CityForWeatherRepository()

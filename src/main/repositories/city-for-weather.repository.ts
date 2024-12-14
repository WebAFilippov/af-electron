import { Transaction } from 'sequelize'

import { Logger } from '@utils/logger'

import CityForWeather, { TCityForWeather } from '@models/city-for-weather.model'

const log = new Logger('city-for-weather.repository')

class CityForWeatherRepository {
  async getAll(): Promise<TCityForWeather[]> {
    try {
      const AllCityForWeather = await CityForWeather.findAll({ raw: true })
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

  async createCityForWeatherWithCityId(cityId: number): Promise<TCityForWeather> {
    try {
      const existingCityForWeather = await CityForWeather.findOne({ where: { cityId: cityId } })

      if (existingCityForWeather) {
        log.error('Запись с таким cityId уже существует:', existingCityForWeather.toJSON())
        throw new Error('Запись с таким cityId уже существует')
      }

      const cityForWeather = await CityForWeather.create(
        {
          cityId,
          isDefault: false
        },
        { raw: true, nest: true }
      )
      log.log('Запись успешно создана: ', cityForWeather)

      return cityForWeather
    } catch (error) {
      log.error('Ошибка при создании записи в CityForWeather:', error)
      throw error
    }
  }
}

export const cityForWeatherRepository = new CityForWeatherRepository()

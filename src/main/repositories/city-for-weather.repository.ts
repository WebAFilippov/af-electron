import { Transaction } from 'sequelize'

import CityForWeather from '@models/city-for-weather.model'
import City from '@models/city.model'

class CityForWeatherRepository {
  async findAll(): Promise<CityForWeather[]> {
    try {
      const data = await CityForWeather.findAll({
        include: {
          model: City,
          as: 'cityInfo'
        },
        raw: true,
        nest: true
      })

      return data
    } catch (error) {
      throw error
    }
  }

  async updateSelectedForId(targetId: number): Promise<number | null> {
    const transaction: Transaction = await CityForWeather.sequelize!.transaction()

    try {
      const currentSelected = await CityForWeather.findOne({
        where: { isSelected: true },
        transaction
      })

      const cityForWeather = await CityForWeather.findOne({
        where: { id: targetId },
        transaction
      })

      if (!cityForWeather) {
        throw new Error()
      }

      if (currentSelected) {
        await currentSelected.update({ isSelected: false }, { transaction })
      }

      await cityForWeather.update({ isSelected: true }, { transaction })

      const result = await CityForWeather.findOne({
        where: { isSelected: true },
        transaction
      })

      await transaction.commit()
      if (result) {
        return result.id
      } else return null
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  // async addCity(userId: number): Promise<void> {
  //   const count = await CityForWeather.create()
  // }
}

export const cityForWeatherRepository = new CityForWeatherRepository()

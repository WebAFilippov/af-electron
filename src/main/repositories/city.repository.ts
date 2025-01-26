import { Op, Sequelize, Transaction } from 'sequelize'

import City, { ICity, ICityFull } from '@models/City.model'
import CityInfo from '@models/CityInfo.model'

class CityRepository {
  async getCities(): Promise<ICityFull[]> {
    try {
      const cities = await City.findAll({
        include: {
          model: CityInfo,
          as: 'cityInfo'
        },
        order: [['order', 'DESC']],
        raw: true,
        nest: true
      })

      return cities as unknown as ICityFull[]
    } catch (error) {
      throw error
    }
  }

  async setDefaultCity(cityId: number): Promise<ICity> {
    const transaction = await City.sequelize!.transaction()

    try {
      const city = await City.findOne({
        where: { id: cityId },
        transaction
      })

      if (!city) {
        throw new Error(`Город с ID ${cityId} не найден.`)
      }

      await City.update({ default: false }, { where: { default: true }, transaction })

      await City.update({ default: true }, { where: { id: cityId }, transaction })

      const updatedCity = await City.findOne({
        where: { default: true },
        transaction
      })

      if (!updatedCity) {
        throw new Error('Не удалось найти обновленный город по умолчанию.')
      }

      await transaction.commit()

      return updatedCity
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async createCity(cityInfoId: number): Promise<ICity> {
    const transaction: Transaction = await City.sequelize!.transaction()

    try {
      const countCity = await City.count()

      if (countCity >= 10) {
        throw new Error(
          `Максимальное количество городов (10) достигнуто. Невозможно добавить новый город.`
        )
      }

      const existingCity = await City.findOne({
        where: { cityInfoId },
        transaction
      })

      if (existingCity) {
        throw new Error(`Город с ID ${existingCity.id} уже существует.`)
      }

      const maxOrder = await City.max<number | null, City>('order', { raw: true, transaction })
      const newCity = await City.create(
        {
          cityInfoId,
          default: maxOrder === null ? true : false,
          order: maxOrder === null ? 0 : maxOrder + 1
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
        throw new Error(`Не удалось получить созданный город ID ${newCity.id}`)
      }

      await transaction.commit()

      return cityWithInfo
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async deleteCity(cityId: number): Promise<void> {
    const transaction: Transaction = await City.sequelize!.transaction()

    try {
      const city = await City.findByPk(cityId, {
        transaction
      })

      if (!city) {
        throw new Error(`Город с ID ${cityId} не найден.`)
      }

      if (city.default) {
        const newDefaultCity = await City.findOne({
          where: { default: false },
          order: [['order', 'DESC']],
          transaction
        })

        if (newDefaultCity) {
          await City.update({ default: false }, { where: { default: true }, transaction })
          await newDefaultCity.update({ default: true }, { transaction })
        }
      }

      const cityOrder = city.order

      await city.destroy({ transaction })
      await City.update(
        { order: Sequelize.literal('`order` - 1') },
        { where: { order: { [Op.gt]: cityOrder } }, transaction }
      )

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async updateCityOrder(cityId: number, position: number): Promise<void> {
    const transaction: Transaction = await City.sequelize!.transaction()

    try {
      if (position < 0) {
        throw new Error(`Позиция ${position} не может быть меньше 0.`)
      }

      const countCity = await City.count({ transaction })
      if (position > countCity - 1) {
        throw new Error(
          `Позиция ${position} выходит за пределы допустимого диапазона (максимальная позиция: ${countCity - 1}).`
        )
      }

      const city = await City.findByPk(cityId, { transaction, lock: true })
      if (!city) {
        throw new Error(`Город с ID ${cityId} не найден.`)
      }

      const oldPosition = city.order
      //gt больше >
      //lte меньше <=
      if (oldPosition < position) {
        await City.update(
          { order: Sequelize.literal('`order` - 1') },
          { where: { order: { [Op.lte]: position, [Op.gt]: oldPosition } }, transaction }
        )
      } else if (oldPosition > position) {
        await City.update(
          { order: Sequelize.literal('`order` + 1') },
          { where: { order: { [Op.gte]: position, [Op.lt]: oldPosition } }, transaction }
        )
      }

      city.order = position
      await city.save({ transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}

export const cityRepository = new CityRepository()

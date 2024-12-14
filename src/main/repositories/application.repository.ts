import { Logger } from '@utils/logger'

import Application, { ApplicationField, TApplication } from '@models/application.model'

const log = new Logger('application.repository')

class ApplicationRepository {
  async getValueByField(field: ApplicationField): Promise<keyof TApplication> {
    try {
      const model = await Application.findOne({
        attributes: [field]
      })

      if (model) {
        const fieldValue = model.get(field)
        log.info(`Поле "${field}" успешно извлечено. Значение: ${fieldValue}`)
        return fieldValue as keyof TApplication
      } else {
        log.error(`Запись в таблице Application для поля "${field}" не найдена.`)
        throw new Error(`Запись не найдена: поле "${field}" отсутствует.`)
      }
    } catch (error) {
      log.error(`Ошибка при извлечении значения поля "${field}": `, error)
      throw error
    }
  }

  async getAll(): Promise<TApplication> {
    try {
      const model = await Application.findOne({ raw: true })

      if (model) {
        log.info('Данные успешно извлечены из таблицы Application.')
        return model
      } else {
        log.error('Таблица Application пуста или запись не найдена.')
        throw new Error('Запись в таблице Application не найдена.')
      }
    } catch (error) {
      log.error(`Ошибка при извлечении данных из таблицы Application: `, error)
      throw error
    }
  }

  async updateValueForOpenWeatherMapApiKey(value: string) {
    try {
      const [affectedCount] = await Application.update(
        { openweathermap_apikey: value },
        {
          where: { id: 1 }
        }
      )

      if (affectedCount === 0) {
        log.error('Не удалось обновить API-ключ OpenWeatherMap: запись с не найдена.')
        throw new Error('Запись не найдена.')
      }

      log.info(`API-ключ OpenWeatherMap успешно обновлен. Обновлено записей: ${affectedCount}`)
      return affectedCount
    } catch (error: unknown) {
      log.error(`Ошибка при обновлении API-ключа OpenWeatherMap: `, error)
      throw error
    }
  }
}

export const applicationRepository = new ApplicationRepository()

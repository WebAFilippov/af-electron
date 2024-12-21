import { Logger } from '@utils/logger'

import Application, { IApplication } from '@models/application.model'

const log = new Logger('application.repository')

class ApplicationRepository {
  async getValueByField(field: keyof IApplication): Promise<keyof IApplication> {
    try {
      const model = await Application.findOne({
        attributes: [field]
      })

      if (model) {
        const fieldValue = model.get(field)
        log.info(`Поле "${field}" успешно извлечено. Значение: ${fieldValue}`)
        return fieldValue as keyof IApplication
      } else {
        log.error(`Запись в таблице Application для поля "${field}" не найдена.`)
        throw new Error(`Запись не найдена: поле "${field}" отсутствует.`)
      }
    } catch (error) {
      log.error(`Ошибка при извлечении значения поля "${field}": `, error)
      throw error
    }
  }

  async getAll(): Promise<IApplication> {
    try {
      const model = await Application.findOne({ attributes: { exclude: ['id'] }, raw: true })

      if (model) {
        log.info('Данные успешно извлечены из таблицы Application.')
        return model
      } else {
        log.error('Таблица Application пуста или запись не найдена.')
        throw new Error('Запись в таблице Application не найдена.')
      }
    } catch (error) {
      log.error('Ошибка при извлечении данных из таблицы Application: ', error)
      throw error
    }
  }

  async updateApplicationForFieldByValue(
    field: keyof Omit<IApplication, 'id'>,
    value: string
  ): Promise<number> {
    try {
      const updateData = {
        [field]: value
      }

      const [affectedCount] = await Application.update(updateData, {
        where: { id: 1 }
      })

      if (affectedCount === 0) {
        const errorMessage = `Не удалось обновить запись: поле ${field} не найдено или уже имеет такое значение.`
        log.error(errorMessage)
        throw new Error(errorMessage)
      }

      log.info(`Поле ${field} успешно обновлено. Обновлено записей: ${affectedCount}`)
      return affectedCount
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка'
      log.error(`Ошибка при обновлении записи в поле: ${errorMessage}`)
      throw new Error(`Ошибка при обновлении записи в поле ${field}: ${errorMessage}`)
    }
  }
}

export const applicationRepository = new ApplicationRepository()

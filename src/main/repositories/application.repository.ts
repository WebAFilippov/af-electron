import Application, { IApplication } from '@models/Application.model'

class ApplicationRepository {
  /**
   * Получает первую запись из таблицы Application.
   */
  async getApplication(): Promise<IApplication> {
    try {
      const model = await Application.findOne({ raw: true })

      if (!model) {
        throw new Error('Запись в таблице Application не найдена.')
      }

      return model
    } catch (error) {
      throw error
    }
  }

  /**
   * Обновляет указанное поле записи в таблице Application.
   * @param field Поле, которое нужно обновить.
   * @param value Новое значение для поля.
   */
  async updateApplicationField<T extends keyof Omit<IApplication, 'id'>>(
    field: T,
    value: IApplication[T]
  ): Promise<boolean> {
    try {
      if (field === 'OWM_APIKEY' && typeof value != 'string') {
        throw new Error(`Тип значения для поля 'OWM_APIKEY' должен быть 'string', получен ${typeof value}.`)
      }

      const updateData = {
        [field]: value
      }

      const [affectedCount] = await Application.update(updateData, {
        where: { id: 1 }
      })

      if (affectedCount === 0) {
        throw new Error(`Не удалось обновить запись: поле ${field} не найдено или уже имеет такое значение.`)
      }

      return true
    } catch (error) {
      throw error
    }
  }
}

export const applicationRepository = new ApplicationRepository()

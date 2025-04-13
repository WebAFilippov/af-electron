import Application, { ApplicationModel } from '@models/application.model'

class ApplicationRepository {
  async getApplication(): Promise<Omit<ApplicationModel, 'id'>> {
    try {
      const model = await Application.findOne({
        attributes: { exclude: ['id'] },
        raw: true
      })

      if (!model) {
        throw new Error('Запись в таблице Application не найдена.')
      }

      return model
    } catch (error) {
      throw error
    }
  }

  async updateApplicationField<T extends keyof Omit<ApplicationModel, 'id'>>(
    field: T,
    value: ApplicationModel[T]
  ): Promise<boolean> {
    try {
      if ((field === 'version' || field === 'theme') && typeof value != 'string') {
        throw new Error(
          `Тип значения для поля '${field}' должен быть 'string', получен ${typeof value}.`
        )
      }

      const updateData = {
        [field]: value
      }

      const [affectedCount] = await Application.update(updateData, {
        where: { id: 1 }
      })

      if (affectedCount === 0) {
        throw new Error(
          `Не удалось обновить запись: поле ${field} не найдено или уже имеет такое значение.`
        )
      }

      return true
    } catch (error) {
      throw error
    }
  }
}

export const applicationRepository = new ApplicationRepository()

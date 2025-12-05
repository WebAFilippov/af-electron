import Program, { ProgramModel } from '@database/models/program.model'

class ProgramRepository {
  async getApplication(): Promise<Omit<ProgramModel, 'id'>> {
    try {
      const model = await Program.findOne({
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
        raw: true
      })

      if (!model) {
        throw new Error('Запись в таблице Program не найдена.')
      }

      return model
    } catch (error) {
      throw error
    }
  }

  async updateProgramField<T extends keyof Omit<ProgramModel, 'id'>>(
    field: T,
    value: ProgramModel[T]
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

      const [affectedCount] = await Program.update(updateData, {
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

export const programRepository = new ProgramRepository()

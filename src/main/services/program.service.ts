import { ProgramModel } from '@models/program.model'
import { programRepository } from '@repositories/program.repository'

class ProgramService {
  async getProgram(): Promise<Omit<ProgramModel, 'id'>> {
    try {
      return await programRepository.getApplication()
    } catch (error) {
      throw error
    }
  }

  async updateProgramField<T extends keyof Omit<ProgramModel, 'id'>>(
    field: T,
    value: ProgramModel[T]
  ): Promise<boolean> {
    try {
      return await programRepository.updateProgramField(field, value)
    } catch (error) {
      throw error
    }
  }
}

export const programService = new ProgramService()

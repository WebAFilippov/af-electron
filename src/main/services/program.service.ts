import { ProgramModel } from '@models/program.model'
import { programRepository } from '@repositories/program.repository'
import ping from 'ping'

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

  async isHostReachable(host: string): Promise<boolean> {
    try {
      const { alive } = await ping.promise.probe(host)
      return alive
    } catch {
      return false
    }
  }
}

export const programService = new ProgramService()

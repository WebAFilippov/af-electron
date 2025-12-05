import Program, { ProgramModel } from './models/program.model'
import { Logger } from '@utils/logger'
import { app } from 'electron'

const log = new Logger('seed')

export const seedDatabase = async () => {
  try {
    const countApplication = await Program.count()
    
    if (!countApplication) {
      const version = app.getVersion()
      const initialApplication: Omit<ProgramModel, 'id'>[] = [
        {
          theme: 'light',
          version
        }
      ]
      await Program.bulkCreate(initialApplication)
    }
  } catch (error) {
    log.error('Ошибка заполнения базы данных: ', error)
  }
}

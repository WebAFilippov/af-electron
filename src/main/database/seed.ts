import Application, { ApplicationModel } from '@models/program.model'
import { Logger } from '@utils/logger'
import { app } from 'electron'

const log = new Logger('seed')

const seedDatabase = async () => {
  try {
    const countApplication = await Application.count()

    if (!countApplication) {
      const version = app.getVersion()
      const initialApplication: Omit<ApplicationModel, 'id'>[] = [
        {
          theme: 'light',
          version
        }
      ]

      await Application.bulkCreate(initialApplication)
    }
  } catch (error) {
    log.error('Ошибка заполнения базы данных: ', error)
  }
}

export { seedDatabase }

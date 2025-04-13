import { Logger } from '@utils/logger'

import Application, { ApplicationModel } from '@models/application.model'

const log = new Logger('seed')

const seedDatabase = async () => {
  try {
    const countApplication = await Application.count()

    if (!countApplication) {
      const initialApplication: Omit<ApplicationModel, 'id'>[] = [
        {
          theme: 'light',
          version: '0.0.0'
        }
      ]

      await Application.bulkCreate(initialApplication)
    }
  } catch (error) {
    log.error('Ошибка заполнения базы данных: ', error)
  }
}

export { seedDatabase }

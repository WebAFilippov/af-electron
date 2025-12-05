import { is } from '@electron-toolkit/utils'
import { config } from '@shared/config'
import { Logger } from '@utils/logger'
import { Sequelize } from 'sequelize'

const log = new Logger('database')

export const sequelize = new Sequelize({
  database: 'effDB',
  username: 'admin',
  password: 'qwerty',
  dialect: 'sqlite',
  storage: config.databasePath,
  logging: is.dev ? console.log : undefined,
  dialectOptions: {
    charset: 'utf8'
  }
})

export const initDatabase = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: false })
    log.info('Успешное подключение к Базе Данных.')
  } catch (error) {
    log.error('Неудачное подключение к Базе Данных: ', error)
  }
}

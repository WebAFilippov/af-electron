import { Sequelize } from 'sequelize'

import { Logger } from '@services/logger'

import { config } from '@main/shared/config'

const log = new Logger('database')

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: config.databasePath,
  logging: false
})

export const initDatabase = async () => {
  try {
    await sequelize.authenticate()
    log.info('Успешное подключение к Базе Данных')
    await sequelize.sync({ alter: true })
  } catch (error) {
    log.error('Не удается подключиться к базе данных:', error)
  }
}

import { Sequelize } from 'sequelize'

import { Logger } from '@utils/logger'

import { config } from '@main/shared/config'

const log = new Logger('database')

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: config.databasePath,
  logging: false,
  dialectOptions: {
    charset: 'utf8',
  },
})

export const initDatabase = async () => {
  try {
    await sequelize.authenticate()
    log.info('Successful connection to the Database')
    await sequelize.sync()
  } catch (error) {
    log.error('Unable to connect to the database: ', error)
  }
}

import csv from 'csv-parser'
import fs from 'fs'

import { Logger } from '@utils/logger'

import Application, { IApplication } from '@models/Application.model'
import CityInfo, { ICityInfo } from '@models/CityInfo.model'

import { config } from '@main/shared/config'

const log = new Logger('seed')

const seedDatabase = async () => {
  try {
    // Проверяем, есть ли данные в таблице
    const countCityInfo = await CityInfo.count()

    if (!countCityInfo) {
      const initialCityInfo: Omit<ICityInfo, 'id'>[] = []

      // Читаем данные из CSV-файла
      if (fs.existsSync(config.fileCSVPath)) {
        await new Promise<void>((resolve, reject) => {
          fs.createReadStream(config.fileCSVPath)
            .pipe(
              csv({
                separator: ',',
                mapHeaders: ({ header }) => header.trim()
              })
            )
            .on('data', (row) => {
              initialCityInfo.push({
                type_region: row['Тип региона'],
                region: row['Регион'],
                city: row['Город'],
                lower_city: row['Город'].toLowerCase(),
                latitude: Math.round(parseFloat(row['Широта']) * 100) / 100,
                longitude: Math.round(parseFloat(row['Долгота']) * 100) / 100,
                population: parseInt(row['Население'], 10),
                utc: row['Часовойпояс']
              })
            })
            .on('end', resolve)
            .on('error', reject)
        })

        // Сохраняем данные в базу
        await CityInfo.bulkCreate(initialCityInfo)
        log.log('Таблица CityInfo успешно заполнена.')
      } else {
        log.error(`Файл data.csv ${config.fileCSVPath} не найден.`)
      }
    } else {
      log.info('Таблица CityInfo уже заполнена.')
    }

    const countApplication = await Application.count()

    if (!countApplication) {
      const initialApplication: Omit<IApplication, 'id'>[] = [
        {
          theme: 'system',
          owm_apikey: ''
        }
      ]

      await Application.bulkCreate(initialApplication)
    }
  } catch (error) {
    log.error('Ошибка заполнения базы данных: ', error)
  }
}

export { seedDatabase }

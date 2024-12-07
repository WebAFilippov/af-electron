import csv from 'csv-parser'
import fs from 'fs'

import { Logger } from '@utils/logger'

import City from '@models/city-model'

import { config } from '@main/shared/config'

import { ICity } from '@shared/types'

const log = new Logger('seed')

export async function seedDatabase() {
  try {
    // Проверяем, есть ли данные в таблице
    const count = await City.count()

    if (count === 0) {
      const cities: Pick<
        ICity,
        | 'type_region'
        | 'region'
        | 'city'
        | 'lower_city'
        | 'latitude'
        | 'longitude'
        | 'population'
        | 'utc'
      >[] = []

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
              cities.push({
                type_region: row['Тип региона'] || '',
                region: row['Регион'] || '',
                city: row['Город'] || '',
                lower_city: (row['Город'] || '').toLowerCase(),
                latitude: parseFloat(row['Широта']) || null,
                longitude: parseFloat(row['Долгота']) || null,
                population: parseInt(row['Население'], 10) || 0,
                utc: row['Часовойпояс'] || null
              })
            })
            .on('end', resolve)
            .on('error', reject)
        })

        // Сохраняем данные в базу
        await City.bulkCreate(cities)
        console.log('The data has been successfully added to the database')
      } else {
        console.error(`The file ${config.fileCSVPath} was not found`)
      }
    } else {
      log.info('The data in the City table already exists. No filling is required.')
    }
  } catch (error) {
    console.error('Error filling in the database: ', error)
  }
}

import csv from 'csv-parser'
import fs from 'fs'

import { Logger } from '@utils/logger'

import Application from '@models/application.model'
import CitiesForWeather, { ICity } from '@models/city'
import City, { ICityInfo } from '@models/cityInfo'

import { config } from '@main/shared/config'

const log = new Logger('seed')

export async function seedDatabase() {
  try {
    // Проверяем, есть ли данные в таблице
    const countCity = await City.count()

    if (!countCity) {
      const initialCity: Omit<ICityInfo, 'id'>[] = []

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
              initialCity.push({
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
        await City.bulkCreate(initialCity)
        log.log('The data has been successfully added to the database')
      } else {
        log.error(`The file ${config.fileCSVPath} was not found`)
      }
    } else {
      log.info('The data in the City table already exists. No filling is required.')
    }

    const countCitiesForWeather = await CitiesForWeather.count()

    if (!countCitiesForWeather) {
      const initialCityForWeather: Omit<ICity, 'id'>[] = [
        { cityId: 123, isDefault: false },
        { cityId: 321, isDefault: false },
      ]
      await CitiesForWeather.bulkCreate(initialCityForWeather)
    }

    const countApplication = await Application.count()

    if (!countApplication) {
      const initialApplication: Pick<Application, 'openweathermap_apikey'>[] = [
        {
          openweathermap_apikey: ''
        }
      ]

      await Application.bulkCreate(initialApplication)
    }
  } catch (error) {
    console.error('Error filling in the database: ', error)
  }
}

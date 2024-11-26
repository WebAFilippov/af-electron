import BetterSqlite3 from 'better-sqlite3'
import csv from 'csv-parser'
import { app } from 'electron'
import fs from 'fs'
import path from 'path'

const userDataPath = app.getPath('userData') // Папка для пользовательских данных
const dbPath = path.join(userDataPath, 'app.db') // Путь к базе данных

// Создаём подключение к базе данных
export const db: BetterSqlite3.DATABASE = new BetterSqlite3(dbPath)

// Создаём таблицу, если она отсутствует
db.exec(`
  CREATE TABLE IF NOT EXISTS cities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type_region TEXT NOT NULL,
    region TEXT NOT NULL,
    city TEXT NOT NULL,
    lower_city TEXT NOT NULL,
    latitude REAL,
    longitude REAL,
    population INTEGER
  )
`)

// Функция для импорта данных из CSV
export async function importCitiesFromCSV() {
  // Проверяем, заполнена ли таблица
  const count = db.prepare('SELECT COUNT(*) as count FROM cities').get().count
  if (count > 0) {
    console.log('Таблица `cities` уже заполнена, пропуск импорта')
    return
  }

  // Определяем путь к CSV
  // const filePath = is.dev
  //   ? path.join(__dirname, 'data.csv') // Для разработки
  //   : path.join(app.getAppPath(), 'resources', 'data.csv') // Для сборки

  // // Проверяем, существует ли файл
  // if (fs.existsSync(filePath)) {
  //   console.log(`Файл найден: ${filePath}`)
  // } else {
  //   console.error(`Файл не найден: ${filePath}`)
  // }
  const filePath = path.join(app.getAppPath(), 'resources', 'data.csv')
  console.log(`Импорт данных из файла: ${filePath}`)

  const stmt = db.prepare(`
    INSERT INTO cities (type_region, region, city, lower_city, latitude, longitude, population)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)

  interface LocationData {
    type_region: string
    region: string
    city: string
    lower_city: string
    latitude: number | null
    longitude: number | null
    population: number
  }

  const insertMany = db.transaction((rows: LocationData[]) => {
    for (const row of rows) {
      stmt.run(
        row.type_region,
        row.region,
        row.city,
        row.lower_city,
        row.latitude,
        row.longitude,
        row.population
      )
    }
  })

  const rows: LocationData[] = []

  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(
        csv({
          separator: ',', // Указываем разделитель
          mapHeaders: ({ header }) => header.trim() // Удаляем лишние пробелы из заголовков
        })
      )
      .on('data', (data: LocationData[]) => {
        rows.push({
          type_region: data['Тип региона'] || '',
          region: data['Регион'] || '',
          city: data['Город'] || '',
          lower_city: (data['Город'] || '').toLowerCase(),
          latitude: parseFloat(data['Широта']) || null,
          longitude: parseFloat(data['Долгота']) || null,
          population: parseInt(data['Население'], 10) || 0
        })
      })
      .on('end', () => {
        insertMany(rows)
        console.log('Данные успешно импортированы из CSV')
        resolve()
      })
      .on('error', (error) => reject(error))
  })
}

// Функция для проверки и инициализации базы данных
export async function initializeDatabase() {
  console.log(`Путь к базе данных: ${dbPath}`)
  await importCitiesFromCSV()
}

import fs from 'fs'
import path from 'path'
import csv from 'csv-parser'
import Database from 'better-sqlite3'
import { app } from 'electron'
// import { is } from '@electron-toolkit/utils'

// Настраиваем путь к базе данных
const userDataPath = app.getPath('userData') // Папка для пользовательских данных
const dbPath = path.join(userDataPath, 'app.db') // Путь к базе данных

// Создаём подключение к базе данных
export const db = new Database(dbPath)

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

  const insertMany = db.transaction((rows: any[]) => {
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

  const rows: any[] = []

  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(
        csv({
          separator: ',', // Указываем разделитель
          mapHeaders: ({ header }) => header.trim() // Удаляем лишние пробелы из заголовков
        })
      )
      .on('data', (data) => {
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

import { Low } from 'lowdb'
import { join } from 'path'
import yaml from 'js-yaml'
import fs from 'fs'
import { app } from 'electron'

// Типизация структуры данных
export interface AppDataDatabase {
  isHide: boolean
  isMinisize: boolean
  isMaximaze: boolean
  theme: 'dark' | 'light' | 'system'
}

// Создаем адаптер для работы с YAML
class YAMLFile<T> {
  constructor(public filename: string) {}

  async read(): Promise<T | null> {
    const file = fs.readFileSync(this.filename, 'utf-8')
    return yaml.load(file) as T
  }

  async write(data: T): Promise<void> {
    const yamlStr = yaml.dump(data)
    fs.writeFileSync(this.filename, yamlStr, 'utf-8')
  }
}

let filePath = join(app.getPath('userData'), 'settings.yaml')
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, '')
}

console.log(filePath)

const db = new Low<AppDataDatabase>(new YAMLFile<AppDataDatabase>(filePath), {
  isHide: false,
  isMinisize: false,
  isMaximaze: false,
  theme: 'system'
})

export async function initDb(isAutoLaunch: boolean) {
  await db.read()

  if (isAutoLaunch) {
    db.data.isHide = true
  } else {
    db.data.isHide = false
  }
  db.data.isMinisize = false
  db.data.isMaximaze = false

  await db.write()

  return db
}

// // Использование
// initDb().then((db) => {
//   // Чтение данных
//   console.log('Current theme:', db.data?.theme)

//   // Обновление данных
//   db.data!.isHide = false
//   db.data!.theme = 'тёмная'
//   db.write()
// })

import { Low } from 'lowdb'
import { join } from 'path'
import yaml from 'js-yaml'
import fs from 'fs'
import { app } from 'electron'
import { IState } from '../../types'

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
  fs.writeFileSync(
    filePath,
    yaml.dump({
      isHide: false,
      isMinisize: false,
      isMaximaze: false,
      theme: 'system'
    })
  )
}

console.log(filePath)

let initialData: IState

try {
  const fileContent = fs.readFileSync(filePath, 'utf-8').trim()

  if (!fileContent) {
    initialData = {
      isHide: false,
      isMinisize: false,
      isMaximaze: false,
      theme: 'system'
    }

    fs.writeFileSync(filePath, yaml.dump(initialData))
  } else {
    initialData = yaml.load(fileContent)
    initialData = { ...initialData, isHide: false, isMinisize: false, isMaximaze: false }
  }
} catch (error) {
  console.error('Ошибка при чтении/парсинге файла:', error)

  // Устанавливаем начальные данные в случае ошибки
  initialData = {
    isHide: false,
    isMinisize: false,
    isMaximaze: false,
    theme: 'system'
  }

  // Перезаписываем файл с начальными данными
  fs.writeFileSync(filePath, yaml.dump(initialData))
}

const db = new Low<IState>(new YAMLFile<IState>(filePath), initialData)

export async function initDb(isAutoLaunch: boolean) {
  if (isAutoLaunch) {
    db.data.isHide = true
  } else {
    db.data.isHide = false
  }
  
  await db.write()

  return db
}

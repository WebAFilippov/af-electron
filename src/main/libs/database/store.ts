import { Low } from 'lowdb'
import { join } from 'path'
import yaml from 'js-yaml'
import fs from 'fs'
import { app } from 'electron'
import { IState } from '../../types'
import { Logger } from '../logger'

const log = new Logger('database')

function isValidState(data: any): data is IState {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.isHide === 'boolean' &&
    typeof data.isMinisize === 'boolean' &&
    typeof data.isMaximaze === 'boolean' &&
    (data.theme === 'dark' || data.theme === 'light' || data.theme === 'system')
  )
}
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
  log.error('Файл settings.yaml не найден. Создаём новый.')
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
    log.error('Файл settings.yaml пуст. Создаём новый.')

    initialData = {
      isHide: false,
      isMinisize: false,
      isMaximaze: false,
      theme: 'system'
    }

    fs.writeFileSync(filePath, yaml.dump(initialData))
  } else {
    try {
      initialData = yaml.load(fileContent)
    } catch (error) {
      log.error('Файл settings.yaml некорректен. Создаём новый.')

      initialData = {
        isHide: false,
        isMinisize: false,
        isMaximaze: false,
        theme: 'system'
      }
    }

    if (isValidState(initialData)) {
      initialData = { ...initialData, isHide: false, isMinisize: false, isMaximaze: false }
      fs.writeFileSync(filePath, yaml.dump(initialData))
    } else {
      log.error('Данные в файле некорректны, перезаписываем файл.')
      initialData = {
        isHide: false,
        isMinisize: false,
        isMaximaze: false,
        theme: 'system'
      }
      fs.writeFileSync(filePath, yaml.dump(initialData))
    }
  }
} catch (error) {
  log.error('Ошибка при чтении/парсинге файла:', error)

  initialData = {
    isHide: false,
    isMinisize: false,
    isMaximaze: false,
    theme: 'system'
  }

  fs.writeFileSync(filePath, yaml.dump(initialData))
}

export async function initDb(isAutoLaunch: boolean) {
  const db = new Low<IState>(new YAMLFile<IState>(filePath), initialData)

  if (isAutoLaunch) {
    db.data.isHide = true
    await db.write()
  }

  return db
}

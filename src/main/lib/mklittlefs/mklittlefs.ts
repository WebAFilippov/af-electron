import { config } from '@shared/config'
import { exec, ExecException } from 'child_process'
import fs from 'fs'

interface CreateImageOptions {
  blockSize?: number // Размер блока в байтах (по умолчанию 4096)
  pageSize?: number // Размер страницы в байтах (по умолчанию 256)
  size?: number // Общий размер файловой системы в байтах (по умолчанию 0x100000 = 1MB)
}

class LittleFSPackager {
  private execPath: string = ''

  constructor() {
    this.execPath = config.fileMKLittleFS
  }

  /**
   * Создаёт образ LittleFS из указанной директории
   * @param sourceDir Путь к исходной директории с файлами
   * @param outputFile Путь для сохранения созданного образа
   * @param options Дополнительные параметры создания образа
   * @returns Promise, который разрешается в путь к созданному образу
   * @throws Error Если исходная директория не существует или произошла ошибка при создании образа
   */
  public async createImage(): Promise<string> {
    const sourceDir: string = config.updateSourcePath
    const outputFile: string = config.updateOutputPath
    const options: CreateImageOptions = {}

    const { blockSize = 4096, pageSize = 256, size = 0x100000 } = options

    if (!fs.existsSync(sourceDir)) {
      throw new Error(`Source directory "${sourceDir}" does not exist`)
    }

    const args = [
      '--create',
      sourceDir, 
      '-b',
      blockSize, 
      '-p',
      pageSize, 
      '-s',
      size,
      outputFile 
    ]

    // Формируем полную команду для выполнения
    const command = `"${this.execPath}" ${args.join(' ')}`

    // Возвращаем Promise для асинхронного выполнения
    return new Promise<string>((resolve, reject) => {
      exec(
        command,
        { maxBuffer: 1024 * 1024 * 10 },
        (error: ExecException | null, _stdout: string, stderr: string) => {
          if (error) {
            console.error('Error:', error)
            console.error('Stderr:', stderr)
            reject(new Error(`Failed to create image: ${stderr || error.message}`))
            return
          }
          resolve(outputFile)
        }
      )
    })
  }
}

export default LittleFSPackager

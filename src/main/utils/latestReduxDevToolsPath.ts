import { app } from 'electron'
import { promises as fs } from 'fs'
import path from 'path'

export const getLatestReduxDevToolsPath = async (): Promise<string | null> => {
  const basePath = path.join(
    app.getPath('home'),
    'AppData',
    'Local',
    'Yandex',
    'YandexBrowser',
    'User Data',
    'Default',
    'Extensions',
    'lmhkpmbekcpmknklioeibfkpmmfibljd'
  )

  try {
    const files = await fs.readdir(basePath) // Получаем список папок
    const versionFolders = files.filter((folder) =>
      /^\d+\.\d+\.\d+(_\d+)?$/.test(folder)
    ) // Фильтруем только версии

    if (versionFolders.length === 0) {
      console.error('No version folders found.')
      return null
    }

    // Сортируем версии в порядке убывания
    const sortedVersions = versionFolders.sort((a, b) => {
      const versionA = a.replace('_', '.').split('.').map(Number)
      const versionB = b.replace('_', '.').split('.').map(Number)

      for (let i = 0; i < Math.max(versionA.length, versionB.length); i++) {
        const numA = versionA[i] || 0
        const numB = versionB[i] || 0
        if (numA !== numB) return numB - numA // Сравниваем числа
      }

      return 0
    })

    const latestVersion = sortedVersions[0]
    return path.join(basePath, latestVersion)
  } catch (error) {
    console.error('Error reading extensions folder:', error)
    return null
  }
}

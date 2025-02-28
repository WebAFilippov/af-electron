import { ipcMain } from 'electron'
import { parseStringPromise } from 'xml2js'

import { newsService } from '@services/News.service'

export const NewsController = () => {
  ipcMain.handle('v1/news/fetch_news', async () => {
    const start = performance.now()

    const response = await fetch('https://lenta.ru/rss/google-newsstand/main/')
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`)
    }
    const data = await response.text()

    const parsedData = await parseStringPromise(data)

    const response2 = await newsService.fetchNews(parsedData)

    const end = performance.now() - start
    console.log('check ', end)
    return response2
  })
}

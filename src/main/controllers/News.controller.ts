import { ipcMain } from 'electron'

import { newsService } from '@services/News.service'

export const NewsController = () => {
  ipcMain.handle('v1/news/fetch_news', async () => {
    const response = await newsService.fetchNews()

    return response
  })
}

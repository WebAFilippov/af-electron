import { ipcMain } from 'electron'

import { db } from '@libs/database/db'

export const dbHandlers = () => {
  // Получить города по запросу
  ipcMain.handle('search_cities', (_, query: string) => {
    const stmt = db.prepare(`
      SELECT * FROM cities
      WHERE lower_city LIKE ?
      ORDER BY population DESC
      LIMIT 5
    `)

    return stmt.all(`%${query.toLowerCase()}%`)
  })

  // Получить настройки
  ipcMain.handle('get-settings', () => {
    const stmt = db.prepare('SELECT * FROM settings LIMIT 1')
    return stmt.get()
  })

  // Обновить настройки
  ipcMain.handle('update-settings', (_, settings) => {
    const stmt = db.prepare(`
    INSERT INTO settings (id, isHide, isMinisize, isMaximaze, theme)
    VALUES (1, @isHide, @isMinisize, @isMaximaze, @theme)
    ON CONFLICT(id) DO UPDATE SET
      isHide = excluded.isHide,
      isMinisize = excluded.isMinisize,
      isMaximaze = excluded.isMaximaze,
      theme = excluded.theme
  `)

    stmt.run(settings)
  })
}

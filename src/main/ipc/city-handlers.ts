import { ipcMain } from 'electron'

import { cityService } from '@services/city-service'

export const cityHandlers = () => {
  ipcMain.handle('city::searchCityLimitOrder', async (_event, query, limit, order) => {
    try {
      const cities = await cityService.searchCitiesLimitOrder(query, limit, order)
      return cities
    } catch (error) {
      return []
    }
  })
}

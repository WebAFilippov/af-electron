import { ipcMain } from 'electron'

import { cityService } from '@services/city.service'

export const dataHandlers = () => {
  ipcMain.handle('city::searchCityLimitOrder', async (_event, optionsQuery) => {
    const cities = await cityService.searchCitiesLimitOrder(optionsQuery)
    return cities
  })
}

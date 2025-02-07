import { BrowserWindow, ipcMain } from 'electron'

import { applicationService } from '@services/Application.service'
import { cityService } from '@services/City.service'
import { cityInfoService } from '@services/CityInfo.service'

export const dataHandlers = (window: BrowserWindow, isAutoLaunch: boolean) => {
  // Application
  ipcMain.handle('v1/start', async () => {
    const responseCity = await cityService.getCities()
    const responseApplication = await applicationService.getApplication()

    const response = {
      city: responseCity,
      application: responseApplication
    }

    if (!isAutoLaunch) {
      window.show()
      return response
    }

    return response
  })

  ipcMain.handle('v1/application/get', async () => {
    const response = await applicationService.getApplication()
    return response
  })

  ipcMain.handle(
    'v1/application/update_application',
    async (_event, field, value) => {
      const response = await applicationService.updateApplicationField(
        field,
        value
      )
      return response
    }
  )

  ipcMain.handle('v1/application/check_network', async () => {
    const response = await applicationService.isHostReachable()
    return response
  })

  // CityInfo
  ipcMain.handle('v1/cityInfo/search', async (_event, optionsQuery) => {
    const response = await cityInfoService.getCitiesQueryParams(optionsQuery)
    return response
  })

  // City
  ipcMain.handle('v1/city/set_default', async (_event, id) => {
    const response = await cityService.setDefaultCity(id)
    return response
  })

  ipcMain.handle('v1/city/create', async (_event, cityId) => {
    const response = await cityService.createCity(cityId)
    return response
  })
}

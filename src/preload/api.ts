import { ipcRenderer } from 'electron'

import { ElectronAPI } from '@electron-toolkit/preload'

import { CityWeather, PreloadApplication, PreloadStartedPayload } from '../shared/types'

export const api = {
  startApp: (): Promise<PreloadStartedPayload> => ipcRenderer.invoke('v1/startApp'),

  // Window
  setMinimazeWindow: () => ipcRenderer.send('v1/window/minimaze'),
  setMaximazeWindow: () => ipcRenderer.send('v1/window/maximize'),
  setCloseWindow: () => ipcRenderer.send('v1/window/close'),

  // Application
  fetchApplicationSettings: (): Promise<PreloadApplication> =>
    ipcRenderer.invoke('v1/application/getall'),
  updateApplicationByField: (
    field: keyof Omit<PreloadApplication, 'id'>,
    value: string
  ): Promise<number> => ipcRenderer.invoke('v1/application/update_application', field, value),
  checkConnection: (): Promise<boolean> => ipcRenderer.invoke('v1/application/check_connection'),

  // CityService
  searchCitiesWithLimits: (args) => ipcRenderer.invoke('v1/cityInfo/search', args),

  // CityWetherService
  fetchAllCitiesForWeather: (): Promise<CityWeather[]> => ipcRenderer.invoke('v1/city/getAll'),
  updateCityForWeatherByIsDefault: (id: number): Promise<number | undefined> =>
    ipcRenderer.invoke('v1/city/default', id),
  createCityForWeatherByCityId: (args: number): Promise<CityWeather> =>
    ipcRenderer.invoke('v1/city/create', args),

  // others
  openExternal: (url: string) => ipcRenderer.send('v1/external/open', url)
} satisfies Record<string, (...args: any) => any>

declare global {
  interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}

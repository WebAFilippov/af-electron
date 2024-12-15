import { ipcRenderer } from 'electron'

import { ElectronAPI } from '@electron-toolkit/preload'

import { CityForWeather, PreloadApplication, PreloadStartedPayload } from '../shared/types'

export const api = {
  // Window
  setMinimazeWindow: () => ipcRenderer.send('v1/window/minimaze'),
  setMaximazeWindow: () => ipcRenderer.send('v1/window/maximize'),
  setCloseWindow: () => ipcRenderer.send('v1/window/close'),

  // Application
  startApp: (): Promise<PreloadStartedPayload> => ipcRenderer.invoke('v1/application/start'),
  fetchApplicationSettings: (): Promise<PreloadApplication> =>
    ipcRenderer.invoke('v1/application/getall'),

  // CityService
  searchCitiesWithLimits: (args) => ipcRenderer.invoke('v1/cityInfo/search', args),

  // CityForWetherService
  fetchAllCitiesForWeather: (): Promise<CityForWeather[]> => ipcRenderer.invoke('v1/city/getAll'),
  updateCityForWeatherByIsDefault: (id: number): Promise<number | null> =>
    ipcRenderer.invoke('v1/city/default', id),
  createCityForWeatherByCityId: (args: number): Promise<CityForWeather> =>
    ipcRenderer.invoke('v1/city/create', args)
} satisfies Record<string, (args: any) => any>

declare global {
  interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}

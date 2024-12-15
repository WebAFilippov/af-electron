import { ipcRenderer } from 'electron'

import { ElectronAPI } from '@electron-toolkit/preload'

import { CityForWeather, PreloadApplication, PreloadStartedPayload } from '../shared/types'

export const api = {
  // Application
  startApplication: (): Promise<PreloadStartedPayload> =>
    ipcRenderer.invoke('v1/application/start'),
  getApplicationSettings: (): Promise<PreloadApplication> =>
    ipcRenderer.invoke('v1/application/getall'),
  updateApplicationByOpenWeatherMapApiKey: (args: string): Promise<number> =>
    ipcRenderer.invoke('v1/application/update_openweathermap_apikey', args),

  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  maximizeWindow: () => ipcRenderer.send('maximize-window'),
  closeWindow: () => ipcRenderer.send('close-window'),

  // CityService
  searchCities: (args) => ipcRenderer.invoke('city::searchCityLimitOrder', args),

  // CityForWetherService
  getAllCityForWeather: (): Promise<CityForWeather[]> =>
    ipcRenderer.invoke('v1/city_for_weather/getAll'),
  updateCityForWeatherByIsDefault: (id: number): Promise<number | null> =>
    ipcRenderer.invoke('v1/city_for_weather/default', id),
  createCityForWeatherByCityId: (args: number): Promise<CityForWeather> =>
    ipcRenderer.invoke('v1/city_for_weather/create', args)
} satisfies Record<string, (args: any) => any>

declare global {
  interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}

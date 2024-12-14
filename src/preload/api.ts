import { ipcRenderer } from 'electron'

import { ElectronAPI } from '@electron-toolkit/preload'
import { CityForWeather } from '@entities/city-for-weather'
import { ApplicationPreload } from '../shared/types'

export const api = {
  startWindow: () => ipcRenderer.send('start-window'),
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  maximizeWindow: () => ipcRenderer.send('maximize-window'),
  closeWindow: () => ipcRenderer.send('close-window'),

  // Application
  getApplicationSettings: (): Promise<ApplicationPreload> =>
    ipcRenderer.invoke('v1/application/getall'),
  updateApplicationByOpenWeatherMapApiKey: (args: string): Promise<number> =>
    ipcRenderer.invoke('v1/application/update_openweathermap_apikey', args),
  // CityService
  searchCities: (args) => ipcRenderer.invoke('city::searchCityLimitOrder', args),

  // CityForWetherService
  getAllCityForWeather: (): Promise<CityForWeather[]> =>
    ipcRenderer.invoke('v1/city_for_weather/getAll'),
  updateCityForWeatherByIsDefault: (args: number): Promise<number | null> =>
    ipcRenderer.invoke('v1/city_for_weather/default', args)
} satisfies Record<string, (args: any) => any>

declare global {
  interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}

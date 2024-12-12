import { ipcRenderer } from 'electron'

import { ElectronAPI } from '@electron-toolkit/preload'
import { CityForWeather } from '@entities/city-for-weather'

export const api = {
  startWindow: () => ipcRenderer.send('start-window'),
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  maximizeWindow: () => ipcRenderer.send('maximize-window'),
  closeWindow: () => ipcRenderer.send('close-window'),

  // CityService
  searchCities: (args) => ipcRenderer.invoke('city::searchCityLimitOrder', args),

  // CityForWetherService
  getAllCityForWeather: (): Promise<CityForWeather[]> =>
    ipcRenderer.invoke('v1/city_for_weather/getAll'),
  updateCityForWeatherByIsSelected: (args: number): Promise<number | null> =>
    ipcRenderer.invoke('v1/city_for_weather/update', args)
} satisfies Record<string, (args: any) => any>

declare global {
  interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}

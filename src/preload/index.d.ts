import { ElectronAPI } from '@electron-toolkit/preload'

import { CitiesForWeatherPreload, ICity } from '../shared/types'

export interface Api {
  startWindow: () => Promise<CitiesForWeatherPreload>
  minimizeWindow: () => void
  maximizeWindow: () => void
  closeWindow: () => void

  searchCities: (
    query: string,
    limit?: number = 5,
    order?: 'DESC' | 'ASC' = 'DESC'
  ) => Promise<ICity[]>

  onDevice: (callback: (device: any) => void) => void
  removeListenerDevice: () => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}

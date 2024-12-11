import { ElectronAPI } from '@electron-toolkit/preload'

import { CitiesForWeatherPreload, City, SearchCitiesParams } from '../shared/types'

export interface Api {
  startWindow: () => void
  minimizeWindow: () => void
  maximizeWindow: () => void
  closeWindow: () => void

  searchCities: (optionsQuery: SearchCitiesParams) => Promise<City[]>

  onDevice: (callback: (device: any) => void) => void
  removeListenerDevice: () => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}

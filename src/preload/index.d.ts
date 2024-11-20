import { ElectronAPI } from '@electron-toolkit/preload'

export interface Api {}

export interface WindowControl {
  startWindow: () => Promise<string>
  minimizeWindow: () => void
  maximizeWindow: () => void
  closeWindow: () => void
}

export type CitiesSearch = {
  searchCities: (query: string) => string[]
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
    window_control: WindowControl
    search_cities: CitiesSearch
  }
}

import { ElectronAPI } from '@electron-toolkit/preload'
import { IDevice } from 'af-win-audio'

export interface Api {
  startWindow: () => Promise<string>
  minimizeWindow: () => void
  maximizeWindow: () => void
  closeWindow: () => void

  searchCities: (query: string) => Promise<string[]>

  sendDevice: (callback: (device: IDevice) => void) => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}

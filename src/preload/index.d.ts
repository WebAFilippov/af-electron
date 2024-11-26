import { ElectronAPI } from '@electron-toolkit/preload'


export interface Api {
  startWindow: () => Promise<string>
  minimizeWindow: () => void
  maximizeWindow: () => void
  closeWindow: () => void

  searchCities: (query: string) => Promise<string[]>

  sendDevice: (callback: (device: any) => void) => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}

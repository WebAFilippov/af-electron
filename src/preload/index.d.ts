import { ElectronAPI } from '@electron-toolkit/preload'

export interface Api {
  startWindow: () => Promise<string>
  minimizeWindow: () => void
  maximizeWindow: () => void
  closeWindow: () => void

  searchCities: (query: string) => Promise<string[]>

  onDevice: (callback: (device: any) => void) => void
  removeListenerDevice: () => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}

import { ElectronAPI } from '@electron-toolkit/preload'

import { ICity } from '../shared/types'

export interface Api {
  startWindow: () => Promise<string>
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

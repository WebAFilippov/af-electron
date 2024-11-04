import { ElectronAPI } from '@electron-toolkit/preload'

export interface Api {
  setTheme: (theme: Theme) => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}

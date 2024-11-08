import { ElectronAPI } from '@electron-toolkit/preload'

export interface Api {
  setTheme: (theme: Theme) => void
}

export interface TitleControl {
  minimizeWindow: () => void
  maximizeWindow: () => void
  closeWindow: () => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
    title_control: TitleControl
  }
}

import { ElectronAPI } from '@electron-toolkit/preload'

export interface Api {}

export interface WindowControl {
  startWindow: () => Promise<string>
  minimizeWindow: () => void
  maximizeWindow: () => void
  closeWindow: () => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
    window_control: WindowControl
  }
}

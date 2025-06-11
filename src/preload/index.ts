import { api } from './api'
import { ElectronAPI, electronAPI } from '@electron-toolkit/preload'
import { contextBridge } from 'electron'

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}

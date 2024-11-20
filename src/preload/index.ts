import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { api, search_cities, window_control } from './api/api'

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('window_control', window_control)
    contextBridge.exposeInMainWorld('search_cities', search_cities)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
  // @ts-ignore (define in dts)
  window.window_control = window_control
  // @ts-ignore (define in dts)
  window.search_cities = search_cities
}

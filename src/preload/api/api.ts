import { ipcRenderer } from 'electron'

import { Api, WindowControl } from '../index.d'

export const api: Api = {}

export const window_control: WindowControl = {
  startWindow: () => ipcRenderer.invoke('start-window'),
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  maximizeWindow: () => ipcRenderer.send('maximize-window'),
  closeWindow: () => ipcRenderer.send('close-window')
}

export const search_cities = {
  searchCities: (query: string) => ipcRenderer.invoke('search_cities', query)
}

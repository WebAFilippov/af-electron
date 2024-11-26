import { ipcRenderer } from 'electron'
import { Api } from './index.d'


export const api: Api = {
  startWindow: () => ipcRenderer.invoke('start-window'),
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  maximizeWindow: () => ipcRenderer.send('maximize-window'),
  closeWindow: () => ipcRenderer.send('close-window'),

  searchCities: (query: string) => ipcRenderer.invoke('search_cities', query),

  sendDevice: (callback: (device: any) => void) =>
    ipcRenderer.on('send-device-data', (_, device) => callback(device))
}

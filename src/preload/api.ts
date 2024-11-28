import { ipcRenderer } from 'electron'
import { Api } from './index.d'

export const api: Api = {
  startWindow: () => ipcRenderer.invoke('start-window'),
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  maximizeWindow: () => ipcRenderer.send('maximize-window'),
  closeWindow: () => ipcRenderer.send('close-window'),

  searchCities: (query, limit?, order?) =>
    ipcRenderer.invoke('city::searchCityLimitOrder', query, limit, order),

  onDevice: (callback: (device: any) => void) =>
    ipcRenderer.on('send-device-data', (_, device) => callback(device)),
  removeListenerDevice: () => ipcRenderer.removeAllListeners('send-device-data')
}

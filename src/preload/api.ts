import { Theme, UpdateDataDto, WindowState } from './transport'
import { ipcRenderer } from 'electron'
import { UpdateCheckResult } from 'electron-updater'

export const api = {
  // Network
  networkState: (callback: (state: boolean) => void) =>
    ipcRenderer.on('network_state', (_event, state: boolean) => callback(state)),

  // Updater-Desktop
  onUpdateData: (callback: (data: UpdateDataDto) => void) =>
    ipcRenderer.on('update_data', (_event, data: UpdateDataDto) => callback(data)),
  successfulUpdate: (): Promise<{ version: string; updated: boolean }> =>
    ipcRenderer.invoke('successful_update'),
  checkForUpdates: (): Promise<UpdateCheckResult | null> =>
    ipcRenderer.invoke('checking_for_update'),
  retryDowmload: () => ipcRenderer.send('retry_checking_for_update'),
  startDownload: () => ipcRenderer.send('start_download'),
  installNow: () => ipcRenderer.send('install_now'),
  installOnQuit: () => ipcRenderer.send('install_on_quit'),

  // Window
  windowState: (callback: (state: WindowState) => void) => {
    ipcRenderer.on('window_state', (_event, state: WindowState) => callback(state))
  },
  updateWindowTheme: (theme: Theme) => ipcRenderer.send('update_theme', theme),
  getWindowTheme: () => ipcRenderer.invoke('get_theme'),
  toggleFullscreenWindow: () => ipcRenderer.send('toggle_fullscreen'),
  minimazeWindow: () => ipcRenderer.send('minimaze'),
  maximazeWindow: () => ipcRenderer.send('maximize'),
  closeWindow: () => ipcRenderer.send('close'),

  // Device
  isConnectedDevice: (callback: (state: boolean) => void) =>
    ipcRenderer.on('is_connected_device', (_event, state: boolean) => callback(state)),

  // External_link
  openExternal: (url: string) => ipcRenderer.send('external_open', url)
} as const satisfies Record<string, (...args: any) => any>

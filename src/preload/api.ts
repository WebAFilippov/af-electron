import { Theme, UpdateDataDto, WindowState } from './transport'
import { Display, ipcRenderer } from 'electron'
import { UpdateCheckResult } from 'electron-updater'

interface Api {
  // Display
  getDisplays: () => Promise<Display[]>
  addedDisplay: (callback: (data: Display) => void) => void
  removedDisplay: (callback: (data: Display) => void) => void
  displayMetricsChange: (
    callback: (data: { display: Display; changeMetrics: string[] }) => void
  ) => void

  // Updater_Desktop
  onUpdateData: (callback: (data: UpdateDataDto) => void) => void
  successfulUpdate: () => Promise<{ version: string; updated: boolean }>
  checkForUpdates: () => Promise<UpdateCheckResult | null>
  retryDowmload: () => void
  startDownload: () => void
  installNow: () => void
  installOnQuit: () => void

  // Window
  windowState: (callback: (state: WindowState) => void) => void
  updateWindowTheme: (theme: Theme) => void
  getWindowTheme: () => Promise<Theme>
  toggleFullscreenWindow: () => void
  minimazeWindow: () => void
  maximazeWindow: () => void
  closeWindow: () => void

  // External_link
  openExternal: (url: string) => void
}

export const api: Api = {
  // Display
  getDisplays: () => ipcRenderer.invoke('get_displays'),
  addedDisplay: (callback) => {
    ipcRenderer.on('added_display', (_event, data: Display) => callback(data))
  },
  removedDisplay: (callback) => {
    ipcRenderer.on('removed_display', (_event, data: Display) => callback(data))
  },
  displayMetricsChange: (callback) => {
    ipcRenderer.on(
      'display-metrics-changed',
      (_event, data: { display: Display; changeMetrics: string[] }) =>
        callback(data)
    )
  },

  // Updater-Desktop
  onUpdateData: (callback) => {
    ipcRenderer.on('update_data', (_event, data: UpdateDataDto) =>
      callback(data)
    )
  },
  successfulUpdate: () => ipcRenderer.invoke('successful_update'),
  checkForUpdates: () => ipcRenderer.invoke('checking_for_update'),
  retryDowmload: () => ipcRenderer.send('retry_checking_for_update'),
  startDownload: () => ipcRenderer.send('start_download'),
  installNow: () => ipcRenderer.send('install_now'),
  installOnQuit: () => ipcRenderer.send('install_on_quit'),

  // Window
  windowState: (callback) => {
    ipcRenderer.on('window_state', (_event, state: WindowState) =>
      callback(state)
    )
  },
  updateWindowTheme: (theme) => ipcRenderer.send('update_theme', theme),
  getWindowTheme: () => ipcRenderer.invoke('get_theme'),
  toggleFullscreenWindow: () => ipcRenderer.send('toggle_fullscreen'),
  minimazeWindow: () => ipcRenderer.send('minimaze'),
  maximazeWindow: () => ipcRenderer.send('maximize'),
  closeWindow: () => ipcRenderer.send('close'),

  // External_link
  openExternal: (url) => ipcRenderer.send('external_open', url)
} as const

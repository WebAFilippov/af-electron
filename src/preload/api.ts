import { Theme, UpdateDataDto, WindowState } from './transport'
import { ipcRenderer, Display } from 'electron' // Правильный импорт
import { UpdateCheckResult } from 'electron-updater'

interface Api {
  // Display
  getPhysicalDisplays: () => Promise<Display[]>
  addPhysicalDisplay: (callback: (data: Display) => void) => void
  removePhysicalDisplay: (callback: (data: Display) => void) => void
  changeMetricsPhisycalDisplay: (callback: (data: { display: Display; changeMetrics: string[] }) => void) => void

  // Updater-Desktop
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
  getPhysicalDisplays: () =>
    ipcRenderer.invoke('get_physicals_displays'),
  addPhysicalDisplay: (callback) => {
    ipcRenderer.on('add_physical_display', (_event, data: Display) => callback(data))
  },
  removePhysicalDisplay: (callback) => {
    ipcRenderer.on('remove_physical_display', (_event, data: Display) => callback(data))
  },
  changeMetricsPhisycalDisplay: (callback) => {
    ipcRenderer.on(
      'change_metrics_phisycal_display',
      (_event, data: { display: Display; changeMetrics: string[] }) => callback(data)
    )
  },

  // Updater-Desktop
  onUpdateData: (callback) => {
    ipcRenderer.on('update_data', (_event, data: UpdateDataDto) => callback(data))
  },
  successfulUpdate: () =>
    ipcRenderer.invoke('successful_update'),
  checkForUpdates: () =>
    ipcRenderer.invoke('checking_for_update'),
  retryDowmload: () => ipcRenderer.send('retry_checking_for_update'),
  startDownload: () => ipcRenderer.send('start_download'),
  installNow: () => ipcRenderer.send('install_now'),
  installOnQuit: () => ipcRenderer.send('install_on_quit'),

  // Window
  windowState: (callback) => {
    ipcRenderer.on('window_state', (_event, state: WindowState) => callback(state))
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
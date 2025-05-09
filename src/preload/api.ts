import { ElectronAPI } from "@electron-toolkit/preload";
import { ipcRenderer } from "electron";

import { Theme, WindowState, UpdatedStatusDto } from "./transport";


export const api = {
  // Programm
  onStartup: () => ipcRenderer.send("v1/programm/startup"),
  getNetworkStatus: () => ipcRenderer.invoke("v1/programm/get_network"),
  checkNetworkStatus: (callback: (state: boolean) => void) =>
    ipcRenderer.on("v1/programm/check_network", (_event, state: boolean) =>
      callback(state),
    ),

  // AutoUpdater
  startDownload: () => ipcRenderer.send("v1/autoUpdater/start_download"),
  installNow: () => ipcRenderer.send("v1/autoUpdater/install-now"),
  installOnQuit: () => ipcRenderer.send("v1/autoUpdater/install-on-quit"),
  onSuccessUpdate: (callback: (version: string) => void) =>
    ipcRenderer.on(
      "v1/autoUpdater/success_update",
      (_event, version: string) => callback(version),
    ),
  onUpdateData: (callback: (data: { status: UpdatedStatusDto, data?: Record<string, any> }) => void) =>
    ipcRenderer.on(
      "v1/autoUpdater/update_data",
      (_event, data: { status: UpdatedStatusDto, data?: Record<string, any> }) => callback(data),
    ),

  // Window
  sendWindowTheme: (theme: Theme) => ipcRenderer.send("v1/window/theme", theme),
  getWindowTheme: () => ipcRenderer.invoke("v1/window/get_theme"),
  setFullscreenWindow: () => ipcRenderer.send("v1/window/toggle_fullscreen"),
  setMinimazeWindow: () => ipcRenderer.send("v1/window/minimaze"),
  setMaximazeWindow: () => ipcRenderer.send("v1/window/maximize"),
  setCloseWindow: () => ipcRenderer.send("v1/window/close"),
  onWindowState: (callback: (state: WindowState) => void) => {
    ipcRenderer.on("v1/window/state", (_event, state: WindowState) =>
      callback(state),
    );
  },

  // Device
  onDeviceConnected: (callback: (isConnected: boolean) => void) => {
    ipcRenderer.on("v1/device/connection", (_event, isConnected: boolean) =>
      callback(isConnected),
    );
  },
  getDeviceConnection: () => ipcRenderer.invoke("v1/device/get_connection"),

  // News
  fetchNews: (query: string) => ipcRenderer.invoke("v1/news/fetch_news", query),

  // Sidebar
  // getSidebarList: () => ipcRenderer.invoke('v1/sidebar/getAll'),
  // updateSidebarOrder: (list) => ipcRenderer.invoke('v1/sidebar/updateSidebar', list),

  // // Application
  // fetchApplicationSettings: (): Promise<PreloadApplication> =>
  //   ipcRenderer.invoke('v1/application/getall'),
  // updateApplicationByField: (
  //   field: keyof Omit<PreloadApplication, 'id'>,
  //   value: string
  // ): Promise<number> => ipcRenderer.invoke('v1/application/update_application', field, value),

  // // CityService
  // searchCitiesWithLimits: (args) => ipcRenderer.invoke('v1/cityInfo/search', args),

  // // CityWetherService
  // fetchAllCitiesForWeather: (): Promise<CityWeather[]> => ipcRenderer.invoke('v1/city/getAll'),
  // updateCityForWeatherByIsDefault: (id: number): Promise<number | undefined> =>
  //   ipcRenderer.invoke('v1/city/default', id),
  // createCityForWeatherByCityId: (args: number): Promise<CityWeather> =>
  //   ipcRenderer.invoke('v1/city/create', args),

  // // others
  openExternal: (url: string) => ipcRenderer.send("v1/external/open", url),
} satisfies Record<string, (...args: any) => any>;

declare global {
  interface Window {
    electron: ElectronAPI;
    api: typeof api;
  }
}

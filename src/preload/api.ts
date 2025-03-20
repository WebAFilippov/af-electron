import { ElectronAPI } from "@electron-toolkit/preload";
import { ipcRenderer } from "electron";
import { Theme, WindowState } from "./transport";


export const api = {
  // Programm
  onStartup: () => ipcRenderer.invoke("v1/start"),

  // Window
  sendWindowTheme: (theme: Theme) => ipcRenderer.send("v1/window/theme", theme),
  setMinimazeWindow: () => ipcRenderer.send("v1/window/minimaze"),
  setMaximazeWindow: () => ipcRenderer.send("v1/window/maximize"),
  setCloseWindow: () => ipcRenderer.send("v1/window/close"),
  onWindowState: (callback: (state: WindowState) => void ) => {
    ipcRenderer.on('v1/window/state', (_event, state: WindowState) => callback(state))
  },


  // News
  fetchNews: () => ipcRenderer.invoke("v1/news/fetch_news"),

  // Sidebar
  getSidebarList: () => ipcRenderer.invoke('v1/sidebar/getAll'),
  updateSidebarOrder: (list) => ipcRenderer.invoke('v1/sidebar/updateSidebar', list),

  // // Application
  // fetchApplicationSettings: (): Promise<PreloadApplication> =>
  //   ipcRenderer.invoke('v1/application/getall'),
  // updateApplicationByField: (
  //   field: keyof Omit<PreloadApplication, 'id'>,
  //   value: string
  // ): Promise<number> => ipcRenderer.invoke('v1/application/update_application', field, value),
  checkNetworkStatus: () =>
    ipcRenderer.invoke("v1/application/check_network"),

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


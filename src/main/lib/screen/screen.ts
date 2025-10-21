import { BrowserWindow, Display, ipcMain, Screen, screen } from 'electron'

export class Monitors {
  private window: BrowserWindow
  private screen: Screen
  private monitors: Display[] = []

  constructor(window: BrowserWindow) {
    this.window = window
    this.screen = screen
    this.getMonitors()
    this.listeners()
  }


  public getMonitors() {
    this.monitors = this.screen.getAllDisplays()
    return this.monitors
  }

  private listeners() {
    ipcMain.handle('get_physicals_displays', () => {
      return this.monitors
    })

    this.screen.on('display-added', (_, newDisplay) => {
      this.window.webContents.send('add_physical_display', newDisplay)
    })

    this.screen.on('display-removed', (_, oldDisplay) => {
      this.window.webContents.send('remove_physical_display', oldDisplay)
    })

    this.screen.on('display-metrics-changed', (_, display, changeMetrics) => {
      console.log({ display, changeMetrics });
      this.window.webContents.send('change_metrics_phisycal_display', { display, changeMetrics })
    })
  }
}

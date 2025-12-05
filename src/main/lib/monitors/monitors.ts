import { BrowserWindow, Display, ipcMain, Screen, screen } from 'electron'

interface DisplayInfo {
  index: number
  label: string
  isPrimary: boolean
  bounds: Electron.Rectangle
  scaleFactor: number
  rotation: number
}

export class Monitors {
  private window: BrowserWindow
  private screen: Screen
  private monitors: DisplayInfo[] = []

  constructor(window: BrowserWindow) {
    this.window = window
    this.screen = screen
    this.getMonitors()
    this.listeners()
  }

  public getMonitors() {
    const monitors = screen.getAllDisplays()
    this.monitors = monitors.map(this.transformData)
    return this.monitors
  }

  private transformData(data: Display): DisplayInfo {
    return {
        index: 0,
        label: data.label,
        isPrimary: data.internal,
        bounds: data.bounds,
        scaleFactor: data.scaleFactor,
        rotation: data.rotation
      }
  }

  private listeners() {
    ipcMain.handle('get_displays', () => {
      return this.monitors
    })

    this.screen.on('display-added', (_, newDisplay) => {
      this.window.webContents.send('added_display', newDisplay)
    })

    this.screen.on('display-removed', (_, oldDisplay) => {
      this.window.webContents.send('removed_display', oldDisplay)
    })

    this.screen.on('display-metrics-changed', (_, display, changeMetrics) => {
      this.window.webContents.send('display-metrics-changed', { display, changeMetrics })
    })
  }
}

// [
//   {
//     accelerometerSupport: 'unknown',
//     bounds: { x: 0, y: 0, width: 1920, height: 1080 },
//     colorDepth: 24,
//     colorSpace: '{r:[0.6500, 0.3300], g:[0.3000, 0.6000], b:[0.1500, 0.3300], w:[0.3127, 0.3290]}, transfer:SRGB, matrix:RGB, range:FULL}',
//     depthPerComponent: 8,
//     detected: true,
//     displayFrequency: 60,
//     id: 929410924,
//     internal: false,
//     label: 'SyncMaster',
//     maximumCursorSize: { width: 0, height: 0 },
//     monochrome: false,
//     nativeOrigin: { x: 0, y: 0 },
//     rotation: 0,
//     scaleFactor: 1,
//     size: { width: 1920, height: 1080 },
//     workArea: { x: 0, y: 0, width: 1920, height: 1040 },
//     workAreaSize: { width: 1920, height: 1040 },
//     touchSupport: 'unknown'
//   }
// ]

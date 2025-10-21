import {
  ProgressInfo,
  UpdateDownloadedEvent,
  UpdateInfo
} from 'electron-updater'

interface WindowState {
  minimize: boolean
  maximize: boolean
  fullscreen: boolean
  show: boolean
}

type Theme = 'light' | 'dark'

type UpdateStatusDto =
  | 'idle'
  | 'error'
  | 'checking-for-update'
  | 'update-available'
  | 'update-not-available'
  | 'update-downloaded'
  | 'download-progress'

type UpdateDataDto =
  | {
      status: 'idle'
    }
  | {
      status: 'error'
      data: {
        error: Error
        message: string | undefined
      }
    }
  | {
      status: 'checking-for-update'
    }
  | { status: 'update-available'; data: UpdateInfo }
  | { status: 'update-not-available'; data: UpdateInfo }
  | { status: 'update-downloaded'; data: UpdateDownloadedEvent }
  | { status: 'download-progress'; data: ProgressInfo }

export type { Theme, WindowState, UpdateDataDto }

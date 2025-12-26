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

interface SystemInfo {
  system: {
    manufacturer: string
    model: string
    serial: string
    uuid: string
  }
  bios: {
    vendor: string
    version: string
    releaseDate: string
  }
  os: {
    platform: string
    distro: string
    release: string
    arch: string
    hostname: string
    build: string
  }
  versions: {
    node: string
    v8: string
    npm: string
    kernel: string
  }
  time: {
    uptime: number
  }
}

type SystemInfoResponse =
  | { success: true; data: SystemInfo }
  | { success: false; error: string }


interface ProcessInfo {
  pid: number
  ppid: number
  name: string
  cpu: number
  memory: number
  commandLine: string
  priority: number
  user: string
  startTime: number | null
  state: string
  tty: string | null
  path: string | null
}

interface ProcessesResponse {
  processes: ProcessInfo[]
  stats: {
    total: number
    running: number
    blocked: number
    sleeping: number
    threads: number
    handles: number
  }
}

type ProcessesResult =
  | { success: true; data: ProcessesResponse }
  | { success: false; error: string }

export type {
  Theme,
  WindowState,
  UpdateDataDto,
  SystemInfo,
  SystemInfoResponse,
  ProcessesResult,
  ProcessInfo
}
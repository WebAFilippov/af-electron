/**
 * Опции мониторинга аудио устройств.
 */
export interface AudioMonitorOptions {
  autoStart?: boolean
  logger?: boolean
  delay?: number
  step?: number
}

/**
 * Изменяемые параметры мониторинга.
 */
export interface UpdateOptions {
  delay?: number
  step?: number
}

/**
 * Представление аудио устройства.
 */
export interface IDevice {
  id: string
  name: string
  volume: number
  muted: boolean
}

/**
 * Изменения состояния аудио устройства.
 */
export interface IChange {
  id: boolean
  name: boolean
  volume: boolean
  muted: boolean
}

/**
 * События аудио мониторинга.
 */
export interface AudioMonitorEvents {
  change: (deviceInfo: IDevice, change: IChange) => void;
  alert: (message: string) => void;
  command: (message: string) => void;
  error: (message: string) => void;
  exit: (message: string) => void;
  forceExit: (message: string) => void;
}




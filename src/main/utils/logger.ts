import { is } from '@electron-toolkit/utils'

import { app } from 'electron'
import log, { LogFunctions } from 'electron-log'
import { join } from 'path'

import { formatLog } from '@utils/formatLog'

export class Logger {
  scope: string
  logger: LogFunctions
  constructor(scope: string = 'default') {
    this.scope = scope
    this.logger = log.scope(scope)
  }

  static setupLogger() {
    if (is.dev) {
      log.transports.file.resolvePathFn = (pathVariables) =>
        join(__dirname, '..', '..', 'logs', `${pathVariables.fileName}`)
    } else {
      log.transports.file.resolvePathFn = (pathVariables) =>
        join(app.getPath('userData'), 'logs', `${pathVariables.fileName}`)
    }

    log.transports.file.format = formatLog
    log.transports.console.format = formatLog
  }

  log(...data: any[]) {
    this.logger.log(...data)
  }
  info(...data: any[]) {
    this.logger.info(...data)
  }
  error(...data: any[]) {
    this.logger.error(...data)
  }
  warn(...data: any[]) {
    this.logger.warn(...data)
  }
  debug(...data: any[]) {
    this.logger.debug(...data)
  }
  verbose(...data: any[]) {
    this.logger.verbose(...data)
  }
  silly(...data: any[]) {
    this.logger.silly(...data)
  }
}

import { BrowserWindow } from 'electron'

import { NewsController } from '@controllers/News.controller'
import { ProgrammController } from '@controllers/programm.controlles'

import { dataHandlers } from './data-handlers'
import { IPCHandlers } from './ipc'

export const ipcHandlers = (window: BrowserWindow, isAutoLaunch: boolean) => {
  IPCHandlers(window)
  dataHandlers(window, isAutoLaunch)
  ProgrammController(window)
  NewsController()
}

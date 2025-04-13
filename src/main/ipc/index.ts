import { MQTTBroker } from '@lib/broker/mqtt-broker'

import { BrowserWindow } from 'electron'

import { windowLifecycle } from '@utils/window-lifecycle'

import { NewsController } from '@controllers/news.controller'

import { IPCHandlers } from './ipc'

export const ipcHandlers = (window: BrowserWindow) => {
  IPCHandlers(window)
  windowLifecycle(window)
  NewsController()
  MQTTBroker(window)
}

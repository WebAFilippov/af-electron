import Aedes from 'aedes'
import { BrowserWindow } from 'electron'
import { createServer } from 'net'

import { handlerMQTT } from './mqtt-handlers'

const PORT = 1883

export const MQTTBroker = (window: BrowserWindow) => {
  const aedes = new Aedes({
    id: 'mqtt-broker',
    heartbeatInterval: 1000,
    connectTimeout: 100
  })
  const server = createServer(aedes.handle)

  server.listen(PORT, function () {
    handlerMQTT(window, aedes)
  })
}

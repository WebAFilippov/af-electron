import Aedes from 'aedes'
import { createServer } from 'net'

import { handlerMQTT } from './mqtt-handlers'

const PORT = 1883

export const MQTTBroker = () => {
  const aedes = new Aedes({
    id: 'mqtt-broker'
  })
  const server = createServer(aedes.handle)

  server.listen(PORT, function () {
    handlerMQTT(aedes)
  })
}

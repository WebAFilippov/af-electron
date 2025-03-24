import AudioMonitor, { AudioEventData, AudioMonitorOptions } from '@lib/audio-monitor/audio-monitor'

import Aedes from 'aedes'
import { BrowserWindow } from 'electron'

interface PublishPacket {
  cmd: 'publish'
  topic: string
  payload: Buffer
  qos: 0 | 1 | 2
  retain: boolean
  dup: boolean
}

const publishAsync = (aedes: Aedes, packet: PublishPacket): Promise<void> => {
  return new Promise((resolve, reject) => {
    aedes.publish(packet, (error) => {
      if (error) reject(error)
      else resolve()
    })
  })
}

const OPTIONS: AudioMonitorOptions = {
  autoStart: true
}

export const handlerMQTT = (window: BrowserWindow, aedes: Aedes) => {
  let monitor: AudioMonitor | null = null

  const initializeMonitor = (clientId: string) => {
    if (monitor) {
      monitor.stop()
    }

    monitor = new AudioMonitor(OPTIONS)

    monitor.on('listen', async (data: AudioEventData) => {
      const topicPrefix = `audio/${clientId}`

      try {
        switch (data.action.type) {
          case 'initial':
            await publishAsync(aedes, {
              cmd: 'publish',
              topic: `${topicPrefix}/initial`,
              payload: Buffer.from(JSON.stringify(data.devices)),
              qos: 1,
              retain: false,
              dup: false
            })
            break
          case 'default':
            await publishAsync(aedes, {
              cmd: 'publish',
              topic: `${topicPrefix}/default`,
              payload: Buffer.from(JSON.stringify(data.devices)),
              qos: 1,
              retain: false,
              dup: false
            })
            break
          case 'volume':
            if (data.action.device) {
              await publishAsync(aedes, {
                cmd: 'publish',
                topic: `${topicPrefix}/volume`,
                payload: Buffer.from(JSON.stringify(data.action.device)),
                qos: 1,
                retain: false,
                dup: false
              })
            }
            break
          case 'add':
          case 'remove':
            await publishAsync(aedes, {
              cmd: 'publish',
              topic: `${topicPrefix}/devices`,
              payload: Buffer.from(
                JSON.stringify({
                  action: data.action.type,
                  devices: data.devices
                })
              ),
              qos: 1,
              retain: false,
              dup: false
            })
            break
        }
      } catch (error) {
        console.error(`Ошибка публикации для ${clientId}: ${error}`)
      }
    })

    monitor.on('error', async (error: string) => {
      try {
        await publishAsync(aedes, {
          cmd: 'publish',
          topic: `audio/${clientId}/error`,
          payload: Buffer.from(error),
          qos: 1,
          retain: false,
          dup: false
        })
      } catch (pubError) {
        console.error(`Ошибка публикации ошибки для ${clientId}: ${pubError}`)
      }
    })
  }

  aedes.on('client', (client) => {
    if (!client?.id) {
      console.log('Подключен неизвестный клиент')
      return
    }

    console.log(`Клиент подключен: ${client.id}`)

    window.webContents.send('v1/device/isConnect', true)
    initializeMonitor(client.id)
  })

  aedes.on('clientDisconnect', (client) => {
    if (monitor) {
      monitor.stop()
      monitor = null
    }

    console.log(`Клиент отключился: ${client.id}`)
    window.webContents.send('v1/device/isConnect', false)
  })

  aedes.on('publish', (packet, client) => {
    if (!client || !monitor) return

    const topic = packet.topic
    const payload = packet.payload.toString()

    try {
      switch (topic) {
        case 'increment/volume':
          monitor.incrementVolume()
          break
        case 'decrement/volume':
          monitor.decrementVolume()
          break
        case 'toggle/volume':
          monitor.toggleMuted()
          break
        case 'set/volume': {
          const volume = parseInt(payload)
          if (!isNaN(volume)) {
            monitor.setVolume(volume)
          }
          break
        }
        case 'set/volume/id': {
          const { deviceId, volume } = JSON.parse(payload)
          if (deviceId && !isNaN(volume)) {
            monitor.setVolumeById(deviceId, volume)
          }
          break
        }
        case 'toggle/volume/id': {
          const deviceId = payload
          if (deviceId) {
            monitor.toggleMutedById(deviceId)
          }
          break
        }
      }
    } catch (error) {
      const errorMsg = `Ошибка выполнения команды ${topic}: ${error instanceof Error ? error.message : String(error)}`
      publishAsync(aedes, {
        cmd: 'publish',
        topic: `audio/${client.id}/error`,
        payload: Buffer.from(errorMsg),
        qos: 1,
        retain: false,
        dup: false
      }).catch((pubError) => {
        console.error(`Ошибка публикации ошибки: ${pubError}`)
      })
    }
  })
}

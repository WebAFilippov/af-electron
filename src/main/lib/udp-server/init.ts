import dgram from 'dgram'
import { BrowserWindow } from 'electron'

const socket = dgram.createSocket('udp4')

const UDP_PORT = 14321
const BROADCAST_ADDR = '255.255.255.255'
const MULTICAST_ADDR = '224.0.0.1'
const PONG_TIMEOUT = 10000
const DISCOVER_TIMEOUT = 5000

let window: BrowserWindow
let isConnected = false
let IPDevice = ''
let pingAttempts = 0
let discoverInterval: NodeJS.Timeout
let pingPongInterval: NodeJS.Timeout

export const initUdpServer = (window_params: BrowserWindow) => {
  window = window_params
  socket.bind(UDP_PORT, () => {
    console.log(`Пытаемся привязаться к порту ${UDP_PORT}...`)
  })

  socket.on('listening', () => {
    socket.setBroadcast(true)

    try {
      socket.addMembership(MULTICAST_ADDR)
    } catch (err) {
      console.error('Ошибка подписки на multicast:', err)
    }
  })

  discoverAFD()
}

const discoverAFD = () => {
  discoverInterval = setInterval(() => {
    const message = Buffer.from('AFD')
    socket.send(message, UDP_PORT, BROADCAST_ADDR, (err) => {
      if (err) console.error('Ошибка broadcast отправки:', err)
      // console.log('Отправлено broadcast сообщение')
    })
    socket.send(message, UDP_PORT, MULTICAST_ADDR, (err) => {
      if (err) console.error('Ошибка multicast отправки:', err)
      // console.log('Отправлено multicast сообщение')
    })
  }, DISCOVER_TIMEOUT)
}

const pingPong = () => {
  pingPongInterval = setInterval(() => {
    const message = Buffer.from('PING')
    socket.send(message, UDP_PORT, IPDevice, (err) => {
      if (err || ++pingAttempts >= 3) {
        console.log('ESP не отвечает. Переподключение...')
        isConnected = false
        clearInterval(pingPongInterval)
        window.webContents.send('is_connected_device', false)
        discoverAFD()
      }
    })
  }, PONG_TIMEOUT)
}

socket.on('message', (msg, _rinfo) => {
  const response = msg.toString()

  if (response.startsWith('AFD:')) {
    IPDevice = response.split(':')[1]
    console.log(`Найдено устройство: ${IPDevice}`)

    isConnected = true
    pingAttempts = 0
    clearInterval(discoverInterval)
    window.webContents.send('is_connected_device', true)
    pingPong()
  }

  if (response === 'PONG') {
    console.log('ESP отвечает')
    pingAttempts = 0
  }
})

socket.on('error', (err) => {
  console.error('Ошибка сокета:', err)
  socket.close()
})

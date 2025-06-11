import dgram from 'dgram'

const socket = dgram.createSocket('udp4')

const UDP_PORT = 14321
const BROADCAST_ADDR = '255.255.255.255'
const MULTICAST_ADDR = '224.0.0.1'
const PONG_TIMEOUT = 5000
const DISCOVER_TIMEOUT = 5000

let isConnected = false
let IPDevice = ''
let pingAttempts = 0
let discoverAFDInterval: NodeJS.Timeout
let pingPongInterval: NodeJS.Timeout

export const initUdpServer = () => {
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
  discoverAFDInterval = setInterval(() => {
    const message = Buffer.from('AFD')
    socket.send(message, UDP_PORT, BROADCAST_ADDR, (err) => {
      if (err) console.error('Ошибка broadcast отправки:', err)
      console.log('Отправлено broadcast сообщение')
    })
    socket.send(message, UDP_PORT, MULTICAST_ADDR, (err) => {
      if (err) console.error('Ошибка multicast отправки:', err)
      console.log('Отправлено multicast сообщение')
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
    clearInterval(discoverAFDInterval)
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



const { SerialPort } = require('serialport')

// Замените на фактические VID и PID, которые вы получили на шаге 2.A!
const ESP_VID = '303A' // Пример для встроенного USB-CDC ESP32-C3
const ESP_PID = '1001'

/**
 * Ищет последовательный порт ESP32-C3 по VID и PID.
 * @returns {Promise<string|null>} Путь к порту или null, если не найден.
 */
async function findEsp32Port() {
  try {
    const ports = await SerialPort.list()

    // Ищем порт, соответствующий нашим идентификаторам
    const espPort = ports.find((port) => {
      // Идентификаторы обычно хранятся в верхнем регистре без префикса 0x
      return (
        port.vendorId &&
        port.vendorId.toUpperCase() === ESP_VID &&
        port.productId &&
        port.productId.toUpperCase() === ESP_PID
      )
    })

    if (espPort) {
      return espPort.path
    } else {
      // Альтернативный поиск по производителю, если VID/PID не сработали
      const espManufacturerPort = ports.find(
        (port) => port.manufacturer && port.manufacturer.includes('Espressif')
      )
      return espManufacturerPort ? espManufacturerPort.path : null
    }
  } catch (err) {
    console.error('Error during port search:', err)
    return null
  }
}

// Пример использования
export async function connectToEsp32() {
  const portPath = await findEsp32Port()

  if (portPath) {
    console.log(`ESP32-C3 found on port: ${portPath}`)
    // Инициализация соединения с найденным портом
    const port = new SerialPort({ path: portPath, baudRate: 115200 })

    port.on('open', () => console.log('Connection established!'))
    port.on('data', (data) => console.log('Data:', data.toString()))
    // ... остальной код для работы с портом
  } else {
    console.log('ESP32-C3 Super Mini not found. Please check connection.')
  }
}

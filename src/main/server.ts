import dgram from 'dgram';
import { BrowserWindow } from 'electron';

const UDP_PORT = 3333;
const SIGNATURE = 0xDEAF; // Наша сигнатура (в Little Endian придет как AF DE)

const server = dgram.createSocket('udp4');

// Хранилище для найденных устройств
const devices = new Map<string, { ip: string, lastSeen: number }>();

server.on('error', (err) => {
    console.error(`Ошибка сервера:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    // Проверяем минимальную длину (Signature 2 + CMD 1)
    if (msg.length < 3) return;

    // Читаем сигнатуру (Little Endian)
    const sig = msg.readUInt16LE(0);
    if (sig !== SIGNATURE) return;

    const cmd = msg.readUInt8(2);

    switch (cmd) {
        case 0x01: // DISCOVERY
            console.log(`[Discovery] Найдена ESP32: ${rinfo.address}`);

            // Отправляем ответ WELCOME (0x02)
            const welcomeMsg = Buffer.alloc(3);
            welcomeMsg.writeUInt16LE(SIGNATURE, 0);
            welcomeMsg.writeUInt8(0x02, 2);

            server.send(welcomeMsg, rinfo.port, rinfo.address);
            break;

        case 0x03: // DATA (Telemetry)
            // Структура: Sig(2), Cmd(1), Pos(4), Adc(2) = 9 байт
            if (msg.length >= 9) {
                const pos = msg.readInt32LE(3);
                const adc = msg.readInt16LE(7);

                // Выводим данные в консоль
                // console.log(`[${rinfo.address}] POS: ${pos.toString().padEnd(8)} | ADC: ${adc}`);

                // Обновляем статус устройства
                // devices.set(rinfo.address, { ip: rinfo.address, lastSeen: Date.now() });
                BrowserWindow.getAllWindows().forEach(win => {
                    win.webContents.send('udp-data', { pos, adc, ip: rinfo.address });
                });

            }
            break;

        default:
            console.log(`Неизвестная команда: ${cmd}`);
    }
});

server.on('listening', () => {
    const address = server.address();
    console.log(`UDP сервер запущен на ${address.address}:${address.port}`);
    console.log('Ожидание данных от ESP32...');
});

// Запуск сервера
export function startEspServer() {
    server.bind(UDP_PORT);
}

// Опционально: функция для рассылки команд всем ESP (если понадобится)
export function broadcastToEsp(buffer: Buffer) {
    devices.forEach(device => {
        server.send(buffer, UDP_PORT, device.ip);
    });
}

// AndroidAPEB44
// fzno9249
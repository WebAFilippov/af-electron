import { checkNetworkConnection } from '@utils/network'
import { ipcMain } from 'electron'

class NetworkService {
  async sendNetworkStatus() {
    const networkStatus = await checkNetworkConnection()

    mainWindow?.webContents.send('message-from-backend', { text: 'Привет, фронтенд!' });
  }
}

export const networkService = new NetworkService()

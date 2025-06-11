import { programService } from '@services/program.service'
import { BrowserWindow } from 'electron'
import cron from 'node-cron'

export const ipcNetwork = (window: BrowserWindow) => {
  cron.schedule('*/5 * * * * *', async () => {
    const isOnline = await programService.isHostReachable('8.8.8.8')

    window.webContents.send('network_state', isOnline)
  })
}

// import { BrowserWindow } from 'electron'
// import cron from 'node-cron'

// import { applicationService } from '@services/application.service'

// export const ProgrammController = (window: BrowserWindow) => {
//   cron.schedule('*/5 * * * * *', async () => {
//     const isOnline = await applicationService.isHostReachable('8.8.8.8')

//     window.webContents.send('v1/programm/check_network', isOnline)
//   })
// }

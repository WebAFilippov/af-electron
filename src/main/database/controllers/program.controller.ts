// import { programService } from '@database/services/program.service'
// import { ThemeColorBackground } from '@shared/types'
// import { BrowserWindow, ipcMain, nativeTheme } from 'electron'

// export const ProgramController = (window: BrowserWindow) => {
//   ipcMain.handle('window#get_theme', async () => {
//     const { theme } = await programService.getProgram()

//     switch (theme) {
//       case 'light':
//         window.setBackgroundColor(ThemeColorBackground.LIGHT)
//         nativeTheme.themeSource = 'light'
//         break
//       case 'dark':
//         window.setBackgroundColor(ThemeColorBackground.DARK)
//         nativeTheme.themeSource = 'dark'
//         break
//       default:
//         const theme = nativeTheme.shouldUseDarkColors ? 'dark' : 'light'
//         nativeTheme.themeSource = theme
//         window.setBackgroundColor(
//           theme === 'dark' ? ThemeColorBackground.DARK : ThemeColorBackground.LIGHT
//         )
//         break
//     }

//     return theme
//   })
// }

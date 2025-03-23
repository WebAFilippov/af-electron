import { is } from '@electron-toolkit/utils'

import { app } from 'electron'
import { join } from 'path'

const userDataPath = app.getPath('userData')
const databasePath = is.dev
  ? join(userDataPath, 'dev.database.sqlite')
  : join(userDataPath, 'prod.database.sqlite')

const fileCSVPath = join(app.getAppPath(), 'resources', 'data.csv')
const fileAFWinAudio = is.dev
  ? join(app.getAppPath(), 'resources', 'af-win-audio.exe')
  : join(app.getAppPath(), 'resources', 'af-win-audio.exe').replace('app.asar', 'app.asar.unpacked')

export const config = {
  userDataPath,
  databasePath,
  fileCSVPath,
  fileAFWinAudio,
  intervalCheckIsOnline: 10000
}

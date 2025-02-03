import { is } from '@electron-toolkit/utils'

import { app } from 'electron'
import { join } from 'path'

const userDataPath = app.getPath('userData')
const databasePath = is.dev
  ? join(userDataPath, 'dev.database.sqlite')
  : join(userDataPath, 'prod.database.sqlite')
const fileCSVPath = join(app.getAppPath(), 'resources', 'data.csv')

export const config = {
  userDataPath,
  databasePath,
  fileCSVPath,
  intervalCheckIsOnline: 10000
}

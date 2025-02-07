import { is } from '@electron-toolkit/utils'

import { app } from 'electron'
import { join } from 'path'

import { WindowState } from './types'

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

export const windowState: WindowState = {
  minimize: false,
  maximize: false,
  unmaximize: false,
  hide: false,
  show: false,
  focus: false,
  blur: false
}

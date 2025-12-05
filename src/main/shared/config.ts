import { is } from '@electron-toolkit/utils'
import { app } from 'electron'
import { join } from 'path'

const userDataPath = app.getPath('userData')
const databasePath = is.dev
  ? join(userDataPath, 'dev.database.sqlite')
  : join(userDataPath, 'prod.database.sqlite')
const updateSourcePath = is.dev
  ? join(userDataPath, 'update_source')
  : join(userDataPath, 'update_source')
const updateOutputPath = is.dev
  ? join(userDataPath, 'update_output', 'littlefs.bin')
  : join(userDataPath, 'update_output', 'littlefs.bin')

const resourcesPath = is.dev
  ? join(app.getAppPath(), 'resources')
  : join(app.getAppPath(), 'resources').replace('app.asar', 'app.asar.unpacked')
const fileFFMpeg = is.dev
  ? join(resourcesPath, 'ffmpeg.exe')
  : join(resourcesPath, 'ffmpeg.exe').replace('app.asar', 'app.asar.unpacked')

export const config = {
  userDataPath,
  databasePath,
  resourcesPath,
  updateSourcePath,
  updateOutputPath,
  fileFFMpeg
}

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

const fileCSVPath = join(app.getAppPath(), 'resources', 'data.csv')
const fileFFMpeg = is.dev
  ? join(app.getAppPath(), 'resources', 'ffmpeg.exe')
  : join(app.getAppPath(), 'resources', 'ffmpeg.exe').replace('app.asar', 'app.asar.unpacked')
const fileAFWinAudio = is.dev
  ? join(app.getAppPath(), 'resources', 'af-win-audio.exe')
  : join(app.getAppPath(), 'resources', 'af-win-audio.exe').replace('app.asar', 'app.asar.unpacked')
const fileMKLittleFS = is.dev
  ? join(app.getAppPath(), 'resources', 'mklittlefs', 'mklittlefs.exe')
  : join(app.getAppPath(), 'resources', 'mklittlefs', 'mklittlefs.exe').replace(
      'app.asar',
      'app.asar.unpacked'
    )

export const config = {
  userDataPath,
  databasePath,
  updateSourcePath,
  updateOutputPath,
  fileCSVPath,
  fileFFMpeg,
  fileAFWinAudio,
  fileMKLittleFS,
  intervalCheckIsOnline: 10000
}

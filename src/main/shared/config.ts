import { app } from 'electron'
import { join } from 'path'

const userDataPath = app.getPath('userData')
const databasePath = join(userDataPath, 'database.sqlite')
const fileCSVPath = join(app.getAppPath(), 'resources', 'data.csv')

export const config = {
  userDataPath,
  databasePath,
  fileCSVPath,
  intervalCheckIsOnline: 10000
}

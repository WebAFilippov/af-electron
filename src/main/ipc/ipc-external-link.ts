import { ipcMain, shell } from 'electron'

export const ipcExternalLink = () => {
  ipcMain.on('external_open', (_event, url: string) => {
    shell.openExternal(url)
  })
}

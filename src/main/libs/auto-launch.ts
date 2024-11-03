import { app } from 'electron'

export function autoLaunch(enable: boolean) {
  app.setLoginItemSettings({
    openAtLogin: enable,
    args: enable ? ['--auto-launch'] : []
  })
}

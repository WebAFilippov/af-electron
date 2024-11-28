import { app } from 'electron'

/**
 * Включает или отключает автозапуск приложения при входе в систему.
 * @param enable - Если true, приложение будет запускаться автоматически при старте системы.
 */
export function setAutoLaunch(enable: boolean) {
  app.setLoginItemSettings({
    openAtLogin: enable,
    args: enable ? ['--auto-launch'] : []
  })
}

import { app, autoUpdater, dialog } from 'electron'
import log from 'electron-log'

export const setupAutoUpdates = () => {
  if (!app.isPackaged) {
    log.info('Development mode, skipping update check.')
    return
  }

  autoUpdater.on('checking-for-update', () => {
    log.info('Checking for updates...')
  })

  autoUpdater.on('update-available', () => {
    log.info('Update available.')
    dialog.showMessageBox({
      type: 'info',
      title: 'Доступно обновление',
      message: 'Новая версия приложения найдена. Она будет загружена в фоновом режиме.'
    })
  })

  autoUpdater.on('update-downloaded', () => {
    log.info('Update downloaded.')
    dialog
      .showMessageBox({
        type: 'info',
        title: 'Обновление готово',
        message: 'Новая версия загружена. Перезапустить приложение сейчас?',
        buttons: ['Да', 'Нет']
      })
      .then((result) => {
        if (result.response === 0) {
          autoUpdater.quitAndInstall()
        }
      })
  })

  autoUpdater.on('error', (error) => {
    log.error('Update error:', error)
    dialog.showErrorBox('Ошибка обновления', error.message)
  })

  autoUpdater.checkForUpdates()
}

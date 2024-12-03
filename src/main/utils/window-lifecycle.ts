import { BrowserWindow } from 'electron'

export const windowLifecycle = (window: BrowserWindow) => {
  // window.on('close', () => {
  //   console.log('Окно закрывается')
  // })
  // window.on('closed', async () => {
  //   store.data.isHide = false
  //   store.data.isMaximaze = false
  //   store.data.isMinisize = false
  //   await store.write()
  //   console.log('Окно закрыто')
  // })
  // window.on('minimize', () => {
  //   console.log('Окно свернуто')
  // })
  // window.on('maximize', async () => {
  //   store.data.isMaximaze = true
  //   await store.write()
  //   console.log('Окно развернуто')
  // })
  // window.on('unmaximize', async () => {
  //   store.data.isMaximaze = false
  //   await store.write()
  //   console.log('Окно восстановлено из развернутого состояния')
  // })
  // window.on('restore', () => {
  //   console.log('Окно восстановлено')
  // })
  // window.on('show', () => {
  //   console.log('Окно показано')
  // })
  // window.on('hide', () => {
  //   console.log('Окно скрыто')
  // })
  window.on('focus', () => {
    window.flashFrame(false)
  })
  // window.on('blur', () => {
  //   console.log('Окно потеряло фокус')
  // })
  // window.on('enter-full-screen', () => {
  //   console.log('Окно перешло в полноэкранный режим')
  // })
  // window.on('leave-full-screen', () => {
  //   console.log('Окно вышло из полноэкранного режима')
  // })
  // window.on('ready-to-show', () => {
  //   console.log('Окно готово к отображению')
  // })
}

import { BrowserWindow } from 'electron'

// import { Low } from 'lowdb/lib'
// import { IState } from '../../types'
// import { Logger } from '../logger'

// const log = new Logger('helpers-window-control')
// export const toggleWindowVisibilityInTray = async (
//   window: BrowserWindow,
//   store: Low<IState>,
//   Visibled: boolean
// ) => {
//   if (Visibled) {
//     if (window.isVisible()) {
//       window.hide()
//       store.data.isHide = false
//       store.data.isMinisize = false
//       window.isMaximizable() ? (store.data.isMaximaze = true) : (store.data.isMaximaze = false)
//       await store.write()
//       log.info('Окно открыто')
//     } else {
//       log.warn('Окно уже открыто')
//     }
//   } else {
//     // window.hide()
//     if (!window.isVisible()) {
//       window.show()
//       store.data.isHide = false
//       store.data.isMinisize = false
//       window.isMaximizable() ? (store.data.isMaximaze = true) : (store.data.isMaximaze = false)
//       await store.write()
//       log.info('Окно открыто')
//     } else {
//       log.warn('Окно уже открыто')
//     }
//   }
// }

export const toggleWindowState = (window: BrowserWindow) => {
  if (window.isMinimized()) {
    window.restore()
  } else {
    window.minimize()
  }
}

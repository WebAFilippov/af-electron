import { BrowserWindow } from 'electron'

import { WindowState } from '@main/shared/types'

// export const windowState: WindowState = {
//   minimize: false,
//   maximize: false,
//   unmaximize: false,
//   hide: false,
//   show: false,
//   focus: false,
//   blur: false
// }

// isNormal() Находится ли окно в обычном состоянии (не развёрнуто, не свернуто, не в полноэкранном режиме).

export const windowLifecycle = (window: BrowserWindow) => {
  const windowState: WindowState = {
    maximize: false,
    fullscreen: false,
    show: true
  }

  const updateWindowState = (key: keyof WindowState, value: boolean) => {
    windowState[key] = value
    console.log(key, { ...windowState })
  }

  window.on('maximize', () => {
    console.log('maximize')

    updateWindowState('maximize', window.isMaximized())
  })

  window.on('unmaximize', () => {
    console.log('unmaximize')

    updateWindowState('maximize', window.isMaximized())
  })

  window.on('enter-full-screen', () => {
    console.log('enter')

    updateWindowState('fullscreen', true)
  })

  window.on('leave-full-screen', () => {
    console.log('leave')

    updateWindowState('fullscreen', false)
  })

  window.on('hide', () => {
    console.log('hide')

    updateWindowState('show', window.isVisible())
  })

  window.on('show', () => {
    console.log('show')

    updateWindowState('show', true)
  })
}

import { BrowserWindow, } from 'electron'

import { WindowState } from '@main/shared/types'

// isNormal() Находится ли окно в обычном состоянии (не развёрнуто, не свернуто, не в полноэкранном режиме).

export const windowLifecycle = (window: BrowserWindow) => {
  const updateWindowState = (key: string) => {
    const windowState: WindowState = {
      minimize: window.isMinimized(),
      maximize: window.isMaximized(),
      fullscreen:
        key === 'enter-full-screen'
          ? true
          : key === 'leave-full-screen'
            ? false
            : window.isFullScreen(),
      show: window.isVisible()
    }
    
    window.webContents.send('v1/window/state', windowState)
  }

  window.on('maximize', () => updateWindowState('maximize'))
  window.on('minimize', () => updateWindowState('minimize'))
  window.on('restore', () => updateWindowState('restore'))
  window.on('unmaximize', () => updateWindowState('unmaximize'))
  window.on('enter-full-screen', () => updateWindowState('enter-full-screen'))
  window.on('leave-full-screen', () => updateWindowState('leave-full-screen'))
  window.on('hide', () => updateWindowState('hide'))
  window.on('show', () => updateWindowState('show'))
  window.on('close', () => updateWindowState('close'))

  // const updateWindowState = (key: keyof WindowState, value: boolean) => {
  //   windowState.minimize = window.isMinimized()
  //   windowState.maximize = window.isMaximized()
  //   windowState.fullscreen = window.isFullScreen()
  //   windowState.show = window.isVisible()
  //   console.log(key, { ...windowState })
  // }

  // window.on('maximize', () => {
  //   console.log('maximize')

  //   updateWindowState('maximize', window.isMaximized())
  // })

  // window.on('minimize', () => {
  //   console.log('minimize')

  //   updateWindowState('minimize', window.isMinimized())
  // })

  // window.on('restore', () => {
  //   console.log('restore')

  //   updateWindowState()

  // window.on('unmaximize', () => {
  //   console.log('unmaximize')

  //   updateWindowState('maximize', window.isMaximized())
  // })

  // window.on('enter-full-screen', () => {
  //   console.log('enter')

  //   updateWindowState('fullscreen', true)
  // })

  // window.on('leave-full-screen', () => {
  //   console.log('leave')

  //   updateWindowState('fullscreen', false)
  // })

  // window.on('hide', () => {
  //   console.log('hide')

  //   updateWindowState('show', window.isVisible())
  // })

  // window.on('show', () => {
  //   console.log('show')

  //   updateWindowState('show', true)
  // })
}

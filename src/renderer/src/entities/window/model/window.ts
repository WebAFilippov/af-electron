import { createEffect, createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'

const KeyDownToWindow = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === 'Enter') {
    event.preventDefault()
    window.api.setMaximazeWindow()
  }
}

window.api.onWindowState((state) => changeWindowState(state))

interface WindowState {
  minimize: boolean
  maximize: boolean
  fullscreen: boolean
  show: boolean
}

const GateWindow = createGate()

const $window = createStore<WindowState>({
  minimize: false,
  maximize: false,
  fullscreen: false,
  show: false
})
const $windowMinimize = $window.map((state) => state.minimize)
const $windowMaximize = $window.map((state) => state.maximize)
const $windowFullscreen = $window.map((state) => state.fullscreen)
const $windowShow = $window.map((state) => state.show)

const changeWindowState = createEvent<WindowState>()

const addListenerWindowFx = createEffect(() => {
  window.addEventListener('keydown', KeyDownToWindow)
})
const removeListenerWindowFx = createEffect(() => {
  window.removeEventListener('keydown', KeyDownToWindow)
})
const setWindowClose = createEffect(() => window.api.setCloseWindow())
const setWindowMaximize = createEffect(() => window.api.setMaximazeWindow())
const setWindowMinimize = createEffect(() => window.api.setMinimazeWindow())

sample({
  clock: changeWindowState,
  target: $window
})

sample({
  clock: GateWindow.open,
  target: [addListenerWindowFx]
})
sample({
  clock: GateWindow.close,
  target: [removeListenerWindowFx]
})

export {
  $window,
  $windowFullscreen,
  $windowMaximize,
  $windowMinimize,
  $windowShow,
  GateWindow,
  setWindowClose,
  setWindowMaximize,
  setWindowMinimize
}

// $window.watch((state) => console.log('#window ', state))

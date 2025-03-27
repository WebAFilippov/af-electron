import { createEffect, createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'

window.api.onWindowState((state) => changeWindowState(state))

const KeyDownToWindow = (event: KeyboardEvent) => {
  if (event.altKey && event.key === 'Enter') {
    event.preventDefault()
    setWindowFullscreen()
  }

  if (event.ctrlKey && event.key === 'Enter') {
    event.preventDefault()
    setWindowMaximize()
  }
}

interface WindowState {
  minimize: boolean
  maximize: boolean
  fullscreen: boolean
  show: boolean
}

const changeWindowState = createEvent<WindowState>()

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

const addKeydownWindowFx = createEffect(() => {
  window.addEventListener('keydown', KeyDownToWindow)
})
const removeKeydownWindowFx = createEffect(() => {
  window.removeEventListener('keydown', KeyDownToWindow)
})
const setWindowClose = createEffect(() => window.api.setCloseWindow())
const setWindowFullscreen = createEffect(() => window.api.setFullscreenWindow())
const setWindowMaximize = createEffect(() => window.api.setMaximazeWindow())
const setWindowMinimize = createEffect(() => window.api.setMinimazeWindow())

sample({
  clock: changeWindowState,
  target: $window
})

sample({
  clock: GateWindow.open,
  target: [addKeydownWindowFx]
})
sample({
  clock: GateWindow.close,
  target: [removeKeydownWindowFx]
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

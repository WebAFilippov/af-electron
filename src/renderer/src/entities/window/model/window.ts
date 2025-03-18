import { createEffect, createEvent, createStore, sample } from 'effector'

window.api.onWindowState((state) => changeWindowState(state))

interface WindowState {
  minimize: boolean
  maximize: boolean
  fullscreen: boolean
  show: boolean
}

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

const setWindowMinimoize = createEffect(() => window.api.setMinimazeWindow())
const setWindowMaximize = createEffect(() => window.api.setMaximazeWindow())
const setWindowClose = createEffect(() => window.api.setCloseWindow())

sample({
  clock: changeWindowState,
  target: $window
})

export {
  $window,
  $windowMinimize,
  $windowMaximize,
  $windowFullscreen,
  $windowShow,
  setWindowMinimoize,
  setWindowMaximize,
  setWindowClose
}

// $window.watch((state) => console.log('#window ', state))

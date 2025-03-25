import { createEffect, createEvent, createStore, sample } from 'effector'

import { AppStarted } from '@shared/config/init'

import { Theme } from '../types'

const setTheme = createEvent<Theme>()

const $theme = createStore<Theme>('light')

const applyThemeFx = createEffect<Theme, void, Error>((theme) => {
  const root = document.getElementById('root')
  if (!root) {
    throw new Error('Root element not found')
  }

  root.classList.remove('light', 'dark')
  root.classList.add(theme)
})
const getWindowTheme = createEffect<void, Theme, Error>(async () => {
  try {
    return await window.api.getWindowTheme()
  } catch (err) {
    throw new Error('Error getting window theme')
  }
})
const sendWindowTheme = createEffect<Theme, void, Error>((theme) =>
  window.api.sendWindowTheme(theme)
)

sample({
  clock: setTheme,
  target: [$theme, applyThemeFx, sendWindowTheme]
})

sample({
  clock: getWindowTheme.doneData,
  target: setTheme
})

sample({
  clock: AppStarted,
  target: [getWindowTheme]
})

export { $theme, applyThemeFx, setTheme }

// $theme.watch((store) => console.log(`theme change: ${store}`))

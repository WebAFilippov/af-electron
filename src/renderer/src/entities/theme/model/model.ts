import { createEffect, createEvent, createStore, sample } from 'effector'
import { persist } from 'effector-storage/local'

import { AppStarted } from '@shared/config/init'

import { Theme } from '../types'

const setTheme = createEvent<Theme>()

const $theme = createStore<Theme>('system')
const $isDarkTheme = $theme.map(
  (theme) =>
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) ||
    theme === 'dark'
)

const applyThemeFx = createEffect<Theme, void, Error>((store) => {
  const root = document.getElementById('root')
  if (!root) {
    throw new Error('Root element not found')
  }

  root.classList.remove('light', 'dark')
  if (store === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

    root.classList.add(systemTheme)
    return
  }
  root.classList.add(store)
})
const sendWindowTheme = createEffect<Theme, void, Error>((theme) =>
  window.api.sendWindowTheme(theme)
)

persist({
  store: $theme,
  key: 'theme-app'
})

sample({
  clock: setTheme,
  target: $theme
})

sample({
  clock: $theme,
  target: [applyThemeFx, sendWindowTheme]
})

sample({
  clock: AppStarted,
  source: $theme,
  target: applyThemeFx
})

export { $theme, $isDarkTheme, setTheme, applyThemeFx }

// $theme.watch((store) => console.log(`theme change: ${store}`))
// $isDarkTheme.watch((store) => console.log(`isDarkTheme change: ${store}`))

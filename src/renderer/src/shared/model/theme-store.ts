import { AppStarter } from './app-starter'
import { createEffect, createEvent, createStore, sample } from 'effector'

type Theme = 'light' | 'dark'

const themeToggle = createEvent()

const $theme = createStore<Theme>('light')

const applyThemeFx = createEffect<Theme, void, Error>((theme) => {
  const root = document.getElementById('root')
  if (!root) {
    throw new Error('Root element not found')
  }

  root.classList.remove('light', 'dark')
  root.classList.add(theme)
})
const getThemeFx = createEffect<void, Theme, Error>(async () => {
  try {
    return await window.api.getWindowTheme()
  } catch (err) {
    throw new Error('Error getting window theme')
  }
})
const updateThemeFx = createEffect<Theme, void, Error>((theme) => {
  window.api.updateWindowTheme(theme)
})

sample({
  clock: themeToggle,
  source: $theme,
  fn: (theme) => {
    if (theme === 'light') {
      return 'dark'
    }
    return 'light'
  },
  target: [$theme, applyThemeFx, updateThemeFx]
})

sample({
  clock: getThemeFx.doneData,
  target: [$theme, applyThemeFx]
})

sample({
  clock: AppStarter,
  target: [getThemeFx]
})

export { $theme, applyThemeFx, themeToggle }

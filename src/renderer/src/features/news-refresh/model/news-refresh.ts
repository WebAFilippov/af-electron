import { createEffect, createEvent, sample } from 'effector'
import { createGate } from 'effector-react'

import { fetchCategoriesFx } from '@entities/categories'

import { REFRESH_NEWS_KEYBOARD_SHORTCUT } from '@shared/config/constant'

const handleKeyDown = (event: KeyboardEvent) => {
  if (REFRESH_NEWS_KEYBOARD_SHORTCUT.includes(event.key)) {
    event.preventDefault()
    refreshCategories()
  }
}

const refreshCategories = createEvent()

const RefreshGate = createGate()

const addListenerRefreshFx = createEffect(() => {
  window.addEventListener('keydown', handleKeyDown)
})

const removeListenerRefreshFx = createEffect(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

sample({
  clock: refreshCategories,
  source: fetchCategoriesFx.$pending,
  filter: (isLoading) => !isLoading,
  fn: () => ({
    timelapse: Date.now()
  }),
  target: fetchCategoriesFx.start
})

sample({
  clock: RefreshGate.open,
  target: addListenerRefreshFx
})

sample({
  clock: RefreshGate.close,
  target: removeListenerRefreshFx
})

export { refreshCategories, RefreshGate }

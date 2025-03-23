import { createEffect, createEvent, sample } from 'effector'
import { createGate } from 'effector-react'
import { useNavigate } from 'react-router-dom'

import { fetchCategoriesFx } from '@entities/categories'

import { REFRESH_NEWS_KEYBOARD_SHORTCUT } from '@shared/config/constant'

const handleKeyDown = (event: KeyboardEvent) => {
  if (REFRESH_NEWS_KEYBOARD_SHORTCUT.includes(event.key)) {
    event.preventDefault()
    refreshCategories()
  }
}

const GateRefresh = createGate<{ navigate: ReturnType<typeof useNavigate> }>()

const refreshCategories = createEvent()
const navigateToNews = createEvent()

const addListenerRefreshFx = createEffect(() => {
  window.addEventListener('keydown', handleKeyDown)
})

const removeListenerRefreshFx = createEffect(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

const navigateFx = createEffect(({ navigate }) => {
  navigate('/news')
})

sample({
  clock: navigateToNews,
  source: GateRefresh.state,
  fn: ({ navigate }) => ({ navigate }),
  target: navigateFx
})

sample({
  clock: refreshCategories,
  target: [fetchCategoriesFx.start, navigateToNews]
})

sample({
  clock: GateRefresh.open,
  target: addListenerRefreshFx
})

sample({
  clock: GateRefresh.close,
  target: removeListenerRefreshFx
})

export { refreshCategories, GateRefresh }

import { createEffect, createEvent, sample } from 'effector'
import { not } from 'patronum'

import { fetchNewsFx } from '@entities/news'

import { REFRESH_NEWS_KEYBOARD_SHORTCUT } from '@shared/config/constant'

const handleKeyDown = (event: KeyboardEvent) => {
  if (REFRESH_NEWS_KEYBOARD_SHORTCUT.includes(event.key)) {
    event.preventDefault()
    refreshNews()
  }
}

const addListenerFx = createEffect(() => {
  window.addEventListener('keydown', handleKeyDown)
})

const removeListenerFx = createEffect(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

const addRefreshListener = createEvent()
const removeRefreshListener = createEvent()

sample({
  clock: addRefreshListener,
  target: addListenerFx
})

sample({
  clock: removeRefreshListener,
  target: removeListenerFx
})

const refreshNews = createEvent()

sample({
  clock: refreshNews,
  filter: not(fetchNewsFx.pending),
  target: fetchNewsFx
})

export { refreshNews, addRefreshListener, removeRefreshListener }

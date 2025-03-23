import { createEvent, createStore, sample } from 'effector'

import { $querySorting } from '@entities/news'

import { SORT_OPTIONS } from '../config/constants'

const setCurrentSorting = createEvent<{ by: string; order: string }>()

const $sorting = createStore(SORT_OPTIONS)
const $currentSorting = createStore({ by: 'pubDate', order: 'desc' })

sample({
  clock: setCurrentSorting,
  source: $currentSorting,
  filter: (currentSorting, newSorting) =>
    currentSorting.by !== newSorting.by || currentSorting.order !== newSorting.order,
  fn: (_currentSorting, newSorting) => newSorting,
  target: [$currentSorting, $querySorting]
})

export { $sorting, $currentSorting, setCurrentSorting }

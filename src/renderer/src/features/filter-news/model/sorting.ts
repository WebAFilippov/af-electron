import { createEvent, createStore, sample } from 'effector'

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
  target: $currentSorting
})

export { $sorting, $currentSorting, setCurrentSorting }

// $sorting.watch((store) => console.log('#sorting ', store))
// $currentSorting.watch((store) => console.log('#currentSorting ', store))

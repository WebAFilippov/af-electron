import { createEvent, createStore, sample } from 'effector'

import { $queryTake } from '@entities/news'

import { TAKE_OPTIONS } from '../config/constants'

const setCurrentTake = createEvent<number>()

const $take = createStore(TAKE_OPTIONS)
const $currentTake = createStore(25)

sample({
  clock: setCurrentTake,
  source: $currentTake,
  filter: (currentTake, newTake) => currentTake !== newTake,
  fn: (_currentSorting, newSorting) => newSorting,
  target: [$currentTake, $queryTake]
})

export { $take, $currentTake, setCurrentTake }

// $take.watch((take) => console.log('#take ', take))
// $currentTake.watch((take) => console.log('#currentTake ', take))

import { createEvent, createStore, sample } from 'effector'

import { TAKE_OPTIONS } from '../config/constants'

const $take = createStore(TAKE_OPTIONS)
const $currentTake = createStore(25)
const setCurrentTake = createEvent<number>()

sample({
  clock: setCurrentTake,
  source: $currentTake,
  filter: (currentTake, newTake) => currentTake !== newTake,
  fn: (_currentSorting, newSorting) => newSorting,
  target: $currentTake
})

export { $take, $currentTake, setCurrentTake }

// $take.watch((take) => console.log('#take ', take))
// $currentTake.watch((take) => console.log('#currentTake ', take))

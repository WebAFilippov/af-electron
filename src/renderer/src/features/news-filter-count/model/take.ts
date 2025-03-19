import { createEvent, sample } from 'effector'

import { $currentTake } from '@entities/news'

const setCurrentTake = createEvent<number>()

sample({
  clock: setCurrentTake,
  target: $currentTake
})

export { setCurrentTake }

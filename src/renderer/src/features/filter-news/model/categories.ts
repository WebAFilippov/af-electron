import { createEvent, sample } from 'effector'

import { $currentCategory } from '@entities/categories'

const setCurrentCetegory = createEvent<string>()

sample({
  clock: setCurrentCetegory,
  target: $currentCategory
})

export { setCurrentCetegory }

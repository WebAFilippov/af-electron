import { createEvent, sample } from 'effector'
import { and } from 'patronum'

import { $currentSorting } from '@entities/news'

const setCurrentSorting = createEvent<{ by: string; order: string }>()

sample({
  clock: setCurrentSorting,
  source: $currentSorting,
  filter: (currentSorting, newSorting) =>
    and(currentSorting.by !== newSorting.by, currentSorting.order !== newSorting.order),
  target: $currentSorting
})

export { setCurrentSorting }
